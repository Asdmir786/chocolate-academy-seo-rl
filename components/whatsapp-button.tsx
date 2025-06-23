"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { trackWhatsAppClick } from "@/lib/analytics"
import { Phone } from "lucide-react"

interface WhatsAppButtonProps {
  phoneNumber?: string // Made optional
  message?: string
  productId?: string
  productName?: string
  city?: string
  source?: string
  buttonLocation?: string
  className?: string
  children?: React.ReactNode
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export default function WhatsAppButton({
  phoneNumber,
  message = "",
  productId,
  productName,
  city,
  source,
  buttonLocation,
  className = "",
  children,
  variant = "default",
  size = "default",
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Get current page path if source not provided
    const currentSource = source || window.location.pathname
    const currentLocation = buttonLocation || "whatsapp-button"

    // Track the click and open WhatsApp
    trackWhatsAppClick({
      productId,
      productName,
      city,
      source: currentSource,
      buttonLocation: currentLocation,
      phoneNumber, // This can be undefined, the tracking function will handle it
      message,
    })
  }

  return (
    <Button
      onClick={handleClick}
      className={`${className} ${variant === "default" ? "bg-[#25D366] hover:bg-[#128C7E] text-white" : ""}`}
      variant={variant}
      size={size}
    >
      {children || (
        <>
          <Phone className="mr-2 h-4 w-4" />
          WhatsApp
        </>
      )}
    </Button>
  )
}
