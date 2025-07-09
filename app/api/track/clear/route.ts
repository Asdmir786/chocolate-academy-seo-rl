import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Initialize Neon database client - REQUIRED
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required")
}

const sql = neon(process.env.DATABASE_URL)

export async function POST() {
  console.log("🗑️ POST /api/track/clear - Clearing all WhatsApp click data from Neon database")

  try {
    // Test database connection
    console.log("🔄 Testing database connection...")
    const connectionTest = await sql`SELECT NOW() as current_time`
    console.log("✅ Database connection successful:", connectionTest[0])

    // Get count before clearing
    const beforeCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Records before clearing: ${beforeCount[0]?.count || 0}`)

    // Clear all records from the whatsapp_clicks table
    console.log("🔄 Deleting all records from whatsapp_clicks table...")
    const deleteResult = await sql`DELETE FROM whatsapp_clicks`
    console.log("✅ Delete operation completed:", deleteResult)

    // Verify the clear operation
    const afterCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
    console.log(`📊 Records after clearing: ${afterCount[0]?.count || 0}`)

    // Reset the sequence to start from 1 again
    await sql`ALTER SEQUENCE whatsapp_clicks_id_seq RESTART WITH 1`
    console.log("✅ ID sequence reset to 1")

    return NextResponse.json({
      success: true,
      message: "All WhatsApp click data cleared from Neon database successfully",
      recordsCleared: beforeCount[0]?.count || 0,
      source: "neon_database",
      databaseConnected: true,
    })
  } catch (error) {
    console.error("❌ Failed to clear data from Neon database:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear data from database",
        details: error instanceof Error ? error.message : "Unknown database error",
        databaseConnected: false,
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
