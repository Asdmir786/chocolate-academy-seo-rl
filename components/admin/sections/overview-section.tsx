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

export function OverviewSection({ onNavigate }: { onNavigate: (s: string) => void }) {
  const { data, isLoading } = useSWR<{ stats: Stats }>("/api/admin/stats", fetcher)
  const stats = data?.stats

  const cards = [
    {
      label: "WhatsApp Inquiries",
      value: stats?.totalWhatsappClicks,
      icon: MessageCircle,
      hint: "Total tracked clicks",
      go: "reports",
    },
    {
      label: "Course Inquiries",
      value: stats?.totalInquiries,
      icon: Inbox,
      hint: "Registration form submissions",
      go: "reports",
    },
    {
      label: "Products",
      value: stats?.totalProducts,
      icon: ShoppingBag,
      hint: `${stats?.activeProducts ?? 0} active`,
      go: "products",
    },
    {
      label: "Courses",
      value: stats?.totalCourses,
      icon: GraduationCap,
      hint: `${stats?.activeCourses ?? 0} active`,
      go: "courses",
    },
    {
      label: "Newsletters",
      value: stats?.totalNewsletters,
      icon: Newspaper,
      hint: "Published issues",
      go: "newsletters",
    },
  ]

  const dayData = (stats?.clicksByDay ?? []).map((d) => ({
    day: new Date(d.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    clicks: d.count,
  }))

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <button
              key={c.label}
              onClick={() => onNavigate(c.go)}
              className="group text-left"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-100 text-amber-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-2xl font-bold text-[#2c1a10]">
                    {isLoading ? "—" : (c.value ?? 0).toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-[#2c1a10]">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{c.hint}</p>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-amber-600" /> WhatsApp Inquiries (Last 30 days)
            </CardTitle>
            <CardDescription>Daily WhatsApp click activity across the website</CardDescription>
          </CardHeader>
          <CardContent>
            {dayData.length === 0 ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={dayData} margin={{ left: -20, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ACCENT} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7ddd2" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="clicks" stroke={ACCENT} strokeWidth={2} fill="url(#clicksFill)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Inquiries by City</CardTitle>
            <CardDescription>Where interest is coming from</CardDescription>
          </CardHeader>
          <CardContent>
            {!stats?.clicksByCity?.length ? (
              <EmptyChart />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stats.clicksByCity}
                    dataKey="count"
                    nameKey="city"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
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
          <CardTitle className="text-base">Most Requested Products</CardTitle>
          <CardDescription>Products generating the most WhatsApp inquiries</CardDescription>
        </CardHeader>
        <CardContent>
          {!stats?.topProducts?.length ? (
            <EmptyChart />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats.topProducts} layout="vertical" margin={{ left: 40, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e7ddd2" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="product_name"
                  width={140}
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="count" fill={BRAND} radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function EmptyChart() {
  return (
    <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
      No data yet
    </div>
  )
}
