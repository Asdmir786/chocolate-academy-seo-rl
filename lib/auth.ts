import "server-only"
import { cookies } from "next/headers"
import { randomBytes } from "crypto"
import bcrypt from "bcryptjs"
import { sql, ensureSchema } from "./db"

const SESSION_COOKIE = "ca_admin_session"
const SESSION_DAYS = 1
const SESSION_DAYS_REMEMBER = 30

export type AdminUser = {
  id: number
  name: string
  email: string
  is_active: boolean
  created_at: string
}

/**
 * Ensures at least one admin exists. If the table is empty, it seeds a
 * default admin from env vars (or sensible fallbacks) so the dashboard is
 * never locked out.
 */
export async function ensureDefaultAdmin() {
  await ensureSchema()
  const rows = await sql`SELECT COUNT(*)::int AS count FROM admin_users`
  if ((rows[0]?.count ?? 0) > 0) return

  const email = process.env.ADMIN_EMAIL || "admin@chocolateacademy.com.pk"
  const password = process.env.ADMIN_PASSWORD || "chocolate@#"
  const hash = await bcrypt.hash(password, 10)
  await sql`
    INSERT INTO admin_users (name, email, password_hash, is_active)
    VALUES ('Administrator', ${email.toLowerCase()}, ${hash}, TRUE)
    ON CONFLICT (email) DO NOTHING
  `
}

export async function verifyCredentials(email: string, password: string): Promise<AdminUser | null> {
  await ensureSchema()
  await ensureDefaultAdmin()
  const rows = await sql`
    SELECT id, name, email, password_hash, is_active, created_at
    FROM admin_users WHERE email = ${email.toLowerCase()} LIMIT 1
  `
  const user = rows[0] as (AdminUser & { password_hash: string }) | undefined
  if (!user || !user.is_active) return null
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return null
  return { id: user.id, name: user.name, email: user.email, is_active: user.is_active, created_at: user.created_at }
}

export async function createSession(adminId: number, remember = false) {
  await ensureSchema()
  const token = randomBytes(32).toString("hex")
  const days = remember ? SESSION_DAYS_REMEMBER : SESSION_DAYS
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  await sql`
    INSERT INTO admin_sessions (token, admin_id, expires_at)
    VALUES (${token}, ${adminId}, ${expiresAt.toISOString()})
  `
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    expires: expiresAt,
  })
}

export async function destroySession() {
  await ensureSchema()
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    await sql`DELETE FROM admin_sessions WHERE token = ${token}`
  }
  cookieStore.delete(SESSION_COOKIE)
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  await ensureSchema()
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  const rows = await sql`
    SELECT u.id, u.name, u.email, u.is_active, u.created_at
    FROM admin_sessions s
    JOIN admin_users u ON u.id = s.admin_id
    WHERE s.token = ${token} AND s.expires_at > NOW() AND u.is_active = TRUE
    LIMIT 1
  `
  return (rows[0] as AdminUser) ?? null
}

// ---------- Admin management (Settings) ----------
export async function listAdmins(): Promise<AdminUser[]> {
  await ensureSchema()
  const rows = await sql`SELECT id, name, email, is_active, created_at FROM admin_users ORDER BY created_at`
  return rows as AdminUser[]
}

export async function createAdmin(data: { name: string; email: string; password: string }) {
  await ensureSchema()
  const hash = await bcrypt.hash(data.password, 10)
  const rows = await sql`
    INSERT INTO admin_users (name, email, password_hash, is_active)
    VALUES (${data.name}, ${data.email.toLowerCase()}, ${hash}, TRUE)
    RETURNING id, name, email, is_active, created_at
  `
  return rows[0] as AdminUser
}

export async function updateAdmin(id: number, data: { name: string; email: string; password?: string; is_active: boolean }) {
  await ensureSchema()
  if (data.password && data.password.length > 0) {
    const hash = await bcrypt.hash(data.password, 10)
    await sql`
      UPDATE admin_users SET name = ${data.name}, email = ${data.email.toLowerCase()},
        password_hash = ${hash}, is_active = ${data.is_active}, updated_at = NOW()
      WHERE id = ${id}
    `
  } else {
    await sql`
      UPDATE admin_users SET name = ${data.name}, email = ${data.email.toLowerCase()},
        is_active = ${data.is_active}, updated_at = NOW()
      WHERE id = ${id}
    `
  }
}

export async function deleteAdmin(id: number) {
  await ensureSchema()
  // Prevent deleting the last remaining admin.
  const rows = await sql`SELECT COUNT(*)::int AS count FROM admin_users`
  if ((rows[0]?.count ?? 0) <= 1) {
    throw new Error("Cannot delete the only remaining admin")
  }
  await sql`DELETE FROM admin_users WHERE id = ${id}`
}
