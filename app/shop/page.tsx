import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Our Products",
  description:
    "Discover Chocolate Academy Pakistan's exquisite range of handcrafted chocolates, cakes, bonbons, healthy snacks, and more. Order online for premium quality treats.",
  keywords: [
    "Buy Chocolates Online Pakistan",
    "Gourmet Cakes Lahore",
    "Artisan Bonbons Karachi",
    "Healthy Chocolate Snacks",
    "Chocolate Shop Pakistan",
    "Premium Desserts",
    "Online Chocolate Store",
  ],
  openGraph: {
    title: "Shop Our Products | Chocolate Academy Pakistan",
    description:
      "Discover Chocolate Academy Pakistan's exquisite range of handcrafted chocolates, cakes, bonbons, healthy snacks, and more. Order online for premium quality treats.",
    url: "https://chocolateacademy.com.pk/shop",
    images: [
      {
        url: "/images/shop.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Products",
      },
    ],
    type: "website",
  },
}

export default function ShopPage() {
  // Group products by category
  const productsByCategory = products.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, typeof products>,
  )

  const categories = Object.keys(productsByCategory)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/shop.jpg" alt="Chocolate Shop" fill className="object-cover brightness-75" priority />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Shop</span>
          </div>
        </div>
        {/* Decorative chocolate drip */}
        <div className="absolute -bottom-3 left-0 w-full overflow-hidden h-3">
          <div
            className="w-full h-12"
            style={{
              backgroundImage: "url('/images/chocolate-drip.png')",
              backgroundSize: "contain",
              backgroundRepeat: "repeat-x",
            }}
          ></div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-bold mb-4 text-[#3c2415] relative inline-block">
                  Categories
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <a
                        href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center text-[#3c2415] hover:text-amber-800 transition-colors py-1"
                      >
                        <span className="mr-2 text-amber-800">❯</span>
                        {category} ({productsByCategory[category].length})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {categories.map((category) => (
                <div key={category} id={category.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-[#3c2415] relative inline-block">
                    {category}
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productsByCategory[category].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 relative inline-block">
            Featured Products
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-amber-400"></span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((product) => product.featured)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}
