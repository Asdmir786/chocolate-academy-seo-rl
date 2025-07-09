import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Initialize Neon database client
let sql: any = null

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
    console.log("✅ Neon database client initialized for clear route")
  } else {
    console.error("❌ DATABASE_URL not found in environment variables")
  }
} catch (error) {
  console.error("❌ Neon database initialization failed:", error)
}

export async function POST() {
  console.log("🗑️ POST /api/track/clear received request")

  try {
    if (sql) {
      try {
        console.log("🔄 Attempting to clear Neon database...")

        // Get count before clearing
        const beforeCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Records before clearing: ${beforeCount[0]?.count || 0}`)

        // Clear all records from the database
        const result = await sql`DELETE FROM whatsapp_clicks`

        // Get count after clearing
        const afterCount = await sql`SELECT COUNT(*) as count FROM whatsapp_clicks`
        console.log(`📊 Records after clearing: ${afterCount[0]?.count || 0}`)

        console.log("✅ Successfully cleared Neon database")

        return NextResponse.json({
          success: true,
          message: "All WhatsApp click data cleared from database",
          recordsCleared: beforeCount[0]?.count || 0,
          source: "neon_database",
        })
      } catch (dbError) {
        console.error("❌ Database error during clear:", dbError)
        return NextResponse.json(
          {
            error: "Failed to clear database",
            details: dbError instanceof Error ? dbError.message : "Unknown database error",
          },
          { status: 500 },
        )
      }
    } else {
      console.log("⚠️ No database available to clear")
      return NextResponse.json(
        {
          error: "No database configured",
          message: "DATABASE_URL not available",
        },
        { status: 400 },
      )
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
