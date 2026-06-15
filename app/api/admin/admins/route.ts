import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { listAdmins, createAdmin } from "@/lib/auth"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const admins = await listAdmins()
  return NextResponse.json({ admins })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { name, email, password } = await request.json()
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "Name, email and password are required" }, { status: 400 })
    }
    const admin = await createAdmin({ name, email, password })
    return NextResponse.json({ success: true, admin })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create admin"
    const duplicate = message.includes("duplicate") || message.includes("unique")
    return NextResponse.json(
      { success: false, error: duplicate ? "An admin with this email already exists" : message },
      { status: 500 },
    )
  }
}
