import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getCourseInquiries } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const inquiries = await getCourseInquiries()
  return NextResponse.json({ inquiries })
}
