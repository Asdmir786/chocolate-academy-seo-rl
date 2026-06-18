import { NextResponse } from "next/server"
import {
  getNewsletterDownloadPath,
  initNewslettersTable,
  listNewsletters,
} from "@/lib/newsletters"

export async function GET() {
  try {
    await initNewslettersTable()
    const newsletters = await listNewsletters({ publishedOnly: true })

    return NextResponse.json(
      newsletters.map((newsletter) => ({
        ...newsletter,
        download_url: getNewsletterDownloadPath(newsletter.id),
      })),
    )
  } catch (error) {
    console.error("Error fetching published newsletters:", error)
    return NextResponse.json({ error: "Failed to fetch newsletters" }, { status: 500 })
  }
}
