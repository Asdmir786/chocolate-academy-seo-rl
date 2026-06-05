import { NextResponse } from "next/server"
import { verifyCredentials, createSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }
    const admin = await verifyCredentials(email, password)
    if (!admin) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }
    await createSession(admin.id)
    return NextResponse.json({ success: true, admin })
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Login failed" },
      { status: 500 },
    )
  }
}
