import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { WhatsAppClickEvent, AnalyticsData } from "@/lib/analytics"

// In-memory fallback for environments where file system access is restricted
const inMemoryStore: WhatsAppClickEvent[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received tracking data:", body)

    // Validate required fields
    if (!body.url) {
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 })
    }

    // Create event object with fallbacks for optional fields
    const event: WhatsAppClickEvent = {
      productId: body.productId || undefined,
      productName: body.productName || "Not specified",
      url: body.url,
      city: body.city || "not-specified",
      source: body.source || "unknown",
      buttonLocation: body.buttonLocation || "unknown",
      timestamp: new Date().toISOString(),
      userAgent: body.userAgent || undefined,
    }

    // Store in memory
    inMemoryStore.push(event)
    console.log("Successfully tracked WhatsApp click (in memory)")

    // Try to save to file system if possible
    try {
      const dataDir = path.join(process.cwd(), "data")
      const dataFilePath = path.join(dataDir, "analytics.json")

      // Create directory if it doesn't exist
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }

      // Read existing data or create new structure
      let analyticsData: AnalyticsData = { whatsappClicks: [] }
      if (fs.existsSync(dataFilePath)) {
        try {
          const fileData = fs.readFileSync(dataFilePath, "utf8")
          analyticsData = JSON.parse(fileData)
        } catch (e) {
          console.error("Error reading analytics file:", e)
        }
      }

      // Add new event and save
      analyticsData.whatsappClicks.push(event)
      fs.writeFileSync(dataFilePath, JSON.stringify(analyticsData, null, 2))
      console.log("Successfully saved WhatsApp click to file")
    } catch (fsError) {
      console.error("File system error (non-critical):", fsError)
      // This is non-critical as we already stored in memory
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking WhatsApp click:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Try to get data from file system first
    try {
      const dataFilePath = path.join(process.cwd(), "data", "analytics.json")
      if (fs.existsSync(dataFilePath)) {
        const fileData = fs.readFileSync(dataFilePath, "utf8")
        const analyticsData = JSON.parse(fileData)
        return NextResponse.json(analyticsData)
      }
    } catch (fsError) {
      console.error("Error reading from file system:", fsError)
    }

    // Fall back to in-memory data
    return NextResponse.json({ whatsappClicks: inMemoryStore })
  } catch (error) {
    console.error("Error retrieving analytics data:", error)
    return NextResponse.json({ whatsappClicks: [] })
  }
}
