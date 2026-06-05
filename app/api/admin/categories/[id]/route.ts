import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { updateCategory, deleteCategory } from "@/lib/cms"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await request.json()
    const category = await updateCategory(Number(id), body)
    return NextResponse.json({ success: true, category })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update category" },
      { status: 500 },
    )
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await deleteCategory(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to delete category" },
      { status: 500 },
    )
  }
}
