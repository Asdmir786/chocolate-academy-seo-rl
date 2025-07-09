// Analytics tracking for WhatsApp clicks
export type WhatsAppClickEvent = {
  productId?: string
  productName?: string
  url?: string
  city?: string
  source?: string // Which page or component the click came from
  buttonLocation?: string // Where on the page the button is located
  timestamp: string
  userAgent?: string
  phoneNumber?: string
}

export type AnalyticsData = {
  whatsappClicks: WhatsAppClickEvent[]
}

// In-memory storage for WhatsApp clicks (fallback only)
let whatsappClicks: WhatsAppClickEvent[] = []

// Default WhatsApp number to use if none is provided
const DEFAULT_WHATSAPP_NUMBER = "923093336142" // Replace with your actual default number

// Reusable tracking function that can be imported anywhere in the app
export const trackWhatsAppClick = async (data: {
  productId?: string
  productName?: string
  city?: string
  source: string
  buttonLocation: string
  phoneNumber?: string // Made optional
  message?: string
}) => {
  try {
    if (typeof window === "undefined") return // Only run on client side

    // Log to console for debugging
    console.log("🔄 Starting WhatsApp click tracking with data:", data)

    // Prepare tracking data
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

    console.log("📡 Sending tracking request to API with data:", trackingData)

    // Track the click with enhanced logging
    const response = await fetch("/api/track-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
    })

    console.log("📡 API Response status:", response.status)
    console.log("📡 API Response ok:", response.ok)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ API error: ${response.status} ${response.statusText}`)
      console.error("❌ API error response:", errorText)
      // Continue execution even if API fails
    } else {
      const responseData = await response.json()
      console.log("✅ API Response data:", responseData)

      if (responseData.success) {
        console.log("✅ WhatsApp click tracked successfully!")
        if (responseData.id) {
          console.log("✅ Database record ID:", responseData.id)
        }
        if (responseData.totalRecords) {
          console.log("📊 Total records in database:", responseData.totalRecords)
        }
        if (responseData.databaseConnected) {
          console.log("✅ Data saved to Neon database")
        } else {
          console.log("⚠️ Data saved to memory storage (database unavailable)")
        }
      } else {
        console.warn("⚠️ API returned success=false:", responseData)
      }
    }

    // Use default phone number if none provided
    const phoneNumber = data.phoneNumber || DEFAULT_WHATSAPP_NUMBER

    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "")

    // Encode message for URL
    const encodedMessage = data.message ? encodeURIComponent(data.message) : ""

    // WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`

    console.log("📱 Opening WhatsApp URL:", whatsappUrl)

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")

    return { success: true }
  } catch (error) {
    console.error("❌ Error tracking WhatsApp click:", error)

    // Even if tracking fails, still open WhatsApp
    try {
      // Use default phone number if none provided
      const phoneNumber = data.phoneNumber || DEFAULT_WHATSAPP_NUMBER
      const formattedPhone = phoneNumber.replace(/\D/g, "")
      const encodedMessage = data.message ? encodeURIComponent(data.message) : ""
      const whatsappUrl = `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`
      console.log("📱 Opening WhatsApp URL (fallback):", whatsappUrl)
      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
    } catch (e) {
      console.error("❌ Failed to open WhatsApp:", e)
    }

    return { error: true, message: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Get all WhatsApp clicks (fallback function)
export function getWhatsAppClicks(): WhatsAppClickEvent[] {
  return whatsappClicks
}

// Clear all WhatsApp clicks from memory (fallback function)
export function clearWhatsAppClicks() {
  whatsappClicks = []
  return true
}

// Function to track WhatsApp clicks from any link on the page
export const setupWhatsAppTracking = () => {
  if (typeof window === "undefined") return

  console.log("🔄 Setting up WhatsApp tracking...")

  // Find all WhatsApp links on the page
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

      console.log("📱 Extracted data:", { phoneNumber, message, source, buttonLocation })

      // Track the click
      trackWhatsAppClick({
        phoneNumber,
        message,
        source,
        buttonLocation,
      })
    }
  })

  console.log("✅ WhatsApp tracking setup complete")
}

// Helper function to get a description of where an element is on the page
const getElementPath = (element: HTMLElement): string => {
  let path = ""
  let current = element

  // Get up to 3 parent elements with IDs or classes
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
