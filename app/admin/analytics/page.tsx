"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Database, Trash2, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type WhatsAppClickEvent = {
  productId?: string
  productName?: string
  url?: string
  city?: string
  source?: string
  buttonLocation?: string
  timestamp: string
  userAgent?: string
  phoneNumber?: string
}

type AnalyticsResponse = {
  whatsappClicks: WhatsAppClickEvent[]
  source: string
  totalRecords: number
  databaseConnected: boolean
  message?: string
  error?: string
  fallback?: boolean
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [clearing, setClearing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log("🔄 Fetching analytics data from Neon database...")

      const response = await fetch("/api/track-whatsapp")
      const result = await response.json()

      console.log("📊 Analytics API response:", result)
      setData(result)

      if (!response.ok) {
        setError(result.error || "Failed to fetch analytics data")
      }
    } catch (err) {
      console.error("❌ Error fetching analytics:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  const clearData = async () => {
    if (
      !confirm(
        "Are you sure you want to clear all WhatsApp click data from the Neon database? This action cannot be undone.",
      )
    ) {
      return
    }

    try {
      setClearing(true)
      console.log("🗑️ Clearing all data from Neon database...")

      const response = await fetch("/api/track/clear", {
        method: "POST",
      })

      const result = await response.json()
      console.log("🗑️ Clear operation result:", result)

      if (response.ok && result.success) {
        alert(`Successfully cleared ${result.recordsCleared} records from Neon database`)
        await fetchAnalytics() // Refresh data
      } else {
        alert(`Failed to clear data: ${result.error || "Unknown error"}`)
      }
    } catch (err) {
      console.error("❌ Error clearing data:", err)
      alert(`Error clearing data: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setClearing(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const getStatusBadge = () => {
    if (!data) return <Badge variant="secondary">Loading...</Badge>

    if (data.databaseConnected && !data.fallback) {
      return (
        <Badge variant="default" className="bg-green-500">
          <CheckCircle className="w-3 h-3 mr-1" />
          Connected to Neon
        </Badge>
      )
    } else {
      return (
        <Badge variant="destructive">
          <XCircle className="w-3 h-3 mr-1" />
          Database Error
        </Badge>
      )
    }
  }

  const getSourceBadge = (source: string) => {
    if (source === "neon_database") {
      return (
        <Badge variant="default" className="bg-blue-500">
          Neon Database
        </Badge>
      )
    } else {
      return <Badge variant="destructive">Database Error</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">WhatsApp Click Tracking - Neon Database Only</p>
        </div>
        <div className="flex items-center gap-2">{getStatusBadge()}</div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : data?.totalRecords || 0}</div>
            <p className="text-xs text-muted-foreground">{data?.source && getSourceBadge(data.source)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Status</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? "..." : data?.databaseConnected ? "Connected" : "Disconnected"}
            </div>
            <p className="text-xs text-muted-foreground">{data?.message || "Neon Database Connection"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={fetchAnalytics}
              disabled={loading}
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
            <Button
              onClick={clearData}
              disabled={clearing || loading || !data?.databaseConnected}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {clearing ? "Clearing..." : "Clear All Data"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Click Events</CardTitle>
          <CardDescription>Recent WhatsApp button clicks tracked in Neon database</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading data from Neon database...</div>
          ) : data?.whatsappClicks && data.whatsappClicks.length > 0 ? (
            <div className="space-y-4">
              {data.whatsappClicks.map((click, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{click.productName || "Unknown Product"}</div>
                    <div className="text-sm text-muted-foreground">{formatTimestamp(click.timestamp)}</div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="font-medium">City:</span> {click.city || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Source:</span> {click.source || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span> {click.buttonLocation || "N/A"}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {click.phoneNumber || "N/A"}
                    </div>
                  </div>

                  {click.url && (
                    <div className="text-sm">
                      <span className="font-medium">URL:</span>{" "}
                      <a
                        href={click.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate"
                      >
                        {click.url}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {data?.error ? (
                <div>
                  <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                  <p>Error loading data: {data.error}</p>
                </div>
              ) : (
                <div>
                  <Database className="h-8 w-8 mx-auto mb-2" />
                  <p>No WhatsApp clicks recorded yet</p>
                  <p className="text-sm">Click a WhatsApp button to see tracking data</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {data && (
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Data Source:</span> {data.source}
              </div>
              <div>
                <span className="font-medium">Database Connected:</span> {data.databaseConnected ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Total Records:</span> {data.totalRecords}
              </div>
              <div>
                <span className="font-medium">Fallback Mode:</span> {data.fallback ? "Yes" : "No"}
              </div>
            </div>
            {data.message && (
              <div className="mt-2 p-2 bg-muted rounded text-sm">
                <span className="font-medium">Message:</span> {data.message}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
