import { NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

// Initialize Upstash Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export async function POST() {
  try {
    // Clear WhatsApp clicks in Upstash Redis by setting it to an empty array
    await redis.set("whatsappClicks", [])

    return NextResponse.json({ success: true, message: "Analytics data cleared successfully" })
  } catch (error) {
    console.error("Error clearing analytics data:", error)
    return NextResponse.json(
      { success: false, message: "Failed to clear analytics data", error: String(error) },
      { status: 500 },
    )
  }
}
