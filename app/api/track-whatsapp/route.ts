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

// Validate DATABASE_URL exists - REQUIRED
function validateDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not configured")
    console.error("❌ Please set DATABASE_URL in your environment variables")
    throw new Error("DATABASE_URL environment variable is required for Neon database connection")
  }
  console.log("✅ DATABASE_URL found in environment variables")
  return process.env.DATABASE_URL
}

// Initialize Neon database client
const getDatabaseClient = () => {
  const databaseUrl = validateDatabaseUrl()
  return neon(databaseUrl)
}

// Test database connection
async function testDatabaseConnection() {
  try {
    console.log("🔄 Testing Neon database connection...")
    const sql = getDatabaseClient()
    const result = await sql`SELECT NOW() as current_time, version() as db_version`
    console.log("✅ Neon database connection successful:", result[0])
    return true
  } catch (error) {
    console.error("❌ Neon database connection failed:", error)
    throw new Error(`Neon database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Initialize database table
async function initializeDatabase() {
  try {
    console.log("🔄 Initializing whatsapp_clicks table in Neon database...")
    const sql = getDatabaseClient()

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

    console.log("✅ Table whatsapp_clicks created/verified in Neon database")

    // Create indexes for better performance
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_timestamp ON whatsapp_clicks(timestamp)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_product_name ON whatsapp_clicks(product_name)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_city ON whatsapp_clicks(city)`
    await sql`CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_source ON whatsapp_clicks(source)`

    console.log("✅ Database indexes created in Neon database")

    // Check current record count
    const count = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Current records in Neon whatsapp_clicks table: ${count[0]?.count || 0}`)

    return true
  } catch (error) {
    console.error("❌ Neon database initialization failed:", error)
    throw new Error(`Neon database initialization failed: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function POST(request: Request) {
  console.log("📥 POST /api/track-whatsapp - Processing WhatsApp click tracking (NEON DATABASE ONLY)")

  try {
    // Validate DATABASE_URL first
    validateDatabaseUrl()

    // Parse request body
    const body = await request.json()
    console.log("📋 Received tracking data:", JSON.stringify(body, null, 2))

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

    console.log("📝 Prepared event for Neon database:", JSON.stringify(event, null, 2))

    // Test database connection
    await testDatabaseConnection()

    // Initialize database if needed
    await initializeDatabase()

    // Get database client
    const sql = getDatabaseClient()

    // Insert the record into Neon database
    console.log("🔄 Inserting record into Neon whatsapp_clicks table...")
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

    console.log("✅ Successfully inserted record into Neon database:", insertResult[0])

    // Verify the insert by counting total records
    const verifyCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Total records in Neon database after insert: ${verifyCount[0]?.count || 0}`)

    // Get the inserted record to verify data integrity
    const insertedRecord = await sql`
      SELECT * FROM whatsapp_clicks 
      WHERE id = ${insertResult[0]?.id}
    `
    console.log("🔍 Inserted record verification from Neon:", insertedRecord[0])

    return NextResponse.json({
      success: true,
      id: insertResult[0]?.id,
      timestamp: insertResult[0]?.timestamp,
      message: "WhatsApp click successfully saved to Neon database",
      totalRecords: verifyCount[0]?.count || 0,
      insertedRecord: insertedRecord[0],
      databaseConnected: true,
      source: "neon_database",
      fallback: false, // NO FALLBACK - NEON ONLY
    })
  } catch (error) {
    console.error("❌ Failed to save WhatsApp click to Neon database:", error)

    // Return error - NO FALLBACK TO MEMORY
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save to Neon database",
        details: error instanceof Error ? error.message : "Unknown database error",
        databaseConnected: false,
        source: "neon_database_error",
        fallback: false, // NO FALLBACK
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  console.log("📤 GET /api/track-whatsapp - Retrieving WhatsApp click data from Neon database ONLY")

  try {
    // Validate DATABASE_URL first
    validateDatabaseUrl()

    // Test database connection
    await testDatabaseConnection()

    // Initialize database if needed
    await initializeDatabase()

    // Get database client
    const sql = getDatabaseClient()

    // Fetch all records from Neon database
    console.log("🔄 Fetching records from Neon whatsapp_clicks table...")
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

    console.log(`📋 Retrieved ${results.length} records from Neon database`)
    if (results.length > 0) {
      console.log("📋 Sample record from Neon:", results[0])
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

    console.log(`✅ Successfully mapped ${mappedResults.length} records from Neon database`)

    return NextResponse.json({
      whatsappClicks: mappedResults,
      source: "neon_database",
      totalRecords: mappedResults.length,
      databaseConnected: true,
      message: "Data successfully retrieved from Neon database",
      fallback: false, // NO FALLBACK - NEON ONLY
    })
  } catch (error) {
    console.error("❌ Failed to retrieve data from Neon database:", error)

    // Return error - NO FALLBACK TO MEMORY
    return NextResponse.json(
      {
        whatsappClicks: [],
        error: "Failed to retrieve data from Neon database",
        details: error instanceof Error ? error.message : "Unknown database error",
        databaseConnected: false,
        totalRecords: 0,
        source: "neon_database_error",
        fallback: false, // NO FALLBACK
      },
      { status: 500 },
    )
  }
}
