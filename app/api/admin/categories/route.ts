import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getCategories, createCategory } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const categories = await getCategories(false)
  return NextResponse.json({ categories })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const category = await createCategory(body)
    return NextResponse.json({ success: true, category })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create category" },
      { status: 500 },
    )
  }
}
