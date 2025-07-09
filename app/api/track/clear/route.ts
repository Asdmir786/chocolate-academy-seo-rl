import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Validate DATABASE_URL exists - REQUIRED
function validateDatabaseUrl() {
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not configured")
    throw new Error("DATABASE_URL environment variable is required for Neon database connection")
  }
  console.log("✅ DATABASE_URL found for clear operation")
  return process.env.DATABASE_URL
}

// Initialize Neon database client
const getDatabaseClient = () => {
  const databaseUrl = validateDatabaseUrl()
  return neon(databaseUrl)
}

export async function POST() {
  console.log("🗑️ POST /api/track/clear - Clearing WhatsApp click data from Neon database ONLY")

  try {
    // Validate DATABASE_URL first
    validateDatabaseUrl()

    // Get database client
    const sql = getDatabaseClient()

    // Test connection
    console.log("🔄 Testing Neon database connection for clear operation...")
    await sql`SELECT NOW() as current_time`
    console.log("✅ Neon database connection successful for clear operation")

    // Get count before clearing
    const beforeCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Records before clearing: ${beforeCount[0]?.count || 0}`)

    // Clear all records from Neon database
    console.log("🗑️ Clearing all records from Neon whatsapp_clicks table...")
    const deleteResult = await sql`DELETE FROM whatsapp_clicks`
    console.log("✅ All records cleared from Neon database")

    // Verify clearing
    const afterCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Records after clearing: ${afterCount[0]?.count || 0}`)

    // Reset the sequence
    await sql`ALTER SEQUENCE whatsapp_clicks_id_seq RESTART WITH 1`
    console.log("✅ Database sequence reset")

    return NextResponse.json({
      success: true,
      message: "All WhatsApp click data cleared from Neon database",
      recordsCleared: beforeCount[0]?.count || 0,
      remainingRecords: afterCount[0]?.count || 0,
      databaseConnected: true,
      source: "neon_database",
      fallback: false, // NO FALLBACK - NEON ONLY
    })
  } catch (error) {
    console.error("❌ Failed to clear data from Neon database:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear data from Neon database",
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
  return NextResponse.json({
    message: "Use POST method to clear all WhatsApp click data",
    availableEndpoints: {
      POST: "/api/track/clear - Clear all WhatsApp click data from Neon database",
      GET: "/api/track-whatsapp - Get all WhatsApp click data from Neon database",
    },
    databaseRequired: true,
  })
}
