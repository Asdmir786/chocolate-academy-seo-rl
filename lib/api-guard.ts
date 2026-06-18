import "server-only"
import { NextResponse } from "next/server"
import { getCurrentAdmin, type AdminUser } from "./auth"

/**
 * Returns the current admin or a 401 NextResponse.
 * Usage:
 *   const auth = await requireAdmin()
 *   if (auth instanceof NextResponse) return auth
 *   // auth is AdminUser here
 */
export async function requireAdmin(): Promise<AdminUser | NextResponse> {
  const admin = await getCurrentAdmin()
  if (!admin) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
  }
  return admin
}
