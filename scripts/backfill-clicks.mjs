// One-time backfill: re-attribute every "Not specified" WhatsApp click to a
// real product, course, or page-intent label, and resolve its city.
// Run: node --env-file=/vercel/share/.env.project scripts/backfill-clicks.mjs
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

const DEFAULT_ROUTING_CITY = "lahore"

const PAGE_LABELS = [
  [/\/courses\/intensive-programs\/[^/?#]+/, "Intensive Program Inquiry"],
  [/\/courses\/intensive-programs/, "Intensive Programs (General Inquiry)"],
  [/\/courses\/workshops/, "Workshops (General Inquiry)"],
  [/\/courses\/register/, "Course Registration Inquiry"],
  [/\/courses/, "Courses (General Inquiry)"],
  [/\/gifting/, "Corporate & Gifting Inquiry"],
  [/\/about/, "General Inquiry (About Page)"],
  [/\/contact/, "General Inquiry (Contact Page)"],
  [/\/gallery/, "General Inquiry (Gallery)"],
  [/\/newsletter/, "General Inquiry (Newsletter)"],
  [/\/shop/, "Shop Browsing (General Inquiry)"],
]

function pathnameFromUrl(url) {
  if (!url) return "/"
  try {
    return new URL(url).pathname || "/"
  } catch {
    return url.startsWith("/") ? url.split("?")[0] : "/"
  }
}
function searchParam(url, key) {
  try {
    return new URL(url).searchParams.get(key)
  } catch {
    return null
  }
}
function labelForPath(path) {
  for (const [re, label] of PAGE_LABELS) if (re.test(path)) return label
  return "General Inquiry (Homepage)"
}
function isBlankProduct(name) {
  if (!name) return true
  const v = String(name).trim().toLowerCase()
  return ["", "not specified", "not-specified", "unknown", "n/a"].includes(v)
}
function isBlankCity(city) {
  if (!city) return true
  const v = String(city).trim().toLowerCase()
  return ["", "not-specified", "not specified", "unknown", "n/a"].includes(v)
}
function normalizePhone(phone) {
  if (!phone) return ""
  const d = String(phone).replace(/\D/g, "")
  return d.length > 10 ? d.slice(-10) : d
}

async function main() {
  const products = await sql`SELECT id, slug, name FROM products`
  const courses = await sql`SELECT slug, title FROM courses`
  const cities = await sql`SELECT slug, whatsapp_number FROM cities`
  const productBySlug = new Map(products.map((p) => [p.slug, p]))
  const courseBySlug = new Map(courses.map((c) => [c.slug, c]))
  const cityByPhone = new Map(cities.map((c) => [normalizePhone(c.whatsapp_number), c.slug]))

  const rows = await sql`
    SELECT id, url, product_id, product_name, city, phone_number
    FROM whatsapp_clicks
    ORDER BY id
  `
  console.log(`Scanning ${rows.length} clicks...`)

  let productFixed = 0
  let labelFixed = 0
  let cityFixed = 0
  let unchanged = 0

  for (const row of rows) {
    const path = pathnameFromUrl(row.url)
    let productId = row.product_id && String(row.product_id).trim() ? String(row.product_id).trim() : null
    let productName = isBlankProduct(row.product_name) ? "" : String(row.product_name).trim()
    const hadProduct = !!productName

    if (!productName) {
      const shopMatch = path.match(/\/shop\/([^/?#]+)/)
      let courseSlug = path.match(/\/courses\/intensive-programs\/([^/?#]+)/)?.[1] ?? null
      if (!courseSlug && /\/courses\/register/.test(path)) courseSlug = searchParam(row.url, "course")

      if (shopMatch && productBySlug.has(shopMatch[1])) {
        const p = productBySlug.get(shopMatch[1])
        productId = String(p.id)
        productName = p.name
        productFixed++
      } else if (courseSlug && courseBySlug.has(courseSlug)) {
        productName = courseBySlug.get(courseSlug).title
        productFixed++
      } else {
        productName = labelForPath(path)
        labelFixed++
      }
    }

    let city = isBlankCity(row.city) ? "" : String(row.city).trim().toLowerCase()
    const hadCity = !!city
    if (!city) {
      const mapped = cityByPhone.get(normalizePhone(row.phone_number))
      city = mapped || DEFAULT_ROUTING_CITY
      cityFixed++
    }

    if (hadProduct && hadCity) {
      unchanged++
      continue
    }

    await sql`
      UPDATE whatsapp_clicks
      SET product_id = ${productId}, product_name = ${productName}, city = ${city}
      WHERE id = ${row.id}
    `
  }

  console.log(`Done. product/course resolved: ${productFixed}, page-intent labelled: ${labelFixed}, city resolved: ${cityFixed}, already-good: ${unchanged}`)

  const remaining = await sql`
    SELECT COUNT(*)::int AS c FROM whatsapp_clicks
    WHERE product_name IS NULL OR product_name ILIKE '%not specified%' OR city ILIKE '%not-specified%'
  `
  console.log(`Remaining unspecified rows: ${remaining[0].c}`)
}

main().catch((e) => {
  console.error("Backfill failed:", e)
  process.exit(1)
})
