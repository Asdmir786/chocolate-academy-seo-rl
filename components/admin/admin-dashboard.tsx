"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  Newspaper,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AdminUser } from "@/lib/auth"
import { OverviewSection } from "./sections/overview-section"
import { ProductsSection } from "./sections/products-section"
import { CoursesSection } from "./sections/courses-section"
import { NewslettersSection } from "./sections/newsletters-section"
import { ReportsSection } from "./sections/reports-section"
import { SettingsSection } from "./sections/settings-section"

type SectionKey = "overview" | "products" | "courses" | "newsletters" | "reports" | "settings"

const NAV: { key: SectionKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: ShoppingBag },
  { key: "courses", label: "Courses", icon: GraduationCap },
  { key: "newsletters", label: "Newsletters", icon: Newspaper },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
]

export function AdminDashboard({ admin }: { admin: AdminUser }) {
  const [section, setSection] = useState<SectionKey>("overview")
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" })
    router.push("/admin/login")
    router.refresh()
  }

  const activeLabel = NAV.find((n) => n.key === section)?.label ?? "Overview"

  return (
    <div className="flex min-h-screen bg-[#f7f3ee] text-[#2c1a10]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#2c1a10] text-amber-50 transition-transform md:static md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-500 font-bold text-[#2c1a10]">
            CA
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Chocolate Academy</p>
            <p className="text-xs text-amber-200/70">Content Manager</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = section === item.key
            return (
              <button
                key={item.key}
                onClick={() => {
                  setSection(item.key)
                  setMobileOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-amber-500 text-[#2c1a10]" : "text-amber-100/80 hover:bg-white/10 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 px-3">
            <p className="truncate text-sm font-medium">{admin.name}</p>
            <p className="truncate text-xs text-amber-200/70">{admin.email}</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-amber-100/80 hover:bg-white/10 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-4 py-3 md:px-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div>
              <h1 className="text-lg font-bold text-[#2c1a10]">{activeLabel}</h1>
              <p className="text-xs text-muted-foreground">Manage your website content</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-md border px-3 py-1.5 text-sm font-medium text-[#2c1a10] hover:bg-muted sm:inline-block"
          >
            View site
          </a>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {section === "overview" && <OverviewSection onNavigate={(s) => setSection(s as SectionKey)} />}
          {section === "products" && <ProductsSection />}
          {section === "courses" && <CoursesSection />}
          {section === "newsletters" && <NewslettersSection />}
          {section === "reports" && <ReportsSection />}
          {section === "settings" && <SettingsSection currentAdminId={admin.id} />}
        </main>
      </div>
    </div>
  )
}
