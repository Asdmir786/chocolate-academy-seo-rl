import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import type { WhatsAppClickEvent, AnalyticsData } from "@/lib/analytics"

// Initialize Neon database client
let sql: any = null

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
    console.log("✅ Neon database client initialized successfully")
  } else {
    console.error("❌ DATABASE_URL not found in environment variables")
  }
} catch (error) {
  console.error("❌ Neon database initialization failed:", error)
}

// Fallback in-memory storage
const inMemoryStore: WhatsAppClickEvent[] = []

// Initialize database table if it doesn't exist
async function initializeDatabase() {
  if (!sql) {
    console.log("⚠️ No SQL client available for database initialization")
    return false
  }

  try {
    console.log("🔄 Initializing database table...")

    // Create table with proper structure
    await sql`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255),
        product_name VARCHAR(255),
        url TEXT,
        city VARCHAR(100),
        source VARCHAR(255),
        button_location VARCHAR(255),
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        user_agent TEXT,
        phone_number VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    console.log("✅ Database table initialized successfully")

    // Check if table has data
    const count = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Current records in database: ${count[0]?.count || 0}`)

    return true
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    return false
  }
}

export async function POST(request: Request) {
  console.log("📥 POST /api/track-whatsapp received request")

  try {
    const body = await request.json()
    console.log("📋 Request body:", JSON.stringify(body, null, 2))

    // Validate required fields
    if (!body.url) {
      console.error("❌ Missing required field: url")
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 })
    }

    // Create event object with fallbacks for optional fields
    const event: WhatsAppClickEvent = {
      productId: body.productId || null,
      productName: body.productName || "Not specified",
      url: body.url,
      city: body.city || "not-specified",
      source: body.source || "unknown",
      buttonLocation: body.buttonLocation || "unknown",
      timestamp: new Date().toISOString(),
      userAgent: body.userAgent || null,
      phoneNumber: body.phoneNumber || null,
    }

    console.log("📝 Prepared event data:", JSON.stringify(event, null, 2))

    if (sql) {
      try {
        console.log("🔄 Attempting to save to Neon database...")

        // Initialize database if needed
        await initializeDatabase()

        // Insert the event into the database
        const result = await sql`
          INSERT INTO whatsapp_clicks (
            product_id, 
            product_name, 
            url, 
            city, 
            source, 
            button_location, 
            timestamp, 
            user_agent, 
            phone_number
          ) VALUES (
            ${event.productId}, 
            ${event.productName}, 
            ${event.url}, 
            ${event.city}, 
            ${event.source}, 
            ${event.buttonLocation}, 
            ${event.timestamp}, 
            ${event.userAgent}, 
            ${event.phoneNumber}
          )
          RETURNING id, timestamp
        `

        console.log("✅ Successfully saved to Neon database:", result[0])

        return NextResponse.json({
          success: true,
          id: result[0]?.id,
          timestamp: result[0]?.timestamp,
          message: "Data saved to Neon database",
        })
      } catch (dbError) {
        console.error("❌ Database error:", dbError)

        // Fallback to in-memory storage
        inMemoryStore.push(event)
        console.log("💾 Saved to in-memory storage as fallback")

        return NextResponse.json({
          success: true,
          fallback: true,
          message: "Data saved to memory (database unavailable)",
        })
      }
    } else {
      // No database available, use in-memory storage
      inMemoryStore.push(event)
      console.log("💾 Saved to in-memory storage (no database)")

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data saved to memory (no database configured)",
      })
    }
  } catch (error) {
    console.error("❌ Error in POST handler:", error)
    return NextResponse.json(
      {
        error: "Failed to track event",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("📤 GET /api/track-whatsapp received request")

  try {
    if (sql) {
      try {
        console.log("🔄 Attempting to fetch data from Neon database...")

        // First, check if the table exists and has data
        const tableCheck = await sql`
          SELECT COUNT(*) as count FROM whatsapp_clicks
        `
        console.log(`📊 Total records in database: ${tableCheck[0]?.count || 0}`)

        if (tableCheck[0]?.count === 0) {
          console.log("⚠️ No records found in database")
          return NextResponse.json({
            whatsappClicks: [],
            message: "No data found in database",
            source: "neon_database",
          })
        }

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

        console.log(`📋 Raw database results (${results.length} records):`, results.slice(0, 2))

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

        console.log(`✅ Successfully mapped ${mappedResults.length} records from database`)
        console.log("📤 Sample mapped data:", mappedResults.slice(0, 1))

        return NextResponse.json({
          ...analyticsData,
          source: "neon_database",
          totalRecords: mappedResults.length,
        })
      } catch (dbError) {
        console.error("❌ Database error during GET:", dbError)

        // Fallback to in-memory storage
        console.log("💾 Falling back to in-memory storage")
        return NextResponse.json({
          whatsappClicks: inMemoryStore,
          source: "memory_fallback",
          error: "Database unavailable",
        })
      }
    } else {
      // No database available, use in-memory storage
      console.log("💾 Using in-memory storage (no database)")
      return NextResponse.json({
        whatsappClicks: inMemoryStore,
        source: "memory_only",
      })
    }
  } catch (error) {
    console.error("❌ Error in GET handler:", error)
    return NextResponse.json(
      {
        whatsappClicks: [],
        error: "Failed to retrieve data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
