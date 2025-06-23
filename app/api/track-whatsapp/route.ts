import { NextResponse } from "next/server"
import type { WhatsAppClickEvent, AnalyticsData } from "@/lib/analytics"

// Initialize Upstash Redis client only if environment variables are available
let redis: any = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { Redis } = require("@upstash/redis")
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
} catch (error) {
  console.warn("Upstash Redis not available:", error)
}

// Fallback in-memory storage
const inMemoryStore: WhatsAppClickEvent[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("POST /api/track-whatsapp received request.")
    console.log("Request body:", JSON.stringify(body, null, 2))

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

    if (redis) {
      // --- Persistence using Upstash Redis ---
      try {
        const existingData = await redis.get<AnalyticsData>("whatsappClicks")
        const analyticsData: AnalyticsData = existingData || { whatsappClicks: [] }

        analyticsData.whatsappClicks.push(event)
        await redis.set("whatsappClicks", analyticsData)
        console.log("Successfully saved WhatsApp click to Upstash Redis.")
      } catch (redisError) {
        console.error("Redis error, falling back to memory:", redisError)
        inMemoryStore.push(event)
      }
    } else {
      // Fallback to in-memory storage
      inMemoryStore.push(event)
      console.log("Saved WhatsApp click to in-memory storage (Redis not available)")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking WhatsApp click:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}

export async function GET() {
  console.log("GET /api/track-whatsapp received request.")
  try {
    if (redis) {
      // --- Retrieve data from Upstash Redis ---
      try {
        const analyticsData = await redis.get<AnalyticsData>("whatsappClicks")
        console.log("Retrieved analytics data from Upstash Redis:", JSON.stringify(analyticsData, null, 2))
        return NextResponse.json(analyticsData || { whatsappClicks: [] })
      } catch (redisError) {
        console.error("Redis error, falling back to memory:", redisError)
        return NextResponse.json({ whatsappClicks: inMemoryStore })
      }
    } else {
      // Fallback to in-memory storage
      return NextResponse.json({ whatsappClicks: inMemoryStore })
    }
  } catch (error) {
    console.error("Error retrieving analytics data:", error)
    return NextResponse.json({ whatsappClicks: [] })
  }
}
