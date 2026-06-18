import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Migration is no longer needed. Newsletter PDFs already live in Vercel Blob.",
  })
}
