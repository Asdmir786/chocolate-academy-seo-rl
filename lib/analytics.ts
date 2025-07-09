// Analytics tracking for WhatsApp clicks - NEON DATABASE ONLY
export type WhatsAppClickEvent = {
  productId?: string
  productName?: string
  url?: string
  city?: string
  source?: string
  buttonLocation?: string
  timestamp: string
  userAgent?: string
  phoneNumber?: string
}

export type AnalyticsData = {
  whatsappClicks: WhatsAppClickEvent[]
}

// Default WhatsApp number
const DEFAULT_WHATSAPP_NUMBER = "923093336142"

// Main tracking function - NEON DATABASE ONLY
export const trackWhatsAppClick = async (data: {
  productId?: string
  productName?: string
  city?: string
  source: string
  buttonLocation: string
  phoneNumber?: string
  message?: string
}) => {
  try {
    if (typeof window === "undefined") return

    console.log("🔄 Starting WhatsApp click tracking (NEON DATABASE ONLY):", data)

    // Prepare tracking data for Neon database
    const trackingData = {
      productId: data.productId,
      productName: data.productName,
      url: window.location.href,
      city: data.city || "not-specified",
      source: data.source,
      buttonLocation: data.buttonLocation,
      userAgent: navigator.userAgent,
      phoneNumber: data.phoneNumber,
      timestamp: new Date().toISOString(),
    }

    console.log("📡 Sending tracking request to Neon database API:", trackingData)

    // Send to Neon database API
    const response = await fetch("/api/track-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    })

    console.log("📡 Neon Database API Response status:", response.status)
    console.log("📡 Neon Database API Response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Neon Database API error: ${response.status} ${response.statusText}`)
      console.error("❌ Neon Database API error response:", errorText)
      throw new Error(`Neon Database API failed: ${response.status} - ${errorText}`)
    }

    const responseData = await response.json()
    console.log("✅ Neon Database API Response data:", responseData)

    // Check if data was saved to Neon database (NO FALLBACK ALLOWED)
    if (responseData.success && responseData.databaseConnected && !responseData.fallback) {
      console.log("✅ WhatsApp click successfully saved to Neon database!")
      console.log("✅ Neon Database record ID:", responseData.id)
      console.log("📊 Total records in Neon database:", responseData.totalRecords)
    } else {
      console.error("❌ Neon Database save failed or fallback detected:", responseData)
      throw new Error(responseData.error || "Neon Database save failed or fallback detected")
    }

    // Open WhatsApp after successful Neon database save
    const phoneNumber = data.phoneNumber || DEFAULT_WHATSAPP_NUMBER
    const formattedPhone = phoneNumber.replace(/\D/g, "")
    const encodedMessage = data.message ? encodeURIComponent(data.message) : ""
    const whatsappUrl = `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`

    console.log("📱 Opening WhatsApp URL after Neon database save:", whatsappUrl)
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")

    return { success: true, databaseConnected: true, fallback: false }
  } catch (error) {
    console.error("❌ WhatsApp click tracking failed (Neon database error):", error)

    // Still open WhatsApp even if Neon database tracking fails
    try {
      const phoneNumber = data.phoneNumber || DEFAULT_WHATSAPP_NUMBER
      const formattedPhone = phoneNumber.replace(/\D/g, "")
      const encodedMessage = data.message ? encodeURIComponent(data.message) : ""
      const whatsappUrl = `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`
      console.log("📱 Opening WhatsApp URL (after Neon database tracking error):", whatsappUrl)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } catch (e) {
      console.error("❌ Failed to open WhatsApp:", e)
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      databaseConnected: false,
      fallback: false, // NO FALLBACK
    }
  }
}

// Setup automatic WhatsApp link tracking - NEON DATABASE ONLY
export const setupWhatsAppTracking = () => {
  if (typeof window === "undefined") return

  console.log("🔄 Setting up WhatsApp tracking (NEON DATABASE ONLY)...")

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement
    const whatsappLink = target.closest('a[href*="wa.me"], a[href*="whatsapp.com"]') as HTMLAnchorElement

    if (whatsappLink) {
      console.log("📱 WhatsApp link clicked:", whatsappLink.href)
      event.preventDefault()

      // Extract phone number from the link
      const href = whatsappLink.href
      const phoneMatch = href.match(/wa\.me\/(\d+)/)
      const phoneNumber = phoneMatch ? phoneMatch[1] : DEFAULT_WHATSAPP_NUMBER

      // Extract message from the link
      const messageMatch = href.match(/text=([^&]+)/)
      const message = messageMatch ? decodeURIComponent(messageMatch[1]) : ""

      // Determine source and location
      const source = window.location.pathname
      const buttonLocation = getElementPath(whatsappLink)

      console.log("📱 Extracted WhatsApp data for Neon database:", { phoneNumber, message, source, buttonLocation })

      // Track the click in Neon database ONLY
      trackWhatsAppClick({
        phoneNumber,
        message,
        source,
        buttonLocation,
      })
    }
  })

  console.log("✅ WhatsApp tracking setup complete (NEON DATABASE ONLY)")
}

// Helper function to get element path
const getElementPath = (element: HTMLElement): string => {
  let path = ""
  let current = element

  for (let i = 0; i < 3; i++) {
    if (!current) break

    if (current.id) {
      path = `#${current.id}${path ? " > " + path : ""}`
      break
    } else if (current.className && typeof current.className === "string") {
      const classes = current.className
        .split(" ")
        .filter((c) => c)
        .join(".")
      if (classes) {
        path = `.${classes}${path ? " > " + path : ""}`
      }
    }

    current = current.parentElement as HTMLElement
  }

  return path || "unknown"
}
