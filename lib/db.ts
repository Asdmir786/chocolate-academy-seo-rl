import { neon } from "@neondatabase/serverless"

// Single shared Neon client for the whole app.
// Reuses the existing DATABASE_URL that already powers whatsapp_clicks.
function getDatabaseUrl() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error("DATABASE_URL environment variable is required for the Neon database connection")
  }
  return url
}

export const sql = neon(getDatabaseUrl())

let schemaReady: Promise<void> | null = null

/**
 * Creates every CMS table if it does not already exist.
 * Safe to call on every request - it is memoized per server instance and
 * uses CREATE TABLE IF NOT EXISTS so it never touches existing data
 * (including the existing whatsapp_clicks table).
 */
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = initSchema().catch((err) => {
      // Reset so a later request can retry after a transient failure.
      schemaReady = null
      throw err
    })
  }
  return schemaReady
}

async function initSchema() {
  // ---- Admin users ----
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ---- Sessions (lightweight cookie-backed sessions) ----
  await sql`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL
    )
  `

  // ---- Cities master (city -> WhatsApp number) ----
  await sql`
    CREATE TABLE IF NOT EXISTS cities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL UNIQUE,
      slug VARCHAR(120) NOT NULL UNIQUE,
      whatsapp_number VARCHAR(40) NOT NULL,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ---- Categories master ----
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(160) NOT NULL UNIQUE,
      slug VARCHAR(160) NOT NULL UNIQUE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ---- Products ----
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price INTEGER NOT NULL DEFAULT 0,
      image TEXT NOT NULL DEFAULT '',
      category VARCHAR(160) NOT NULL DEFAULT '',
      weight VARCHAR(60),
      sku VARCHAR(80),
      rating INTEGER NOT NULL DEFAULT 5,
      discount INTEGER NOT NULL DEFAULT 0,
      is_new BOOLEAN NOT NULL DEFAULT FALSE,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      city_slugs TEXT[] NOT NULL DEFAULT '{}',
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug)`
  await sql`CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active)`

  // ---- Courses ----
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      duration VARCHAR(120) NOT NULL DEFAULT '',
      level VARCHAR(120) NOT NULL DEFAULT '',
      certification TEXT NOT NULL DEFAULT '',
      fee INTEGER NOT NULL DEFAULT 0,
      register_url TEXT NOT NULL DEFAULT '',
      highlights TEXT[] NOT NULL DEFAULT '{}',
      program_overview TEXT NOT NULL DEFAULT '',
      detailed_curriculum TEXT NOT NULL DEFAULT '',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ---- Newsletters ----
  await sql`
    CREATE TABLE IF NOT EXISTS newsletters (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      month VARCHAR(20) NOT NULL,
      year INTEGER NOT NULL,
      pdf_url TEXT NOT NULL DEFAULT '',
      download_name VARCHAR(255) NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletters_month_year ON newsletters(month, year)`

  // ---- Course registration inquiries (captured from the register form) ----
  await sql`
    CREATE TABLE IF NOT EXISTS course_inquiries (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(80),
      city VARCHAR(120),
      course VARCHAR(255),
      payment_method VARCHAR(120),
      message TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ---- Ensure the existing whatsapp_clicks table exists (no-op if present) ----
  await sql`
    CREATE TABLE IF NOT EXISTS whatsapp_clicks (
      id SERIAL PRIMARY KEY,
      product_id VARCHAR(255),
      product_name VARCHAR(255),
      url TEXT NOT NULL,
      city VARCHAR(100),
      source VARCHAR(255),
      button_location VARCHAR(255),
      timestamp TIMESTAMPTZ DEFAULT NOW(),
      user_agent TEXT,
      phone_number VARCHAR(50),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
