"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { Eye, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { trackWhatsAppClick } from "@/lib/analytics"

export type CityOption = { name: string; slug: string; whatsapp_number: string }

interface ProductCardProps {
  product: Product
  cities?: CityOption[]
}

// Fallback cities used when no DB-driven cities are passed in
const defaultCities: CityOption[] = [
  { name: "Lahore", slug: "lahore", whatsapp_number: "0309-3336142" },
  { name: "Islamabad", slug: "islamabad", whatsapp_number: "0326-8079985" },
  { name: "Karachi", slug: "karachi", whatsapp_number: "0333-6669828" },
  { name: "Faisalabad", slug: "faisalabad", whatsapp_number: "0309-7778646" },
  { name: "Rawalpindi", slug: "rawalpindi", whatsapp_number: "0309-3336144" },
]

export default function ProductCard({ product, cities }: ProductCardProps) {
  const cityList = cities && cities.length > 0 ? cities : defaultCities
  const [modalOpen, setModalOpen] = useState(false)
  const whatsappMessage = `Hello, I'm interested in the ${product.name} from Chocolate Academy Pakistan.`

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setModalOpen(true)
  }

  const handleCitySelect = (city: CityOption) => {
    setModalOpen(false)

    // Track this click
    trackWhatsAppClick({
      productId: product.id.toString(),
      productName: product.name,
      city: city.slug,
      source: "product_card",
      buttonLocation: "product_card_whatsapp_button",
    })

    const number = city.whatsapp_number.replace(/[-\s]/g, "")
    const url = `https://wa.me/92${number}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  }

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            New
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link href={`/shop/${product.slug}`}>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-white text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-white text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < product.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
            />
          ))}
        </div>
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-semibold text-[#3c2415] mb-1 transition-colors group-hover:text-amber-800">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-amber-800 font-bold">
                  Rs. {((product.price * (100 - product.discount)) / 100).toLocaleString()}
                </span>
                <span className="text-gray-500 text-sm line-through">Rs. {product.price.toLocaleString()}</span>
              </div>
            ) : (
              <span className="text-amber-800 font-bold">Rs. {product.price.toLocaleString()}</span>
            )}
          </div>
          <a href="#" onClick={handleWhatsappClick}>
            <Button
              size="sm"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white h-8 w-8 p-0 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </Button>
          </a>
        </div>
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-xs text-center">
          <h3 className="text-lg font-bold mb-4">Select Your City</h3>
          <div className="flex flex-col gap-2">
            {cityList.map((city) => (
              <Button key={city.slug} variant="outline" onClick={() => handleCitySelect(city)}>
                {city.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
