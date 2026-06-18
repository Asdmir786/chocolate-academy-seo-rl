import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guard"
import { getCourses, createCourse } from "@/lib/cms"

export async function GET() {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  const courses = await getCourses(false)
  return NextResponse.json({ courses })
}

export async function POST(request: Request) {
  const auth = await requireAdmin()
  if (auth instanceof NextResponse) return auth
  try {
    const body = await request.json()
    const course = await createCourse(body)
    return NextResponse.json({ success: true, course })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to create course" },
      { status: 500 },
    )
  }
}
