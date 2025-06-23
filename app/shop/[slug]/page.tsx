"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { useState } from "react"
import { trackWhatsAppClick } from "@/lib/analytics"

const cityNumbers = {
  lahore: "0309-3336142",
  islamabad: "0326-8079985",
  karachi: "0333-6669828",
  faisalabad: "0309-7778646",
  rawalpindi: "0309-3336144",
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [selectedCity, setSelectedCity] = useState("lahore")
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleWhatsAppClick = (city: string) => {
    // Track this click
    trackWhatsAppClick({
      productId: product.id.toString(),
      productName: product.name,
      city: city,
      source: "product_detail_page",
      buttonLocation: "product_detail_whatsapp_button",
    })

    const number = cityNumbers[city as keyof typeof cityNumbers].replace(/-/g, "")
    const whatsappMessage = `Hello, I'm interested in the ${product.name} from Chocolate Academy Pakistan. Product URL: ${product.slug}`
    const url = `https://wa.me/92${number}?text=${encodeURIComponent(whatsappMessage)}`
    window.open(url, "_blank")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Title Image with Centered Title and Breadcrumb */}
      <div className="w-full relative h-48 md:h-64 mb-4 flex items-center justify-center">
        <Image
          src="/images/shop.jpg" // Replace with your actual image path
          alt="Shop Page Title"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2 text-center">
            {product.name}
          </h1>
          <nav className="flex items-center space-x-2 text-lg">
            <Link href="/" className="text-white hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <Link href="/shop" className="text-white hover:text-amber-400 transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <Link
              href={`/shop#${product.category.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-white hover:text-amber-400 transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-5 w-5 text-white" />
            <span className="text-amber-400">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden h-[400px]">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                priority
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                <h1 className="text-3xl font-bold text-[#3c2415] mb-2">{product.name}</h1>
                <div className="text-2xl font-bold text-amber-800 mb-6">Rs. {product.price.toLocaleString()}</div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                {product.dietary && product.dietary.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Dietary:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.dietary.map((diet, index) => (
                        <span
                          key={index}
                          className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Select City:</h3>
                  <div className="space-y-2">
                    {Object.keys(cityNumbers).map((city) => (
                      <label key={city} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="city"
                          value={city}
                          checked={selectedCity === city}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="form-radio text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-gray-700 capitalize">{city}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center"
                    onClick={() => handleWhatsAppClick(selectedCity)}
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
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Order on WhatsApp
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <div className="flex">
                      <span className="text-gray-700 font-semibold w-24">Category:</span>
                      <span className="text-gray-600">{product.category}</span>
                    </div>
                    {product.weight && (
                      <div className="flex">
                        <span className="text-gray-700 font-semibold w-24">Weight:</span>
                        <span className="text-gray-600">{product.weight}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-[#3c2415] relative inline-block">
            Related Products
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
