"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { trackWhatsAppClick } from "@/lib/analytics"
import type { CityOption } from "@/components/product-card"

interface ProductOrderBoxProps {
  productId: number
  productName: string
  productSlug: string
  cities: CityOption[]
}

export default function ProductOrderBox({ productId, productName, productSlug, cities }: ProductOrderBoxProps) {
  const [selectedCity, setSelectedCity] = useState(cities[0]?.slug ?? "lahore")

  const handleWhatsAppClick = () => {
    const city = cities.find((c) => c.slug === selectedCity) ?? cities[0]
    if (!city) return

    trackWhatsAppClick({
      productId: productId.toString(),
      productName,
      city: city.slug,
      source: "product_detail_page",
      buttonLocation: "product_detail_whatsapp_button",
    })

    const number = city.whatsapp_number.replace(/[-\s]/g, "")
    const whatsappMessage = `Hello, I'm interested in the ${productName} from Chocolate Academy Pakistan. Product URL: ${productSlug}`
    const url = `https://wa.me/92${number}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  }

  return (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Select City:</h3>
        <div className="space-y-2">
          {cities.map((city) => (
            <label key={city.slug} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="city"
                value={city.slug}
                checked={selectedCity === city.slug}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="form-radio text-amber-600 focus:ring-amber-500"
              />
              <span className="text-gray-700">{city.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
          onClick={handleWhatsAppClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Order on WhatsApp
        </Button>
      </div>
    </>
  )
}
