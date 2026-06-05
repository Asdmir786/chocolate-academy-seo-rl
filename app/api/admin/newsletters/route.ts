import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getNewsletters, createNewsletter } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const newsletters = await getNewsletters(false)
  return NextResponse.json({ newsletters })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const newsletter = await createNewsletter(body)
    return NextResponse.json({ success: true, newsletter })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create newsletter" },
      { status: 500 },
    )
  }
}
