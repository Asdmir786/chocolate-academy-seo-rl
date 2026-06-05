"use client"

import { useState } from "react"
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
import { Download, Search, MessageCircle, ClipboardList } from "lucide-react"

type WhatsappClick = {
  id: number
  product_name: string | null
  city: string | null
  timestamp: string
}

function exportCsv(filename: string, rows: Record<string, unknown>[]) {
  if (rows.length === 0) return
  const headers = Object.keys(rows[0])
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(","),
    ),
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
  const [tab, setTab] = useState<"inquiries" | "clicks">("inquiries")
  const [query, setQuery] = useState("")

  const { data: inqData, isLoading: inqLoading } = useSWR<{ inquiries: CourseInquiry[] }>(
    "/api/admin/inquiries",
    fetcher,
  )
  const { data: clickData, isLoading: clickLoading } = useSWR<{ clicks: WhatsappClick[] }>(
    "/api/admin/clicks",
    fetcher,
  )

  const inquiries = inqData?.inquiries ?? []
  const clicks = clickData?.clicks ?? []

  const filteredInquiries = inquiries.filter((i) =>
    [i.full_name, i.email, i.phone, i.city, i.course]
      .filter(Boolean)
      .some((v) => v!.toLowerCase().includes(query.toLowerCase())),
  )
  const filteredClicks = clicks.filter((c) =>
    [c.product_name, c.city].filter(Boolean).some((v) => v!.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">Inquiries generated and WhatsApp engagement.</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          <button
            onClick={() => setTab("inquiries")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === "inquiries" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardList className="h-4 w-4" /> Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setTab("clicks")}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === "clicks" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Clicks ({clicks.length})
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 pl-8"
            />
          </div>
          <Button
            variant="outline"
            onClick={() =>
              tab === "inquiries"
                ? exportCsv("inquiries.csv", filteredInquiries as unknown as Record<string, unknown>[])
                : exportCsv("whatsapp-clicks.csv", filteredClicks as unknown as Record<string, unknown>[])
            }
          >
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card">
        {tab === "inquiries" ? (
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
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clickLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredClicks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    No clicks found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredClicks.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium text-foreground">{c.product_name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{c.city || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(c.timestamp).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
