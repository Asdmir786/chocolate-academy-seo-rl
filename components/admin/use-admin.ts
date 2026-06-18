"use client"

export const fetcher = (url: string) => fetch(url).then((r) => r.json())

export async function apiSend(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || data.success === false) {
    throw new Error(data.error || "Request failed")
  }
  return data
}

export const BRAND = "#2c1a10"
export const ACCENT = "#d97706" // amber-600
export const CHART_COLORS = ["#d97706", "#2c1a10", "#b45309", "#92400e", "#f59e0b", "#78350f", "#fbbf24", "#451a03"]
