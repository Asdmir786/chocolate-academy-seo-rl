import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Initialize Neon database client
let sql: any = null

const initializeNeonClient = () => {
  try {
    if (process.env.DATABASE_URL) {
      sql = neon(process.env.DATABASE_URL)
      console.log("✅ Clear route: Neon database client initialized successfully")
      return true
    } else {
      console.error("❌ Clear route: DATABASE_URL not found in environment variables")
      return false
    }
  } catch (error) {
    console.error("❌ Clear route: Neon database initialization failed:", error)
    return false
  }
}

// Initialize on module load
initializeNeonClient()

// Fallback in-memory storage
let inMemoryStore: any[] = []

export async function POST() {
  console.log("🗑️ POST /api/track/clear received request")

  try {
    // Re-initialize client if needed
    if (!sql && !initializeNeonClient()) {
      console.log("❌ Failed to initialize Neon client for clear")
    }

    if (sql) {
      try {
        console.log("🔄 Attempting to clear data from Neon database...")

        // Test connection first
        const connectionTest = await sql`SELECT NOW() as current_time`
        console.log("✅ Database connection test for clear:", connectionTest[0])

        // Get count before clearing
        const beforeCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Records before clearing: ${beforeCount[0]?.count || 0}`)

        // Clear all records from the table
        const result = await sql`DELETE FROM whatsapp_clicks`
        console.log("✅ Successfully cleared Neon database:", result)

        // Verify the clear operation
        const afterCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Records after clearing: ${afterCount[0]?.count || 0}`)

        // Reset the sequence to start from 1 again
        await sql`ALTER SEQUENCE whatsapp_clicks_id_seq RESTART WITH 1`
        console.log("✅ Reset ID sequence")

        return NextResponse.json({
          success: true,
          message: "All data cleared from Neon database successfully",
          recordsCleared: beforeCount[0]?.count || 0,
          source: "neon_database",
        })
      } catch (dbError) {
        console.error("❌ Database error during clear:", dbError)

        // Fallback to clearing in-memory storage
        const clearedCount = inMemoryStore.length
        inMemoryStore = []
        console.log("💾 Cleared in-memory storage as fallback")

        return NextResponse.json({
          success: true,
          fallback: true,
          message: "Data cleared from memory (database error)",
          recordsCleared: clearedCount,
          error: dbError instanceof Error ? dbError.message : "Unknown database error",
          source: "memory_fallback",
        })
      }
    } else {
      // No database available, clear in-memory storage
      const clearedCount = inMemoryStore.length
      inMemoryStore = []
      console.log("💾 Cleared in-memory storage (no database)")

      return NextResponse.json({
        success: true,
        fallback: true,
        message: "Data cleared from memory (no database configured)",
        recordsCleared: clearedCount,
        source: "memory_only",
      })
    }
  } catch (error) {
    console.error("❌ Error in clear handler:", error)
    return NextResponse.json(
      {
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
