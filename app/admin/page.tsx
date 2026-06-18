"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
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
      // Redirect to analytics page if authenticated
      router.push("/admin/newsletters")
    }
  }, [router])

  // Return a loading state while checking authentication
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6f0]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415]"></div>
    </div>
  )
}
