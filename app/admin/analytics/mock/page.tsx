"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function MockDataPage() {
  const router = useRouter()

  useEffect(() => {
    const generateMockData = async () => {
      try {
        // Generate 50 mock WhatsApp click events
        const sources = ["/shop", "/contact", "/gifting", "/about", "/home"]
        const products = [
          "Dark Chocolate Truffles",
          "Milk Chocolate Box",
          "Assorted Chocolates",
          "Gift Hamper",
          "Custom Box",
        ]
        const cities = ["lahore", "karachi", "islamabad", "faisalabad", "rawalpindi"]
        const locations = ["header", "footer", "product-card", "contact-form", "hero-section"]

        const mockData = Array.from({ length: 50 }).map((_, i) => ({
          productId: `prod_${Math.floor(Math.random() * 1000)}`,
          productName: products[Math.floor(Math.random() * products.length)],
          url: `https://chocolateacademy.pk${sources[Math.floor(Math.random() * sources.length)]}`,
          city: cities[Math.floor(Math.random() * cities.length)],
          source: sources[Math.floor(Math.random() * sources.length)],
          buttonLocation: locations[Math.floor(Math.random() * locations.length)],
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        }))

        // Save mock data to in-memory store
        for (const event of mockData) {
          await fetch("/api/track", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
          })
        }

        // Redirect to analytics page
        router.push("/admin/analytics")
      } catch (error) {
        console.error("Error generating mock data:", error)
        // Redirect anyway after a short delay
        setTimeout(() => {
          router.push("/admin/analytics")
        }, 2000)
      }
    }

    generateMockData()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf6f0]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3c2415] mx-auto mb-4"></div>
        <h1 className="text-xl font-bold text-[#3c2415] mb-2">Generating Mock Data</h1>
        <p className="text-gray-600">Creating 50 random WhatsApp click events...</p>
      </div>
    </div>
  )
}
