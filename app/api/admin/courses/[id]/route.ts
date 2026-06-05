import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { updateCourse, deleteCourse, setCourseActive } from "@/lib/cms"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await request.json()
    const course = await updateCourse(Number(id), body)
    return NextResponse.json({ success: true, course })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update course" },
      { status: 500 },
    )
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const { is_active } = await request.json()
    await setCourseActive(Number(id), Boolean(is_active))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update course" },
      { status: 500 },
    )
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await deleteCourse(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to delete course" },
      { status: 500 },
    )
  }
}
