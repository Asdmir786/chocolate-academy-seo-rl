import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Initialize Neon database client
const sql = neon(process.env.DATABASE_URL!)

// Fallback in-memory storage
let inMemoryStore: any[] = []

export async function POST() {
  console.log("🗑️ POST /api/track/clear - Starting clear operation")

  try {
    // Check if DATABASE_URL exists
    if (!process.env.DATABASE_URL) {
      console.log("💾 Clearing memory storage (no DATABASE_URL)")
      const clearedCount = inMemoryStore.length
      inMemoryStore = []

      return NextResponse.json({
        success: true,
        message: "Memory storage cleared (no DATABASE_URL configured)",
        recordsCleared: clearedCount,
        source: "memory_only",
      })
    }

    try {
      console.log("🔄 Attempting to clear data from Neon database...")

      // Test connection first
      const connectionTest = await sql`SELECT NOW() as current_time`
      console.log("✅ Database connection test successful:", connectionTest[0])

      // Get count before clearing
      const beforeCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
      console.log(`📊 Records before clearing: ${beforeCount[0]?.count || 0}`)

      // Clear all records from the table
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
        message: "All data cleared from Neon database successfully",
        recordsCleared: beforeCount[0]?.count || 0,
        source: "neon_database",
      })
    } catch (dbError) {
      console.error("❌ Database clear operation failed:", dbError)

      // Fallback to clearing memory storage
      const clearedCount = inMemoryStore.length
      inMemoryStore = []
      console.log("💾 Cleared memory storage as fallback")

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Memory storage cleared (database error)",
        recordsCleared: clearedCount,
        error: dbError instanceof Error ? dbError.message : "Unknown database error",
        source: "memory_fallback",
      })
    }
  } catch (error) {
    console.error("❌ Clear operation failed:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to clear data",
    availableEndpoints: {
      POST: "/api/track/clear - Clear all WhatsApp click data",
      GET: "/api/track-whatsapp - Get all WhatsApp click data",
    },
  })
}
