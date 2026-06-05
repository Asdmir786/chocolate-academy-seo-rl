import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { updateNewsletter, deleteNewsletter, setNewsletterActive } from "@/lib/cms"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    const body = await request.json()
    const newsletter = await updateNewsletter(Number(id), body)
    return NextResponse.json({ success: true, newsletter })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update newsletter" },
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
    await setNewsletterActive(Number(id), Boolean(is_active))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update newsletter" },
      { status: 500 },
    )
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const { id } = await params
    await deleteNewsletter(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to delete newsletter" },
      { status: 500 },
    )
  }
}
