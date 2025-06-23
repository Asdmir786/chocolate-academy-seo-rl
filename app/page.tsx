"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeHeader from "@/components/header"
import Footer from "@/components/footer"

// Product data organized by category
const productsByCategory = {
  cakes: [
    {
      name: "Caramel Cake",
      price: "Rs 2,000",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cadbury-cake-3OOjL9ZWdCfP9ef4tTPEpl3xQrfPhJ.webp",
    },
    {
      name: "Caramel Drip Cake",
      price: "Rs 2,000",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caramel-crunch-y2RHcz4P8Q3H4oXhkQgL5bBcA4AOnp.webp",
    },
    { name: "Honey Coffee Cake", price: "Rs 2,500", image: "/images/home/honey-coffe.webp" },
    { name: "Nutella Cake", price: "Rs 2,000", image: "/images/home/nutella-cake.webp" },
  ],
  bonbons: [
    {
      name: "Sugar And Spice",
      price: "Rs 850",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sugar-PKIMIg5hFSfvN8BUF5o1uw2lHAA8kL.webp",
    },
    {
      name: "Orange Bliss",
      price: "Rs 850",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orange-rush-bbJkITyiCsRNryJISBFFHljpg9QqUR.webp",
    },
    {
      name: "Coffee",
      price: "Rs 850",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-6mXbgHVwRqcSRk1rbe8gMJvXBsTMdu.webp",
    },
    {
      name: "Nutty Nut",
      price: "Rs 850",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nutty-nut-rZr3zadl7LHk6YpTxPRm5Ubne40FhK.webp",
    },
  ],
  "healthy-snacks": [
    {
      name: "Banana Milk Chocolate",
      price: "Rs 600",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banana-milk-choclate-Vy8Qv34luPCeWwUarFgU1eCUWRRKGC.webp",
    },
    { name: "Banana Milk Chocolate 2", price: "Rs 400", image: "/images/home/banana-milk-choclate-2.webp" },
    {
      name: "Dark Cashews",
      price: "Rs 600",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/chocolate-academy-master/public/images/products/dark-cashews-lmCA2uK8KIVPKCszHZGng3yhxTscCj.webp",
    },
    {
      name: "Biscotti",
      price: "Rs 600",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zip-blob/chocolate-academy-master/public/images/products/biscotti-o0ja3aE0dPN30YPMWxCJNROrMFy3PA.webp",
    },
  ],
}

// All products combined for the "all" tab
const allProducts = [
  ...productsByCategory.cakes.slice(0, 1),
  ...productsByCategory.bonbons.slice(0, 1),
  ...productsByCategory["healthy-snacks"].slice(0, 1),
  ...productsByCategory.cakes.slice(1, 2),
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("all")

  // Get products based on active tab
  const getProductsToDisplay = () => {
    switch (activeTab) {
      case "cakes":
        return productsByCategory.cakes
      case "bonbons":
        return productsByCategory.bonbons
      case "healthy-snacks":
        return productsByCategory["healthy-snacks"]
      default:
        return allProducts
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-banner-V1t8EGAoinENqvyRi6V8w3mJZJVU7f.webp"
          alt="Chocolate Academy Pakistan - Where Cocoa & Creativity Collide"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Where Cocoa & Creativity <span className="text-amber-400">Collide!</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              From cocoa beans to an art form to a delicious treat, we offer a wide range of chocolate making courses,
              workshops and events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" passHref legacyBehavior>
                <Button className="bg-white text-[#3c2415] hover:bg-amber-100 text-base px-6 py-6">
                  DISCOVER MORE
                </Button>
              </Link>
              <Link href="/shop" passHref legacyBehavior>
                <Button className="bg-amber-400 text-[#3c2415] hover:bg-amber-500 text-base px-6 py-6">
                  ORDER NOW
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full pointer-events-none">
            <path
              fill="#fdf6f0"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3c2415]">Our Chocolate Collections</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Discover our exquisite range of handcrafted chocolates, made with the finest ingredients and passion for
              the art of chocolate making.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/color-babon-wS4fmu4f9EBr6Alc4lumscpjiiaCQt.webp"
                  alt="Assortment of vibrant colored chocolate bonbons"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">Colored Bonbons</h3>
                    <Link
                      href="/shop"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cakes-cvDnJSdtYmsIh7DKObBZc6xRLAjJVL.webp"
                  alt="Delicious chocolate cakes from Chocolate Academy"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">Cakes</h3>
                    <Link
                      href="/shop"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chocolate-bonbons-qKVP70uxTAlVLlez0OSJgtXf2AACAm.webp"
                  alt="Handcrafted gourmet chocolate bonbons"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">Chocolate Bonbons</h3>
                    <Link
                      href="/shop"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Gifts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#3c2415] rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-80 md:h-96">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chocolate-gifts-ul6vsDt06EQyKk3eNXPqbvNGWknpps.webp"
                alt="Exquisite luxury chocolate gift box for special occasions"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Chocolate Gifts & Luxury Presents</h2>
              <p className="mb-6">
                Whether you're looking for that chocolate gift for a special occasion, like a birthday, anniversary, or
                to say thank you, we have a wide range of luxury chocolate gifts to choose from.
              </p>
              <button className="relative bg-white text-[#3c2415] px-6 py-3 font-semibold transition-all duration-300 hover:bg-amber-400 hover:text-[#3c2415] group">
                <div className="absolute inset-0 border-2 border-[#3c2415] rounded-sm"></div>
                <div className="absolute inset-1 border border-[#3c2415] rounded-sm"></div>
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#3c2415]"></div>
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[#3c2415]"></div>
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[#3c2415]"></div>
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#3c2415]"></div>
                <Link href="/gifting" className="relative z-10">
                  EXPLORE OUR GIFTS
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gifting Categories */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#3c2415]">Perfect for Every Occasion</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              From corporate events to weddings and birthdays, our chocolate gifts are designed to make every occasion
              special.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/corporate-gifting-7mev5oaQhipXPvu1Q5hwHMvkpgbqXr.webp"
                  alt="Elegant chocolate gifts for corporate events and clients"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">CORPORATE GIFTING</h3>
                    <Link
                      href="/gifting/corporate"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wedding-gifting-UT8hbxVM0sbSzwWhDfACCgFSqwcOdS.webp"
                  alt="Custom chocolate wedding favors and bridal gifts"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">WEDDING GIFTING</h3>
                    <Link
                      href="/gifting/wedding"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="group overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/birthdays-Qv7yLpZpbAV7p9OImWPWApr8XLYCvD.webp"
                  alt="Delicious chocolate birthday cakes and gifts"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-semibold text-white mb-2">BIRTHDAYS</h3>
                    <Link
                      href="/gifting/birthday"
                      className="inline-block text-amber-400 hover:text-amber-300 transition-colors duration-300"
                    >
                      LEARN MORE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Sugar And Spice",
                price: "Rs 650",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sugar-PKIMIg5hFSfvN8BUF5o1uw2lHAA8kL.webp",
              },
              {
                name: "Orange Bliss",
                price: "Rs 650",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/orange-rush-bbJkITyiCsRNryJISBFFHljpg9QqUR.webp",
              },
              {
                name: "Coffee",
                price: "Rs 650",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/coffee-6mXbgHVwRqcSRk1rbe8gMJvXBsTMdu.webp",
              },
              {
                name: "Nutty Nut",
                price: "Rs 650",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nutty-nut-rZr3zadl7LHk6YpTxPRm5Ubne40FhK.webp",
              },
            ].map((product, index) => (
              <div key={index} className="text-center group">
                <Link href="/shop" className="block">
                  <div className="bg-white rounded-full p-4 mb-4 mx-auto w-48 h-48 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-[#3c2415]">{product.name}</h3>
                  <p className="text-gray-700 mb-2">{product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooking Skills Section */}
      <section className="py-16 bg-[#b08968] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Are You Guys Ready To Upgrade</h2>
          <h2 className="text-3xl font-bold text-center mb-12">Your Cooking Skills?</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "One Day Training",
                desc: "Learn how to bake the most delicious cakes and pastries",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/one-day-3qPc9xdI6nZ4j4VgfFPX4i3P39N018.webp",
                price: "PKR 5,000",
              },
              {
                title: "Chocolate Pie Course",
                desc: "Learn how to make the perfect chocolate pie",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chocolate-fun-cNuPuej32WbWs9xBu1dlPe2Jq2wKau.webp",
                price: "PKR 3,000",
              },
              {
                title: "Pizza Workshop",
                desc: "Learn how to make authentic Italian pizza from scratch",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pizza-course-SYMHnw1610FOsrZFk6Pwx3oyfidR5p.webp",
                price: "PKR 4,000",
              },
              {
                title: "French Pastry Workshop",
                desc: "Learn the art of French pastry making",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastry-course-Fp1gJoJ36tXuMp1OjKOcYqYnBbXHpX.webp",
                price: "PKR 6,000",
              },
            ].map((course, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={`One Day Training: ${course.title}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white text-black hover:bg-white hover:text-[#b08968]"
                    >
                      <Link href="/courses/workshops">VIEW DETAILS</Link>
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm mb-3">{course.desc}</p>
                <p className="font-bold mb-3">{course.price}</p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-white  text-black hover:bg-white hover:text-[#b08968]"
                >
                  <Link href="/courses/register">REGISTER NOW</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">New Arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Salted Caramel Cake",
                price: "Rs 2,500",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/salte-caramel-cake-2TtLX9yyixLcHZlQZfnP4AP9iA1WUN.webp",
              },
              {
                name: "Lotus Cake",
                price: "Rs 3,000",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lotus-cake-fFPJZz53aYaj216Z9SShYVIDpDaRPB.webp",
              },
              {
                name: "Honey Coffee Cake",
                price: "Rs 2,800",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/honey-coffee-cake-6Zr8a3wIoO7KZmyzQNGGoJFnT5vBmx.webp",
              },
            ].map((product, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg shadow-md">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white text-white hover:bg-white hover:text-[#3c2415]"
                    >
                      <Link href={`/shop/${product.name.toLowerCase().replace(/ /g, "-")}`}>VIEW DETAILS</Link>
                    </Button>
                  </div>
                </div>
                <h3 className="font-semibold text-[#3c2415]">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.price}</p>
                <div className="flex justify-center">
                  <Link
                    href={`/shop/${product.name.toLowerCase().replace(/ /g, "-")}`}
                    className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#3c2415] hover:text-white hover:border-[#3c2415] transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grand-diploma-tjliOC9HQrqNW6lAW9sG4UyTdveBYf.webp"
                  alt="Grand Diploma in Chocolate & Pastry program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#3c2415]">Excited Diploma in Chocolate & Pastry</h3>
                <p className="text-gray-700 mb-4">
                  Join our comprehensive diploma program and master the art of chocolate and pastry making under the
                  guidance of expert chefs.
                </p>
                <Button asChild className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">
                  <Link href="/courses/intensive-programs">LEARN MORE</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kids-diploma-I8OuYOuSB1PzaouRGQkYO39gKrnn9n.webp"
                  alt="Kids Chocolate Making and Baking Workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#3c2415]">Kids Foundry & Baking Workshop</h3>
                <p className="text-gray-700 mb-4">
                  A fun and educational workshop designed specifically for kids to learn the basics of chocolate making
                  and baking.
                </p>
                <Button asChild className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">
                  <Link href="/courses/intensive-programs">LEARN MORE</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#3c2415]">All Products</h2>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-[#e9d8c9]">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white hover:bg-[#3c2415]/80 hover:text-white"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="cakes"
                className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white hover:bg-[#3c2415]/80 hover:text-white"
              >
                Cakes
              </TabsTrigger>
              <TabsTrigger
                value="bonbons"
                className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white hover:bg-[#3c2415]/80 hover:text-white"
              >
                Bonbons
              </TabsTrigger>
              <TabsTrigger
                value="healthy-snacks"
                className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white hover:bg-[#3c2415]/80 hover:text-white"
              >
                Healthy Snacks
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {getProductsToDisplay().map((product, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative h-64 mb-4 overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="rounded-full border-white text-white hover:bg-white hover:text-[#3c2415]"
                        >
                          <Link href={`/shop/${product.name.toLowerCase().replace(/ /g, "-")}`}>VIEW DETAILS</Link>
                        </Button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#3c2415]">{product.name}</h3>
                    <p className="text-gray-700 mb-2">{product.price}</p>
                    <div className="flex justify-center">
                      <Link
                        href={`/shop/${product.name.toLowerCase().replace(/ /g, "-")}`}
                        className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-[#3c2415] hover:text-white hover:border-[#3c2415] transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* Gram Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#3c2415]">We Love The 'Gram</h2>
          <p className="text-sm text-gray-600 mb-4">@chocolateacademypakistan</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
