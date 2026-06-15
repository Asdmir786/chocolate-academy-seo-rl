import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { requireAdmin } from "@/lib/api-guard"

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    const folder = (formData.get("folder") as string) || "uploads"
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")
    const blob = await put(`${folder}/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({ success: true, url: blob.url, pathname: blob.pathname })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    )
  }
}
