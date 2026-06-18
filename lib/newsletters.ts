import { neon } from "@neondatabase/serverless"

export type NewsletterRecord = {
  id: number
  title: string
  month: string
  year: number
  description: string | null
  pdf_url: string
  storage_type: "external" | "local" | "blob-private"
  is_published: boolean
  created_at: string
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

const monthSortCase = MONTHS.map((month, index) => `WHEN '${month}' THEN ${index + 1}`).join(" ")

export const NEWSLETTER_MONTHS = [...MONTHS]

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required")
  }

  return neon(process.env.DATABASE_URL)
}

export async function initNewslettersTable() {
  const sql = getDb()

  await sql`
    CREATE TABLE IF NOT EXISTS newsletters (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      month VARCHAR(50) NOT NULL,
      year INTEGER NOT NULL,
      description TEXT,
      pdf_url TEXT NOT NULL,
      storage_type VARCHAR(20) NOT NULL DEFAULT 'external',
      is_published BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    ALTER TABLE newsletters
    ADD COLUMN IF NOT EXISTS storage_type VARCHAR(20) NOT NULL DEFAULT 'external'
  `
}

export async function listNewsletters(options?: { publishedOnly?: boolean }) {
  const sql = getDb()
  const publishedOnly = options?.publishedOnly ?? false

  const filterClause = publishedOnly ? `WHERE is_published = true` : ""
  const query = `
    SELECT id, title, month, year, description, pdf_url, storage_type, is_published, created_at
    FROM newsletters
    ${filterClause}
    ORDER BY year DESC,
      CASE month
        ${monthSortCase}
        ELSE 0
      END DESC,
      created_at DESC
  `

  return sql(query) as Promise<NewsletterRecord[]>
}

export function getNewsletterDownloadPath(id: number) {
  return `/api/newsletters/${id}/download`
}
