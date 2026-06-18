import { get } from "@vercel/blob"
import { NextResponse } from "next/server"
import { ensureSchema, sql } from "@/lib/db"
import type { Newsletter } from "@/lib/cms"

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: Request, context: RouteContext) {
  try {
    await ensureSchema()

    const { id } = await context.params
    const newsletterId = Number(id)

    if (!Number.isFinite(newsletterId)) {
      return NextResponse.json({ error: "Invalid newsletter id" }, { status: 400 })
    }

    const result = (await sql`
      SELECT id, title, month, year, pdf_url, download_name, description, is_active, storage_type
      FROM newsletters
      WHERE id = ${newsletterId}
      LIMIT 1
    `) as Newsletter[]

    const newsletter = result[0]

    if (!newsletter || !newsletter.is_active) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 })
    }

    if (newsletter.storage_type === "blob-private") {
      const blob = await get(newsletter.pdf_url, { access: "private" })

      if (!blob || blob.statusCode !== 200) {
        return NextResponse.json({ error: "Newsletter file not found" }, { status: 404 })
      }

      return new Response(blob.stream, {
        headers: {
          "content-type": blob.blob.contentType || "application/pdf",
          "content-disposition": `attachment; filename="${newsletter.download_name || `${newsletter.month}-${newsletter.year}.pdf`}"`,
          "cache-control": "private, no-store",
        },
      })
    }

    const url = newsletter.pdf_url.startsWith("/")
      ? new URL(newsletter.pdf_url, request.url)
      : new URL(newsletter.pdf_url)

    return NextResponse.redirect(url)
  } catch (error) {
    console.error("Error downloading newsletter:", error)
    return NextResponse.json({ error: "Failed to download newsletter" }, { status: 500 })
  }
}
