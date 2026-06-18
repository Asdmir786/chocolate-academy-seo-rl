import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getDashboardStats, getCommerceStats } from "@/lib/cms"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const [stats, commerce] = await Promise.all([getDashboardStats(), getCommerceStats()])
    return NextResponse.json({ success: true, stats, commerce })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to load stats" },
      { status: 500 },
    )
  }
}
