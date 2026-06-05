"use client"

import type React from "react"
import { useMemo, useState } from "react"
import useSWR from "swr"
import { fetcher } from "../use-admin"
import type { CourseInquiry } from "@/lib/cms"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Download, Search, MessageCircle, ClipboardList, Wallet, MapPin, Receipt } from "lucide-react"

type WhatsappClick = {
  id: number
  product_name: string | null
  product_id: string | null
  city: string | null
  source: string | null
  button_location: string | null
  timestamp: string
  value: number
}

type ClickSummary = { total: number; total_value: number; valued: number }

function pkr(n: number): string {
  return "Rs " + (n ?? 0).toLocaleString("en-PK")
}
function pkrCompact(n: number): string {
  if (n >= 1e7) return "Rs " + (n / 1e7).toFixed(2) + " Cr"
  if (n >= 1e5) return "Rs " + (n / 1e5).toFixed(2) + " Lac"
  if (n >= 1e3) return "Rs " + (n / 1e3).toFixed(1) + "K"
  return "Rs " + (n ?? 0)
}
function titleCase(s: string): string {
  return s.replace(/(^|[\s-])\w/g, (m) => m.toUpperCase())
}
function prettySource(s: string | null): string {
  if (!s) return "—"
  return titleCase(s.replace(/_/g, " "))
}

function exportCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")),
  ].join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function ReportsSection() {
  const [tab, setTab] = useState<"inquiries" | "clicks">("clicks")
  const [query, setQuery] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [sort, setSort] = useState("newest")

  const { data: inqData, isLoading: inqLoading } = useSWR<{ inquiries: CourseInquiry[] }>(
    "/api/admin/inquiries",
    fetcher,
  )
  const { data: clickData, isLoading: clickLoading } = useSWR<{ clicks: WhatsappClick[]; summary: ClickSummary }>(
    "/api/admin/clicks",
    fetcher,
  )

  const inquiries = inqData?.inquiries ?? []
  const clicks = clickData?.clicks ?? []
  const summary = clickData?.summary

  const cities = useMemo(() => {
    const set = new Set<string>()
    clicks.forEach((c) => c.city && set.add(c.city))
    return Array.from(set).sort()
  }, [clicks])

  const filteredInquiries = inquiries.filter((i) =>
    [i.full_name, i.email, i.phone, i.city, i.course]
      .filter(Boolean)
      .some((v) => v!.toLowerCase().includes(query.toLowerCase())),
  )

  const filteredClicks = useMemo(() => {
    let list = clicks.filter((c) =>
      [c.product_name, c.city, c.source].filter(Boolean).some((v) => v!.toLowerCase().includes(query.toLowerCase())),
    )
    if (cityFilter !== "all") list = list.filter((c) => c.city === cityFilter)
    list = [...list].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        case "value-high":
          return b.value - a.value
        case "value-low":
          return a.value - b.value
        case "product":
          return (a.product_name || "").localeCompare(b.product_name || "")
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      }
    })
    return list
  }, [clicks, query, cityFilter, sort])

  const filteredValue = useMemo(() => filteredClicks.reduce((s, c) => s + (c.value || 0), 0), [filteredClicks])
  const topCity = summary && clicks.length ? mostCommonCity(clicks) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">
          WhatsApp commerce engagement and course inquiries, valued by catalog price.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setTab("clicks")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === "clicks" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Conversations ({clicks.length})
          </button>
          <button
            onClick={() => setTab("inquiries")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === "inquiries" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="h-4 w-4" /> Course Inquiries ({inquiries.length})
          </button>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            tab === "inquiries"
              ? exportCsv("inquiries.csv", filteredInquiries as unknown as Record<string, unknown>[])
              : exportCsv("whatsapp-conversations.csv", filteredClicks as unknown as Record<string, unknown>[])
          }
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </div>

      {tab === "clicks" && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <SummaryCard
              icon={<MessageCircle className="h-5 w-5" />}
              label="Total Conversations"
              value={(summary?.total ?? 0).toLocaleString()}
              hint="All tracked WhatsApp clicks"
            />
            <SummaryCard
              icon={<Wallet className="h-5 w-5" />}
              label="Prospective Sales"
              value={pkrCompact(summary?.total_value ?? 0)}
              hint="Estimated order value initiated"
            />
            <SummaryCard
              icon={<Receipt className="h-5 w-5" />}
              label="Valued Leads"
              value={(summary?.valued ?? 0).toLocaleString()}
              hint="Conversations with catalog value"
            />
            <SummaryCard
              icon={<MapPin className="h-5 w-5" />}
              label="Top City"
              value={topCity ? titleCase(topCity) : "—"}
              hint="Most conversations"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product, city, source..."
                className="w-56 pl-8"
              />
            </div>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {cities.map((c) => (
                  <SelectItem key={c} value={c}>
                    {titleCase(c)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="value-high">Value: High to Low</SelectItem>
                <SelectItem value="value-low">Value: Low to High</SelectItem>
                <SelectItem value="product">Product (A-Z)</SelectItem>
              </SelectContent>
            </Select>
            <span className="ml-auto text-sm text-muted-foreground">
              {filteredClicks.length.toLocaleString()} shown · {pkr(filteredValue)}
            </span>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product / Inquiry</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Est. Value</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clickLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredClicks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No conversations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClicks.slice(0, 500).map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium text-foreground">{c.product_name || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{c.city ? titleCase(c.city) : "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{prettySource(c.source)}</TableCell>
                      <TableCell className="text-right">
                        {c.value > 0 ? (
                          <span className="font-medium text-[#2c1a10]">{pkr(c.value)}</span>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Lead
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{new Date(c.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {filteredClicks.length > 500 && (
            <p className="text-center text-xs text-muted-foreground">
              Showing first 500 of {filteredClicks.length.toLocaleString()}. Use search or export for the full list.
            </p>
          )}
        </>
      )}

      {tab === "inquiries" && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, course..."
                className="w-56 pl-8"
              />
            </div>
            <span className="ml-auto text-sm text-muted-foreground">
              {filteredInquiries.length.toLocaleString()} shown
            </span>
          </div>
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inqLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInquiries.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-medium text-foreground">{i.full_name || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="text-sm">{i.email}</div>
                        <div className="text-xs">{i.phone}</div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{i.city || "—"}</TableCell>
                      <TableCell className="text-muted-foreground">{i.course || "—"}</TableCell>
                      <TableCell>
                        {i.payment_method ? <Badge variant="outline">{i.payment_method}</Badge> : "—"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(i.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}

function SummaryCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint: string
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-amber-700">
          {icon}
        </span>
        <p className="text-2xl font-bold text-[#2c1a10]">{value}</p>
        <p className="text-sm font-medium text-[#2c1a10]">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  )
}

function mostCommonCity(clicks: WhatsappClick[]): string | null {
  const counts: Record<string, number> = {}
  for (const c of clicks) {
    if (!c.city) continue
    counts[c.city] = (counts[c.city] || 0) + 1
  }
  let best: string | null = null
  let max = 0
  for (const [city, n] of Object.entries(counts)) {
    if (n > max) {
      max = n
      best = city
    }
  }
  return best
}
