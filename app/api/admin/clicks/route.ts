import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { sql, ensureSchema } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  await ensureSchema()
  const clicks = await sql`
    SELECT id, product_name, city, timestamp
    FROM whatsapp_clicks
    ORDER BY timestamp DESC
    LIMIT 1000
  `
  return NextResponse.json({ clicks })
}
