import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

// Initialize Neon database client
let sql: any = null

try {
  if (process.env.DATABASE_URL) {
    sql = neon(process.env.DATABASE_URL)
  }
} catch (error) {
  console.warn("Neon database not available:", error)
}

export async function POST() {
  try {
    if (sql) {
      // Clear data from Neon database
      try {
        await sql`DELETE FROM whatsapp_clicks`
        console.log("Successfully cleared all WhatsApp clicks from Neon database")
        return NextResponse.json({ success: true, message: "All data cleared from database" })
      } catch (dbError) {
        console.error("Database error:", dbError)
        return NextResponse.json({ error: "Failed to clear database" }, { status: 500 })
      }
    } else {
      // If no database, just return success (in-memory data will be cleared on restart)
      console.log("No database available, in-memory data will be cleared on restart")
      return NextResponse.json({ success: true, message: "No persistent data to clear" })
    }
  } catch (error) {
    console.error("Error clearing analytics data:", error)
    return NextResponse.json({ error: "Failed to clear data" }, { status: 500 })
  }
}
