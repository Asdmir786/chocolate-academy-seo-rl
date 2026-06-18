import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getProducts, createProduct } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const products = await getProducts(false)
  return NextResponse.json({ products })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const product = await createProduct(body)
    return NextResponse.json({ success: true, product })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 },
    )
  }
}
