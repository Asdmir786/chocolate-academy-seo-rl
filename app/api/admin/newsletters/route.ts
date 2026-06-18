import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { createNewsletter, getNewsletters } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const newsletters = await getNewsletters(false)
    return NextResponse.json({
      newsletters: newsletters.map((newsletter) => ({
        ...newsletter,
        download_url: `/api/newsletters/${newsletter.id}/download`,
        is_published: newsletter.is_active,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to fetch newsletters" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const title = String(formData.get("title") || "")
    const month = String(formData.get("month") || "")
    const year = Number(formData.get("year") || 0)
    const description = String(formData.get("description") || "")
    const is_active = formData.get("is_published") === "true"
    let pdf_url = String(formData.get("pdf_url") || "")
    let storage_type: "external" | "local" | "blob-private" = pdf_url.startsWith("/") ? "local" : "external"

    if (file && file.size > 0) {
      const sanitizedFilename = file.name.replace(/\s+/g, "-")
      const blob = await put(`newsletters/${year}/${month.toLowerCase()}-${sanitizedFilename}`, file, {
        access: "private",
        addRandomSuffix: true,
        multipart: file.size > 4_500_000,
      })
      pdf_url = blob.url
      storage_type = "blob-private"
    }

    if (!title || !month || !year || !pdf_url) {
      return NextResponse.json({ success: false, error: "Missing newsletter fields" }, { status: 400 })
    }

    const download_name =
      file?.name?.trim() || `${title.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "") || "newsletter"}.pdf`

    const newsletter = await createNewsletter({
      title,
      month,
      year,
      pdf_url,
      download_name,
      description,
      is_active,
      storage_type,
    })

    return NextResponse.json({
      success: true,
      newsletter: {
        ...newsletter,
        download_url: `/api/newsletters/${newsletter.id}/download`,
        is_published: newsletter.is_active,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create newsletter" },
      { status: 500 },
    )
  }
}
