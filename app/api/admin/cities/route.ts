import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getCities, createCity } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const cities = await getCities(false)
  return NextResponse.json({ cities })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const city = await createCity(body)
    return NextResponse.json({ success: true, city })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create city" },
      { status: 500 },
    )
  }
}
