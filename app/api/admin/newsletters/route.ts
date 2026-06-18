import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import {
  getDb,
  getNewsletterDownloadPath,
  initNewslettersTable,
  listNewsletters,
} from "@/lib/newsletters"

export async function GET() {
  try {
    await initNewslettersTable()
    const newsletters = await listNewsletters()

    return NextResponse.json(
      newsletters.map((newsletter) => ({
        ...newsletter,
        download_url: getNewsletterDownloadPath(newsletter.id),
      })),
    )
  } catch (error) {
    console.error("Error fetching newsletters:", error)
    return NextResponse.json({ error: "Failed to fetch newsletters" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await initNewslettersTable()
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const title = formData.get("title") as string
    const month = formData.get("month") as string
    const year = formData.get("year") as string
    const description = formData.get("description") as string
    const is_published = formData.get("is_published") === "true"

    let pdf_url = (formData.get("pdf_url") as string) || ""
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

    if (!pdf_url) {
      return NextResponse.json({ error: "No PDF provided" }, { status: 400 })
    }

    const sql = getDb()
    const result = await sql`
      INSERT INTO newsletters (title, month, year, description, pdf_url, storage_type, is_published)
      VALUES (${title}, ${month}, ${Number(year)}, ${description}, ${pdf_url}, ${storage_type}, ${is_published})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      newsletter: {
        ...result[0],
        download_url: getNewsletterDownloadPath(result[0].id),
      },
    })
  } catch (error) {
    console.error("Error creating newsletter:", error)
    return NextResponse.json({ error: "Failed to create newsletter" }, { status: 500 })
  }
}
