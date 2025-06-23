"use client"

// Simple script to add to any page for tracking WhatsApp clicks
export function setupWhatsAppTracking() {
  if (typeof window === "undefined") return

  // Find all WhatsApp links
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')

  whatsappLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault()

      const href = link.getAttribute("href") || ""
      const phoneMatch = href.match(/wa\.me\/(\d+)/)
      const phoneNumber = phoneMatch ? phoneMatch[1] : ""

      // Get location information
      const url = window.location.href
      const path = window.location.pathname

      // Determine source based on path
      let source = "unknown"
      if (path === "/") source = "home page"
      else if (path.includes("/shop/")) source = "product page"
      else if (path === "/shop") source = "shop page"
      else if (path.includes("/gifting")) source = "gifting page"
      else if (path === "/contact") source = "contact page"

      // Determine button location based on position in page
      let buttonLocation = "unknown"
      const rect = link.getBoundingClientRect()
      const position = rect.top + window.scrollY

      if (position < 200) buttonLocation = "header"
      else if (position > document.body.scrollHeight - 500) buttonLocation = "footer"
      else buttonLocation = "content"

      try {
        // Track the click
        await fetch("/api/track-whatsapp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url,
            source,
            buttonLocation,
            userAgent: navigator.userAgent,
          }),
        })

        // Open WhatsApp
        window.open(href, "_blank")
      } catch (error) {
        console.error("Error tracking WhatsApp click:", error)
        // Still open WhatsApp even if tracking fails
        window.open(href, "_blank")
      }
    })
  })
}
