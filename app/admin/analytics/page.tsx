"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, LogOut, Trash2, Database, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Header from "@/components/header"
import Footer from "@/components/footer"
import type { WhatsAppClickEvent } from "@/lib/analytics"

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<WhatsAppClickEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClearing, setIsClearing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [dataSource, setDataSource] = useState<string>("unknown")
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [databaseConnected, setDatabaseConnected] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"

    // Check if authentication has expired
    const expiresAt = localStorage.getItem("adminAuthExpires")
    const isExpired = expiresAt ? new Date().getTime() > Number.parseInt(expiresAt) : true

    if (!isAuthenticated || isExpired) {
      // Clear expired authentication
      if (isExpired) {
        localStorage.removeItem("adminAuthenticated")
        localStorage.removeItem("adminAuthExpires")
      }

      // Redirect to login page
      router.push("/admin/login")
    } else {
      // Fetch data if authenticated
      fetchAnalyticsData()
    }
  }, [router])

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("adminAuthenticated")
    localStorage.removeItem("adminAuthExpires")

    // Redirect to login page
    router.push("/admin/login")
  }

  const fetchAnalyticsData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime()
      console.log("🔄 Fetching analytics data from API...")

      const response = await fetch(`/api/track-whatsapp?t=${timestamp}`)
      console.log("📡 API Response status:", response.status)
      console.log("📡 API Response headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ API Error Response:", errorText)
        throw new Error(`API responded with status: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log("📋 Raw API response data:", data)
      console.log("📊 Data source:", data.source)
      console.log("📊 Total records:", data.totalRecords)
      console.log("📊 Database connected:", data.databaseConnected)
      console.log("🔍 Type of whatsappClicks:", typeof data.whatsappClicks)
      console.log("🔍 Is whatsappClicks an array?", Array.isArray(data.whatsappClicks))

      // Store the full API response for debugging
      setApiResponse(data)
      setDataSource(data.source || "unknown")
      setDatabaseConnected(data.databaseConnected || false)

      if (!data || !Array.isArray(data.whatsappClicks)) {
        console.warn("⚠️ Unexpected data format:", data)
        setAnalyticsData([])
        setError("Received invalid data format from API")
      } else {
        console.log(`✅ Setting analytics data with ${data.whatsappClicks.length} records`)
        setAnalyticsData(data.whatsappClicks || [])
        setLastUpdated(new Date())
      }
    } catch (err) {
      console.error("❌ Error fetching analytics data:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setAnalyticsData([])
      setDatabaseConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const clearAnalyticsData = async () => {
    setIsClearing(true)
    try {
      console.log("🗑️ Attempting to clear analytics data...")

      const response = await fetch("/api/track/clear", {
        method: "POST",
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Clear API Error:", errorText)
        throw new Error(`API responded with status: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log("✅ Clear data result:", result)

      // Refresh the data
      await fetchAnalyticsData()
      setDialogOpen(false)
    } catch (err) {
      console.error("❌ Error clearing analytics data:", err)
      setError(err instanceof Error ? err.message : "Failed to clear data")
    } finally {
      setIsClearing(false)
    }
  }

  // Filter data based on search term
  const filteredData = analyticsData.filter((event) => {
    if (!filter) return true

    const searchTerm = filter.toLowerCase()
    return (
      event.productName?.toLowerCase().includes(searchTerm) ||
      event.source?.toLowerCase().includes(searchTerm) ||
      event.city?.toLowerCase().includes(searchTerm) ||
      event.buttonLocation?.toLowerCase().includes(searchTerm) ||
      event.url?.toLowerCase().includes(searchTerm)
    )
  })

  // Filter by date range if provided
  const dateFilteredData = filteredData.filter((event) => {
    if (!dateRange.start && !dateRange.end) return true

    try {
      const eventDate = new Date(event.timestamp)
      const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0)
      const endDate = dateRange.end ? new Date(dateRange.end) : new Date()

      // Add one day to end date to include the entire day
      if (dateRange.end) {
        endDate.setDate(endDate.getDate() + 1)
      }

      return eventDate >= startDate && eventDate <= endDate
    } catch (err) {
      console.error("Date filtering error:", err)
      return true
    }
  })

  // Group data by product
  const productData = dateFilteredData.reduce((acc: Record<string, number>, event) => {
    const productName = event.productName || "Unknown Product"
    acc[productName] = (acc[productName] || 0) + 1
    return acc
  }, {})

  const productChartData = Object.entries(productData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)

  // Group data by city
  const cityData = dateFilteredData.reduce((acc: Record<string, number>, event) => {
    const city = event.city || "Unknown City"
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})

  const cityChartData = Object.entries(cityData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Group data by source
  const sourceData = dateFilteredData.reduce((acc: Record<string, number>, event) => {
    const source = event.source || "Unknown Source"
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {})

  const sourceChartData = Object.entries(sourceData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)
    } catch (err) {
      console.error("Date formatting error:", err)
      return "Invalid date"
    }
  }

  // Get database status
  const getDatabaseStatus = () => {
    if (databaseConnected && dataSource === "neon_database") {
      return { status: "Connected", color: "text-green-600", icon: CheckCircle }
    } else if (dataSource === "memory_fallback") {
      return { status: "Memory Fallback", color: "text-yellow-600", icon: AlertCircle }
    } else if (dataSource === "memory_only") {
      return { status: "Memory Only", color: "text-yellow-600", icon: AlertCircle }
    } else {
      return { status: "Disconnected", color: "text-red-600", icon: XCircle }
    }
  }

  const dbStatus = getDatabaseStatus()
  const StatusIcon = dbStatus.icon

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-[#3c2415] mb-2 flex items-center gap-2">
                <Database className="h-8 w-8" />
                WhatsApp Click Analytics
              </h1>
              <p className="text-gray-600">
                Track and analyze WhatsApp button clicks stored in Neon database to understand customer engagement.
              </p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">Last updated: {formatDate(lastUpdated.toISOString())}</p>
              )}
              <p className="text-sm text-gray-500">
                Data source: <span className="font-medium">{dataSource}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={fetchAnalyticsData}>
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear All Data
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Clear Analytics Data</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to clear all WhatsApp click analytics data from the database? This action
                      cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={clearAnalyticsData} disabled={isClearing}>
                      {isClearing ? "Clearing..." : "Clear All Data"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={fetchAnalyticsData}>
                    Try Again
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Debug Information */}
          {apiResponse && (
            <Alert className="mb-6">
              <Database className="h-4 w-4" />
              <AlertTitle>Debug Information</AlertTitle>
              <AlertDescription>
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Data Source:</strong> {apiResponse.source}
                  </p>
                  <p>
                    <strong>Database Connected:</strong> {databaseConnected ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Total Records:</strong>{" "}
                    {apiResponse.totalRecords || apiResponse.whatsappClicks?.length || 0}
                  </p>
                  {apiResponse.error && (
                    <p>
                      <strong>Error:</strong> {apiResponse.error}
                    </p>
                  )}
                  {apiResponse.message && (
                    <p>
                      <strong>Message:</strong> {apiResponse.message}
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="mb-8 flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <Label htmlFor="search" className="text-[#3c2415]">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search by product, source, city, URL..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label htmlFor="startDate" className="text-[#3c2415]">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1"
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label htmlFor="endDate" className="text-[#3c2415]">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1"
              />
            </div>
            <Button onClick={fetchAnalyticsData} className="bg-[#3c2415] hover:bg-[#5a3a28] mt-1">
              Apply Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c2415]">Total Clicks</CardTitle>
                <CardDescription>Total WhatsApp button clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-[#3c2415]">{dateFilteredData.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c2415]">Top Product</CardTitle>
                <CardDescription>Most clicked product</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-[#3c2415]">
                  {productChartData.length > 0 ? productChartData[0].name : "No data"}
                </div>
                <div className="text-sm text-gray-500">
                  {productChartData.length > 0 ? `${productChartData[0].value} clicks` : ""}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c2415]">Top City</CardTitle>
                <CardDescription>Most active city</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-[#3c2415] capitalize">
                  {cityChartData.length > 0 ? cityChartData[0].name : "No data"}
                </div>
                <div className="text-sm text-gray-500">
                  {cityChartData.length > 0 ? `${cityChartData[0].value} clicks` : ""}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-[#3c2415]">Database Status</CardTitle>
                <CardDescription>Connection status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${dbStatus.color} flex items-center gap-2`}>
                  <StatusIcon className="h-5 w-5" />
                  {dbStatus.status}
                </div>
                <div className="text-sm text-gray-500">Neon Database</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-[#3c2415]/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white">
                All Data
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white">
                By Product
              </TabsTrigger>
              <TabsTrigger value="cities" className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white">
                By City
              </TabsTrigger>
              <TabsTrigger value="sources" className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white">
                By Source
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3c2415]">All WhatsApp Clicks</CardTitle>
                  <CardDescription>Detailed list of all WhatsApp button clicks stored in the database</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415]"></div>
                    </div>
                  ) : dateFilteredData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No data available in database</p>
                      <p className="text-sm mt-2">
                        WhatsApp clicks will appear here once users interact with your site
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>City</TableHead>
                            <TableHead>URL</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {dateFilteredData.map((event, index) => (
                            <TableRow key={index}>
                              <TableCell>{formatDate(event.timestamp)}</TableCell>
                              <TableCell>{event.productName || "N/A"}</TableCell>
                              <TableCell>{event.source || "N/A"}</TableCell>
                              <TableCell>{event.buttonLocation || "N/A"}</TableCell>
                              <TableCell className="capitalize">{event.city || "N/A"}</TableCell>
                              <TableCell className="max-w-xs truncate" title={event.url}>
                                {event.url || "N/A"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3c2415]">Clicks by Product</CardTitle>
                  <CardDescription>Analysis of WhatsApp clicks by product from database</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415]"></div>
                    </div>
                  ) : productChartData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No product data available</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Click Count</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {productChartData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.value}</TableCell>
                              <TableCell>{((item.value / dateFilteredData.length) * 100).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3c2415]">Clicks by City</CardTitle>
                  <CardDescription>Analysis of WhatsApp clicks by city from database</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415]"></div>
                    </div>
                  ) : cityChartData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No city data available</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>City</TableHead>
                            <TableHead>Click Count</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {cityChartData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="capitalize">{item.name}</TableCell>
                              <TableCell>{item.value}</TableCell>
                              <TableCell>{((item.value / dateFilteredData.length) * 100).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#3c2415]">Clicks by Source</CardTitle>
                  <CardDescription>Analysis of WhatsApp clicks by page source from database</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415]"></div>
                    </div>
                  ) : sourceChartData.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No source data available</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Source</TableHead>
                            <TableHead>Click Count</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sourceChartData.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.value}</TableCell>
                              <TableCell>{((item.value / dateFilteredData.length) * 100).toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={fetchAnalyticsData} className="bg-[#3c2415] hover:bg-[#5a3a28]">
              Refresh Data
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                // Create CSV content
                const headers = ["Date", "Product", "Source", "Location", "City", "URL", "User Agent"]
                const csvContent = [
                  headers.join(","),
                  ...dateFilteredData.map((event) =>
                    [
                      formatDate(event.timestamp),
                      `"${event.productName || "N/A"}"`,
                      `"${event.source || "N/A"}"`,
                      `"${event.buttonLocation || "N/A"}"`,
                      `"${event.city || "N/A"}"`,
                      `"${event.url || "N/A"}"`,
                      `"${event.userAgent || "N/A"}"`,
                    ].join(","),
                  ),
                ].join("\n")

                // Create download link
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement("a")
                link.setAttribute("href", url)
                link.setAttribute("download", `whatsapp-analytics-${new Date().toISOString().split("T")[0]}.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }}
            >
              Export CSV
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
