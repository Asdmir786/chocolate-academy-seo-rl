"use client"

import { useEffect } from "react"
import { setupWhatsAppTracking } from "@/lib/analytics"

export default function TrackingScript() {
  useEffect(() => {
    // Set up global tracking for WhatsApp links
    setupWhatsAppTracking()

    console.log("WhatsApp tracking script initialized")
  }, [])

  return null
}
