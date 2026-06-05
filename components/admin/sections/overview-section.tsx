"use client"

import useSWR from "swr"
import {
  ShoppingBag,
  GraduationCap,
  Newspaper,
  MessageCircle,
  Inbox,
  TrendingUp,
  ArrowRight,
  Wallet,
  Trophy,
  MapPin,
  Receipt,
  CalendarDays,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { fetcher, ACCENT, BRAND, CHART_COLORS } from "../use-admin"

const WHATSAPP_GREEN = "#16a34a"

type Stats = {
  totalProducts: number
  activeProducts: number
  totalCourses: number
  activeCourses: number
  totalNewsletters: number
  totalWhatsappClicks: number
  totalInquiries: number
  clicksByCity: { city: string; count: number }[]
  clicksByDay: { day: string; count: number }[]
  topProducts: { product_name: string; count: number }[]
}

type Commerce = {
  windows: { key: string; label: string; conversations: number; value: number }[]
  totals: { conversations: number; value: number; valuedConversations: number; avgOrderValue: number }
  salesTrend: { month: string; value: number; conversations: number }[]
  topProductsByValue: { name: string; conversations: number; value: number }[]
  topCitiesByValue: { city: string; conversations: number; value: number }[]
  topProductThisMonth: { name: string; conversations: number; value: number } | null
}

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

export function OverviewSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { data, isLoading } = useSWR<{ stats: Stats; commerce: Commerce }>("/api/admin/stats", fetcher)
  const stats = data?.stats
  const commerce = data?.commerce

  const monthWindow = commerce?.windows.find((w) => w.key === "month")

  const dayData = (stats?.clicksByDay ?? []).map((d) => ({
    day: new Date(d.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    clicks: d.count,
  }))

  const trendData = (commerce?.salesTrend ?? []).map((d) => ({
    month: new Date(d.month + "-01").toLocaleDateString("en-US", { month: "short" }),
    value: Number(d.value),
    conversations: d.conversations,
  }))

  const productValueData = (commerce?.topProductsByValue ?? []).map((p) => ({
    name: p.name.length > 22 ? p.name.slice(0, 21) + "…" : p.name,
    value: Number(p.value),
    conversations: p.conversations,
  }))

  const entityCards = [
    { label: "Products", value: stats?.totalProducts, icon: ShoppingBag, hint: `${stats?.activeProducts ?? 0} active`, go: "products" },
    { label: "Courses", value: stats?.totalCourses, icon: GraduationCap, hint: `${stats?.activeCourses ?? 0} active`, go: "courses" },
    { label: "Course Inquiries", value: stats?.totalInquiries, icon: Inbox, hint: "Form submissions", go: "reports" },
    { label: "Newsletters", value: stats?.totalNewsletters, icon: Newspaper, hint: "Published issues", go: "newsletters" },
  ]

  return (
    <div className="space-y-6">
      {/* Commerce hero */}
      <Card className="overflow-hidden border-none bg-[#2c1a10] text-amber-50">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-300">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">WhatsApp Commerce</span>
            </div>
            <p className="text-3xl font-bold text-balance md:text-4xl">
              {isLoading ? "—" : pkr(commerce?.totals.value ?? 0)}
            </p>
            <p className="max-w-xl text-sm text-amber-100/80 text-pretty">
              Estimated order value initiated through {(commerce?.totals.conversations ?? 0).toLocaleString()} WhatsApp
              conversations. Each conversation is valued at the product price or course fee it referenced — actual
              conversions may vary as WhatsApp chats aren&apos;t tracked.
            </p>
          </div>
          <div className="flex shrink-0 gap-6">
            <div>
              <p className="text-2xl font-bold">{(commerce?.totals.valuedConversations ?? 0).toLocaleString()}</p>
              <p className="text-xs text-amber-100/70">Valued leads</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{pkrCompact(commerce?.totals.avgOrderValue ?? 0)}</p>
              <p className="text-xs text-amber-100/70">Avg order value</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prospective sales by window */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-amber-600" />
          <h2 className="text-sm font-semibold text-[#2c1a10]">Prospective Sales by Period</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {(commerce?.windows ?? []).map((w) => (
            <Card key={w.key} className="transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-muted-foreground">{w.label}</p>
                <p className="mt-1 text-lg font-bold text-[#2c1a10]">{isLoading ? "—" : pkrCompact(w.value)}</p>
                <p className="mt-1 text-xs text-amber-700">{w.conversations.toLocaleString()} conversations</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Engagement quick cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <button onClick={() => onNavigate("reports")} className="group text-left">
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-md text-white" style={{ background: WHATSAPP_GREEN }}>
                  <MessageCircle className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-2xl font-bold text-[#2c1a10]">
                {isLoading ? "—" : (stats?.totalWhatsappClicks ?? 0).toLocaleString()}
              </p>
              <p className="text-sm font-medium text-[#2c1a10]">WhatsApp Conversations</p>
              <p className="text-xs text-muted-foreground">All tracked inquiries</p>
            </CardContent>
          </Card>
        </button>
        {entityCards.map((c) => {
          const Icon = c.icon
          return (
            <button key={c.label} onClick={() => onNavigate(c.go)} className="group text-left">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-2xl font-bold text-[#2c1a10]">{isLoading ? "—" : (c.value ?? 0).toLocaleString()}</p>
                  <p className="text-sm font-medium text-[#2c1a10]">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.hint}</p>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>

      {/* Sales trend + Top product this month */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Wallet className="h-4 w-4 text-amber-600" /> Prospective Sales Trend
            </CardTitle>
            <CardDescription>Estimated order value initiated per month (last 12 months)</CardDescription>
          </CardHeader>
          <CardContent>
            {trendData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={trendData} margin={{ left: 0, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ACCENT} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7ddd2" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis
                    tickFormatter={(v) => pkrCompact(Number(v)).replace("Rs ", "")}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={48}
                  />
                  <Tooltip formatter={(v: number) => [pkr(Number(v)), "Est. value"]} />
                  <Area type="monotone" dataKey="value" stroke={ACCENT} strokeWidth={2} fill="url(#salesFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4 text-amber-600" /> Top Product This Month
            </CardTitle>
            <CardDescription>Most requested product (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-center">
            {!commerce?.topProductThisMonth ? (
              <EmptyChart />
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-amber-50 p-4">
                  <p className="text-lg font-bold text-[#2c1a10] text-balance">
                    {commerce.topProductThisMonth.name}
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    {commerce.topProductThisMonth.conversations.toLocaleString()} conversations
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Receipt className="h-4 w-4" />
                    <span className="text-sm">Prospective sales</span>
                  </div>
                  <span className="text-lg font-bold text-[#2c1a10]">{pkr(commerce.topProductThisMonth.value)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top products by value + Top cities */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-amber-600" /> Top Products by Prospective Sales
            </CardTitle>
            <CardDescription>Estimated value initiated per product (last 30 days)</CardDescription>
          </CardHeader>
          <CardContent>
            {productValueData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productValueData} layout="vertical" margin={{ left: 60, right: 16 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e7ddd2" />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => pkrCompact(Number(v)).replace("Rs ", "")}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    formatter={(v: number, _n, p) => [
                      `${pkr(Number(v))} · ${(p?.payload?.conversations ?? 0).toLocaleString()} conv`,
                      "Prospective",
                    ]}
                  />
                  <Bar dataKey="value" fill={BRAND} radius={[0, 4, 4, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4 text-amber-600" /> Top Cities
            </CardTitle>
            <CardDescription>By conversations initiated</CardDescription>
          </CardHeader>
          <CardContent>
            {!commerce?.topCitiesByValue?.length ? (
              <EmptyChart />
            ) : (
              <div className="space-y-3">
                {commerce.topCitiesByValue.map((c, i) => {
                  const max = commerce.topCitiesByValue[0]?.conversations || 1
                  return (
                    <div key={c.city}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-[#2c1a10]">{titleCase(c.city)}</span>
                        <span className="text-muted-foreground">{c.conversations.toLocaleString()}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-amber-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(4, (c.conversations / max) * 100)}%`,
                            background: CHART_COLORS[i % CHART_COLORS.length],
                          }}
                        />
                      </div>
                      <p className="mt-0.5 text-xs text-amber-700">{pkrCompact(c.value)} prospective</p>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Engagement: daily clicks + city pie + most requested */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageCircle className="h-4 w-4 text-amber-600" /> Conversations (Last 30 days)
            </CardTitle>
            <CardDescription>Daily WhatsApp click activity</CardDescription>
          </CardHeader>
          <CardContent>
            {dayData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={dayData} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={WHATSAPP_GREEN} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={WHATSAPP_GREEN} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7ddd2" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="clicks" stroke={WHATSAPP_GREEN} strokeWidth={2} fill="url(#clicksFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversations by City</CardTitle>
            <CardDescription>Where interest comes from</CardDescription>
          </CardHeader>
          <CardContent>
            {!stats?.clicksByCity?.length ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={stats.clicksByCity.map((c) => ({ ...c, city: titleCase(c.city) }))}
                    dataKey="count"
                    nameKey="city"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    label={(e) => e.city}
                    fontSize={11}
                  >
                    {stats.clicksByCity.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Most Requested (All Sources)</CardTitle>
          <CardDescription>Top products and inquiry types generating WhatsApp conversations</CardDescription>
        </CardHeader>
        <CardContent>
          {!stats?.topProducts?.length ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.topProducts} layout="vertical" margin={{ left: 60, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e7ddd2" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="product_name"
                  width={160}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" fill={ACCENT} radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {monthWindow && (
        <p className="text-center text-xs text-muted-foreground">
          This month: {pkr(monthWindow.value)} prospective sales across {monthWindow.conversations.toLocaleString()}{" "}
          conversations. Values are estimates based on catalog prices, not confirmed orders.
        </p>
      )}
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">No data yet</div>
  )
}
