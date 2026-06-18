import { redirect } from "next/navigation"
import { getCurrentAdmin } from "@/lib/auth"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | Chocolate Academy",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const admin = await getCurrentAdmin()
  if (!admin) {
    redirect("/admin/login")
  }
  return <AdminDashboard admin={admin} />
}
