import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Types
export type WhatsAppClickEvent = {
  productId?: string
  productName?: string
  url?: string
  city?: string
  source?: string
  buttonLocation?: string
  timestamp: string
  userAgent?: string
  phoneNumber?: string
}

export type AnalyticsData = {
  whatsappClicks: WhatsAppClickEvent[]
}

// Initialize Neon database client
let sql: any = null

const initializeNeonClient = () => {
  try {
    if (process.env.DATABASE_URL) {
      sql = neon(process.env.DATABASE_URL)
      console.log("✅ Neon database client initialized successfully")
      console.log("🔗 Database URL exists:", !!process.env.DATABASE_URL)
      return true
    } else {
      console.error("❌ DATABASE_URL not found in environment variables")
      console.log(
        "🔍 Available env vars:",
        Object.keys(process.env).filter((key) => key.includes("DATABASE")),
      )
      return false
    }
  } catch (error) {
    console.error("❌ Neon database initialization failed:", error)
    return false
  }
}

// Initialize on module load
const isClientInitialized = initializeNeonClient()

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

    // First, test the connection
    const testQuery = await sql`SELECT NOW() as current_time`
    console.log("✅ Database connection test successful:", testQuery[0])

    // Create table with proper structure
    await sql`
      CREATE TABLE IF NOT EXISTS whatsapp_clicks (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255),
        product_name VARCHAR(255),
        url TEXT NOT NULL,
        city VARCHAR(100),
        source VARCHAR(255),
        button_location VARCHAR(255),
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        user_agent TEXT,
        phone_number VARCHAR(50),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    console.log("✅ Database table created/verified successfully")

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_city ON whatsapp_clicks(city)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_source ON whatsapp_clicks(source)`

    console.log("✅ Database indexes created successfully")

    // Check if table has data
    const count = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Current records in database: ${count[0]?.count || 0}`)

    return true
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    console.error("❌ Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : "No stack trace",
    })
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

    // Re-initialize client if needed
    if (!sql && !initializeNeonClient()) {
      console.log("❌ Failed to initialize Neon client")
    }

    if (sql) {
      try {
        console.log("🔄 Attempting to save to Neon database...")

        // Initialize database if needed
        const dbInitialized = await initializeDatabase()
        if (!dbInitialized) {
          throw new Error("Failed to initialize database")
        }

        // Insert the event into the database with explicit values
        console.log("🔄 Inserting record into database...")
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
            ${event.timestamp}::timestamptz, 
            ${event.userAgent}, 
            ${event.phoneNumber}
          )
          RETURNING id, timestamp, created_at
        `

        console.log("✅ Successfully saved to Neon database:", result[0])

        // Verify the insert by counting records
        const verifyCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Total records after insert: ${verifyCount[0]?.count || 0}`)

        // Also fetch the last inserted record to verify
        const lastRecord = await sql`
          SELECT * FROM whatsapp_clicks 
          WHERE id = ${result[0]?.id}
        `
        console.log("🔍 Inserted record verification:", lastRecord[0])

        return NextResponse.json({
          success: true,
          id: result[0]?.id,
          timestamp: result[0]?.timestamp,
          message: "Data saved to Neon database successfully",
          totalRecords: verifyCount[0]?.count || 0,
          insertedRecord: lastRecord[0],
        })
      } catch (dbError) {
        console.error("❌ Database error:", dbError)
        console.error("❌ Database error details:", {
          name: dbError instanceof Error ? dbError.name : "Unknown",
          message: dbError instanceof Error ? dbError.message : "Unknown error",
          stack: dbError instanceof Error ? dbError.stack : "No stack trace",
        })

        // Fallback to in-memory storage
        inMemoryStore.push(event)
        console.log("💾 Saved to in-memory storage as fallback")
        console.log(`💾 In-memory store now has ${inMemoryStore.length} records`)

        return NextResponse.json({
          success: true,
          fallback: true,
          message: "Data saved to memory (database error)",
          error: dbError instanceof Error ? dbError.message : "Unknown database error",
          totalRecords: inMemoryStore.length,
        })
      }
    } else {
      // No database available, use in-memory storage
      inMemoryStore.push(event)
      console.log("💾 Saved to in-memory storage (no database)")
      console.log(`💾 In-memory store now has ${inMemoryStore.length} records`)

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data saved to memory (no database configured)",
        totalRecords: inMemoryStore.length,
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
    // Re-initialize client if needed
    if (!sql && !initializeNeonClient()) {
      console.log("❌ Failed to initialize Neon client for GET")
    }

    if (sql) {
      try {
        console.log("🔄 Attempting to fetch data from Neon database...")

        // Test connection first
        const connectionTest = await sql`SELECT NOW() as current_time, version() as db_version`
        console.log("✅ Database connection test for GET:", connectionTest[0])

        // Initialize database if needed
        const dbInitialized = await initializeDatabase()
        if (!dbInitialized) {
          throw new Error("Failed to initialize database for GET")
        }

        // Check if the table exists and has data
        const tableCheck = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Total records in database: ${tableCheck[0]?.count || 0}`)

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

        console.log(`📋 Raw database results (${results.length} records)`)
        if (results.length > 0) {
          console.log("📋 Sample record:", results[0])
        }

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

        console.log(`✅ Successfully mapped ${mappedResults.length} records from database`)

        return NextResponse.json({
          whatsappClicks: mappedResults,
          source: "neon_database",
          totalRecords: mappedResults.length,
          databaseConnected: true,
          message: "Data retrieved from Neon database successfully",
        })
      } catch (dbError) {
        console.error("❌ Database error during GET:", dbError)
        console.error("❌ Database error details:", {
          name: dbError instanceof Error ? dbError.name : "Unknown",
          message: dbError instanceof Error ? dbError.message : "Unknown error",
        })

        // Fallback to in-memory storage
        console.log("💾 Falling back to in-memory storage")
        console.log(`💾 In-memory store has ${inMemoryStore.length} records`)

        return NextResponse.json({
          whatsappClicks: inMemoryStore,
          source: "memory_fallback",
          error: "Database unavailable",
          databaseConnected: false,
          totalRecords: inMemoryStore.length,
        })
      }
    } else {
      // No database available, use in-memory storage
      console.log("💾 Using in-memory storage (no database)")
      console.log(`💾 In-memory store has ${inMemoryStore.length} records`)

      return NextResponse.json({
        whatsappClicks: inMemoryStore,
        source: "memory_only",
        databaseConnected: false,
        totalRecords: inMemoryStore.length,
      })
    }
  } catch (error) {
    console.error("❌ Error in GET handler:", error)
    return NextResponse.json(
      {
        whatsappClicks: [],
        error: "Failed to retrieve data",
        details: error instanceof Error ? error.message : "Unknown error",
        databaseConnected: false,
        totalRecords: 0,
      },
      { status: 500 },
    )
  }
}
