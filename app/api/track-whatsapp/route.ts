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

// Initialize Neon database client with connection string
const sql = neon(process.env.DATABASE_URL!)

// Fallback in-memory storage
const inMemoryStore: WhatsAppClickEvent[] = []

// Test database connection
async function testDatabaseConnection() {
  try {
    console.log("🔄 Testing database connection...")
    const result = await sql`SELECT NOW() as current_time, version() as db_version`
    console.log("✅ Database connection successful:", result[0])
    return true
  } catch (error) {
    console.error("❌ Database connection failed:", error)
    return false
  }
}

// Initialize database table
async function initializeDatabase() {
  try {
    console.log("🔄 Initializing database table...")

    // Create table if it doesn't exist
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

    console.log("✅ Table created/verified successfully")

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name)`

    console.log("✅ Indexes created successfully")

    // Check current record count
    const count = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Current records in database: ${count[0]?.count || 0}`)

    return true
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    return false
  }
}

export async function POST(request: Request) {
  console.log("📥 POST /api/track-whatsapp - Starting request processing")

  try {
    // Parse request body
    const body = await request.json()
    console.log("📋 Received request body:", JSON.stringify(body, null, 2))

    // Validate required fields
    if (!body.url) {
      console.error("❌ Missing required field: url")
      return NextResponse.json({ error: "Missing required field: url" }, { status: 400 })
    }

    // Create event object
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

    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      console.error("❌ DATABASE_URL environment variable not found")

      // Fallback to memory storage
      inMemoryStore.push(event)
      console.log("💾 Saved to memory storage (no DATABASE_URL)")

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data saved to memory (DATABASE_URL not configured)",
        totalRecords: inMemoryStore.length,
      })
    }

    try {
      console.log("🔄 Attempting to save to Neon database...")

      // Test connection first
      const connectionOk = await testDatabaseConnection()
      if (!connectionOk) {
        throw new Error("Database connection test failed")
      }

      // Initialize database
      const dbInitialized = await initializeDatabase()
      if (!dbInitialized) {
        throw new Error("Database initialization failed")
      }

      // Insert the record
      console.log("🔄 Inserting record into whatsapp_clicks table...")
      const insertResult = await sql`
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

      console.log("✅ Successfully inserted record:", insertResult[0])

      // Verify the insert
      const verifyCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
      console.log(`📊 Total records after insert: ${verifyCount[0]?.count || 0}`)

      // Get the inserted record to verify
      const insertedRecord = await sql`
        SELECT * FROM whatsapp_clicks 
        WHERE id = ${insertResult[0]?.id}
      `
      console.log("🔍 Inserted record verification:", insertedRecord[0])

      return NextResponse.json({
        success: true,
        id: insertResult[0]?.id,
        timestamp: insertResult[0]?.timestamp,
        message: "Data successfully saved to Neon database",
        totalRecords: verifyCount[0]?.count || 0,
        insertedRecord: insertedRecord[0],
        databaseConnected: true,
      })
    } catch (dbError) {
      console.error("❌ Database operation failed:", dbError)
      console.error("❌ Error details:", {
        name: dbError instanceof Error ? dbError.name : "Unknown",
        message: dbError instanceof Error ? dbError.message : "Unknown error",
        stack: dbError instanceof Error ? dbError.stack : "No stack trace",
      })

      // Fallback to memory storage
      inMemoryStore.push(event)
      console.log("💾 Saved to memory storage as fallback")
      console.log(`💾 Memory store now has ${inMemoryStore.length} records`)

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data saved to memory (database error)",
        error: dbError instanceof Error ? dbError.message : "Unknown database error",
        totalRecords: inMemoryStore.length,
        databaseConnected: false,
      })
    }
  } catch (error) {
    console.error("❌ Request processing failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process tracking request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("📤 GET /api/track-whatsapp - Starting data retrieval")

  try {
    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      console.log("💾 Using memory storage (no DATABASE_URL)")
      return NextResponse.json({
        whatsappClicks: inMemoryStore,
        source: "memory_only",
        totalRecords: inMemoryStore.length,
        databaseConnected: false,
      })
    }

    try {
      console.log("🔄 Fetching data from Neon database...")

      // Test connection
      const connectionOk = await testDatabaseConnection()
      if (!connectionOk) {
        throw new Error("Database connection test failed")
      }

      // Initialize database if needed
      const dbInitialized = await initializeDatabase()
      if (!dbInitialized) {
        throw new Error("Database initialization failed")
      }

      // Fetch all records
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

      console.log(`📋 Retrieved ${results.length} records from database`)
      if (results.length > 0) {
        console.log("📋 Sample record:", results[0])
      }

      // Map database results to expected format
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

      console.log(`✅ Successfully mapped ${mappedResults.length} records`)

      return NextResponse.json({
        whatsappClicks: mappedResults,
        source: "neon_database",
        totalRecords: mappedResults.length,
        databaseConnected: true,
        message: "Data retrieved from Neon database successfully",
      })
    } catch (dbError) {
      console.error("❌ Database retrieval failed:", dbError)

      // Fallback to memory storage
      console.log("💾 Falling back to memory storage")
      return NextResponse.json({
        whatsappClicks: inMemoryStore,
        source: "memory_fallback",
        error: "Database unavailable",
        totalRecords: inMemoryStore.length,
        databaseConnected: false,
      })
    }
  } catch (error) {
    console.error("❌ GET request failed:", error)
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
