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

// Initialize Upstash Redis client only if environment variables are available
let redis: any = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { Redis } = require("@upstash/redis")
    redis = new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  }
} catch (error) {
  console.warn("Upstash Redis not available:", error)
}

export async function POST() {
  try {
    console.log("POST /api/track/clear received request.")

    let clearedFromDatabase = false
    let clearedFromRedis = false

    // Clear from Neon database first
    if (sql) {
      try {
        const result = await sql`
          DELETE FROM whatsapp_clicks
        `
        console.log("Successfully cleared WhatsApp clicks from Neon database")
        clearedFromDatabase = true
      } catch (dbError) {
        console.error("Error clearing data from database:", dbError)
      }
    }

    // Clear from Redis as backup
    if (redis) {
      try {
        await redis.del("whatsappClicks")
        console.log("Successfully cleared WhatsApp clicks from Redis")
        clearedFromRedis = true
      } catch (redisError) {
        console.error("Error clearing data from Redis:", redisError)
      }
    }

    if (clearedFromDatabase || clearedFromRedis) {
      return NextResponse.json({
        success: true,
        message: "Analytics data cleared successfully",
        clearedFromDatabase,
        clearedFromRedis,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "No storage systems available to clear data from",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error clearing analytics data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clear analytics data",
      },
      { status: 500 },
    )
  }
}
