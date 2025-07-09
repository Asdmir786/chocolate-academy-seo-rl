import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
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

// Initialize Neon database client
let sql: any = null

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
    console.log("Neon database client initialized successfully")
  } else {
    console.warn("DATABASE_URL not found in environment variables")
  }
} catch (error) {
  console.warn("Neon database not available:", error)
}

// Fallback in-memory storage
const inMemoryStore: WhatsAppClickEvent[] = []

// Initialize database table if it doesn't exist
async function initializeDatabase() {
  if (!sql) return false

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255),
        product_name VARCHAR(255),
        url TEXT,
        city VARCHAR(100),
        source VARCHAR(255),
        button_location VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT,
        phone_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    console.log("Database table initialized successfully")
    return true
  } catch (error) {
    console.error("Error initializing database:", error)
    return false
  }
}

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
      phoneNumber: body.phoneNumber || undefined,
    }

    if (sql) {
      // --- Persistence using Neon Database ---
      try {
        // Initialize database if needed
        await initializeDatabase()

        // Insert the event into the database
        const result = await sql`
          INSERT INTO whatsapp_clicks (
            product_id, product_name, url, city, source, 
            button_location, timestamp, user_agent, phone_number
          ) VALUES (
            ${event.productId}, ${event.productName}, ${event.url}, 
            ${event.city}, ${event.source}, ${event.buttonLocation}, 
            ${event.timestamp}, ${event.userAgent}, ${event.phoneNumber}
          )
          RETURNING id
        `
        console.log("Successfully saved WhatsApp click to Neon database. ID:", result[0]?.id)
      } catch (dbError) {
        console.error("Database error, falling back to memory:", dbError)
        inMemoryStore.push(event)
      }
    } else if (redis) {
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
      console.log("Saved WhatsApp click to in-memory storage (Redis and Database not available)")
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
    if (sql) {
      // --- Retrieve data from Neon Database ---
      try {
        console.log("Attempting to fetch data from Neon database...")

        // First, let's check if the table exists and has data
        const tableCheck = await sql`
          SELECT COUNT(*) as count FROM whatsapp_clicks
        `
        console.log("Table row count:", tableCheck[0]?.count)

        // Fetch the actual data with proper column mapping
        const results = await sql`
          SELECT 
            id,
            product_id,
            product_name, 
            url, 
            city, 
            source, 
            button_location,
            timestamp,
            user_agent,
            phone_number,
            created_at
          FROM whatsapp_clicks 
          ORDER BY timestamp DESC 
          LIMIT 1000
        `

        console.log("Raw database results:", results)

        // Map the database results to match our expected format
        const mappedResults: WhatsAppClickEvent[] = results.map((row: any) => ({
          productId: row.product_id,
          productName: row.product_name,
          url: row.url,
          city: row.city,
          source: row.source,
          buttonLocation: row.button_location,
          timestamp: row.timestamp,
          userAgent: row.user_agent,
          phoneNumber: row.phone_number,
        }))

        const analyticsData: AnalyticsData = {
          whatsappClicks: mappedResults,
        }

        console.log("Mapped analytics data:", JSON.stringify(analyticsData, null, 2))
        console.log("Returning", mappedResults.length, "records from database")

        return NextResponse.json(analyticsData)
      } catch (dbError) {
        console.error("Database error details:", dbError)
        console.error("Falling back to Redis or memory storage")

        // Fall back to Redis if database fails
        if (redis) {
          try {
            const analyticsData = await redis.get<AnalyticsData>("whatsappClicks")
            console.log("Retrieved analytics data from Upstash Redis fallback")
            return NextResponse.json(analyticsData || { whatsappClicks: [] })
          } catch (redisError) {
            console.error("Redis fallback also failed:", redisError)
            return NextResponse.json({ whatsappClicks: inMemoryStore })
          }
        } else {
          return NextResponse.json({ whatsappClicks: inMemoryStore })
        }
      }
    } else if (redis) {
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
      console.log("Using in-memory storage fallback")
      return NextResponse.json({ whatsappClicks: inMemoryStore })
    }
  } catch (error) {
    console.error("Error retrieving analytics data:", error)
    return NextResponse.json({
      whatsappClicks: [],
      error: "Failed to retrieve data",
    })
  }
}
