import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { sql, ensureSchema } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  await ensureSchema()

  const [clicks, summary] = await Promise.all([
    sql`
      SELECT
        wc.id,
        wc.product_name,
        wc.product_id,
        wc.city,
        wc.source,
        wc.button_location,
        wc.timestamp,
        COALESCE(
          (SELECT p.price FROM products p WHERE p.id::text = wc.product_id),
          (SELECT p.price FROM products p WHERE p.name = wc.product_name),
          (SELECT c.fee FROM courses c WHERE c.title = wc.product_name),
          0
        )::int AS value
      FROM whatsapp_clicks wc
      ORDER BY wc.timestamp DESC
      LIMIT 2000
    `,
    sql`
      WITH cv AS (
        SELECT wc.city,
          COALESCE(
            (SELECT p.price FROM products p WHERE p.id::text = wc.product_id),
            (SELECT p.price FROM products p WHERE p.name = wc.product_name),
            (SELECT c.fee FROM courses c WHERE c.title = wc.product_name),
            0
          )::numeric AS value
        FROM whatsapp_clicks wc
      )
      SELECT
        COUNT(*)::int AS total,
        COALESCE(SUM(value),0)::bigint AS total_value,
        COUNT(*) FILTER (WHERE value > 0)::int AS valued
      FROM cv
    `,
  ])

  return NextResponse.json({ clicks, summary: summary[0] })
}
