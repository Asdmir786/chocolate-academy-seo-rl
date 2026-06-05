// Shared resolver that guarantees every WhatsApp click is attributed to a
// meaningful product, course, or page intent — never "Not specified".
// Used both by the live tracking route and the one-time backfill script.

// The site-wide header/footer WhatsApp buttons route to the default number,
// which is the Lahore office line. So clicks without a city default to Lahore.
export const DEFAULT_ROUTING_CITY = "lahore"

// Maps a page path to a human-readable inquiry intent label.
const PAGE_LABELS: { test: RegExp; label: string }[] = [
  { test: /\/courses\/intensive-programs\/[^/?#]+/, label: "Intensive Program Inquiry" },
  { test: /\/courses\/intensive-programs/, label: "Intensive Programs (General Inquiry)" },
  { test: /\/courses\/workshops/, label: "Workshops (General Inquiry)" },
  { test: /\/courses\/register/, label: "Course Registration Inquiry" },
  { test: /\/courses/, label: "Courses (General Inquiry)" },
  { test: /\/gifting/, label: "Corporate & Gifting Inquiry" },
  { test: /\/about/, label: "General Inquiry (About Page)" },
  { test: /\/contact/, label: "General Inquiry (Contact Page)" },
  { test: /\/gallery/, label: "General Inquiry (Gallery)" },
  { test: /\/newsletter/, label: "General Inquiry (Newsletter)" },
  { test: /\/shop/, label: "Shop Browsing (General Inquiry)" },
]

export function pathnameFromUrl(url?: string | null): string {
  if (!url) return "/"
  try {
    return new URL(url).pathname || "/"
  } catch {
    return url.startsWith("/") ? url.split("?")[0] : "/"
  }
}

function searchParamFromUrl(url: string | null | undefined, key: string): string | null {
  if (!url) return null
  try {
    return new URL(url).searchParams.get(key)
  } catch {
    return null
  }
}

export function labelForPath(path: string): string {
  for (const { test, label } of PAGE_LABELS) if (test.test(path)) return label
  return "General Inquiry (Homepage)"
}

function isBlankProduct(name?: string | null): boolean {
  if (!name) return true
  const v = name.trim().toLowerCase()
  return v === "" || v === "not specified" || v === "not-specified" || v === "unknown" || v === "n/a"
}

function isBlankCity(city?: string | null): boolean {
  if (!city) return true
  const v = city.trim().toLowerCase()
  return v === "" || v === "not-specified" || v === "not specified" || v === "unknown" || v === "n/a"
}

// Normalize a phone number to its last 10 digits for matching across formats
// e.g. "0309-3336142" and "923093336142" both become "3093336142".
export function normalizePhone(phone?: string | null): string {
  if (!phone) return ""
  const digits = phone.replace(/\D/g, "")
  return digits.length > 10 ? digits.slice(-10) : digits
}

export type RawClick = {
  url?: string | null
  productId?: string | null
  productName?: string | null
  city?: string | null
  phoneNumber?: string | null
}

export type ResolvedClick = {
  productId: string | null
  productName: string
  city: string
}

type SqlClient = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<Record<string, unknown>[]>

/**
 * Resolve a raw click into a fully-attributed click. Performs DB lookups to
 * turn shop/course URL slugs into real product/course names, and maps the
 * dialed phone number to a city. Guarantees non-empty productName and city.
 */
export async function resolveClickContext(sql: SqlClient, raw: RawClick): Promise<ResolvedClick> {
  const path = pathnameFromUrl(raw.url)
  let productId = raw.productId && String(raw.productId).trim() ? String(raw.productId).trim() : null
  let productName = isBlankProduct(raw.productName) ? "" : raw.productName!.trim()

  // Derive product/course from the URL when no explicit product was supplied
  if (!productName) {
    const shopMatch = path.match(/\/shop\/([^/?#]+)/)
    let courseSlug = path.match(/\/courses\/intensive-programs\/([^/?#]+)/)?.[1] ?? null
    if (!courseSlug && /\/courses\/register/.test(path)) {
      courseSlug = searchParamFromUrl(raw.url, "course")
    }

    if (shopMatch) {
      const rows = await sql`SELECT id, name FROM products WHERE slug = ${shopMatch[1]} LIMIT 1`
      if (rows[0]) {
        productId = String(rows[0].id)
        productName = String(rows[0].name)
      }
    } else if (courseSlug) {
      const rows = await sql`SELECT title FROM courses WHERE slug = ${courseSlug} LIMIT 1`
      if (rows[0]) productName = String(rows[0].title)
    }
  }

  // Final fallback: a meaningful page-intent label (never "Not specified")
  if (!productName) productName = labelForPath(path)

  // Resolve city: explicit -> phone mapping -> default routing city (Lahore)
  let city = isBlankCity(raw.city) ? "" : raw.city!.trim().toLowerCase()
  if (!city) {
    const target = normalizePhone(raw.phoneNumber)
    if (target) {
      const cityRows = await sql`SELECT slug, whatsapp_number FROM cities`
      for (const r of cityRows) {
        if (normalizePhone(r.whatsapp_number as string) === target) {
          city = String(r.slug)
          break
        }
      }
    }
  }
  if (!city) city = DEFAULT_ROUTING_CITY

  return { productId, productName, city }
}
