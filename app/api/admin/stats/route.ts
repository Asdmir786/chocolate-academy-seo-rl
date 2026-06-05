import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getDashboardStats } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const stats = await getDashboardStats()
    return NextResponse.json({ success: true, stats })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to load stats" },
      { status: 500 },
    )
  }
}
