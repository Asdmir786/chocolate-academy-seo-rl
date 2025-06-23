import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore the Chocolate Academy Pakistan gallery showcasing exquisite chocolate creations, student work, and academy facilities. Get inspired by the art of chocolate and pastry.",
  keywords: [
    "Chocolate Academy Gallery",
    "Chocolate Art Images",
    "Pastry Creations Photos",
    "Student Work Chocolate",
    "Culinary School Gallery",
    "Chocolate Photography",
  ],
  openGraph: {
    title: "Our Gallery | Chocolate Academy Pakistan",
    description:
      "Explore the Chocolate Academy Pakistan gallery showcasing exquisite chocolate creations, student work, and academy facilities. Get inspired by the art of chocolate and pastry.",
    url: "https://chocolateacademy.com.pk/gallery",
    images: [
      {
        url: "/images/Our-Gallery.jpg", // Use a relevant image for the Gallery page
        width: 1200,
        height: 630,
        alt: "Chocolate Academy Gallery",
      },
    ],
    type: "website",
  },
}
// Gallery categories and images
const galleryCategories = [
  {
    id: "all",
    name: "All",
  },
  {
    id: "chocolate-creations",
    name: "Chocolate Creations",
  },
  {
    id: "workshops",
    name: "Workshops & Classes",
  },
  {
    id: "events",
    name: "Events & Exhibitions",
  },
  {
    id: "behind-scenes",
    name: "Behind the Scenes",
  },
]

// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "/images/gallery/chocolate-creation-1.png",
    alt: "Chocolate Bonbons Assortment",
    category: "chocolate-creations",
    featured: true,
  },
  {
    id: 2,
    src: "/images/gallery/chocolate-creation-2.png",
    alt: "Chocolate Cake with Decorations",
    category: "chocolate-creations",
  },
  {
    id: 3,
    src: "/images/gallery/chocolate-creation-3.png",
    alt: "Artisan Chocolate Truffles",
    category: "chocolate-creations",
  },
  {
    id: 4,
    src: "/images/gallery/workshop-1.png",
    alt: "Chocolate Making Workshop",
    category: "workshops",
    featured: true,
  },
  {
    id: 5,
    src: "/images/gallery/workshop-2.png",
    alt: "Pastry Class in Progress",
    category: "workshops",
  },
  {
    id: 6,
    src: "/images/gallery/workshop-3.png",
    alt: "Children's Baking Class",
    category: "workshops",
  },
  {
    id: 7,
    src: "/images/gallery/event-1.png",
    alt: "Chocolate Festival Display",
    category: "events",
  },
  {
    id: 8,
    src: "/images/gallery/event-2.png",
    alt: "Corporate Chocolate Tasting",
    category: "events",
    featured: true,
  },
  {
    id: 9,
    src: "/images/gallery/event-3.png",
    alt: "Wedding Chocolate Display",
    category: "events",
  },
  {
    id: 10,
    src: "/images/gallery/behind-scenes-1.png",
    alt: "Chocolate Tempering Process",
    category: "behind-scenes",
  },
  {
    id: 11,
    src: "/images/gallery/behind-scenes-2.png",
    alt: "Chef Creating Chocolate Sculpture",
    category: "behind-scenes",
    featured: true,
  },
  {
    id: 12,
    src: "/images/gallery/behind-scenes-3.png",
    alt: "Ingredient Selection Process",
    category: "behind-scenes",
  },
  {
    id: 13,
    src: "/images/gallery/chocolate-creation-4.png",
    alt: "Chocolate Showpiece",
    category: "chocolate-creations",
  },
  {
    id: 14,
    src: "/images/gallery/workshop-4.png",
    alt: "Advanced Pastry Techniques Class",
    category: "workshops",
  },
  {
    id: 15,
    src: "/images/gallery/event-4.png",
    alt: "Chocolate Academy Anniversary Celebration",
    category: "events",
  },
  {
    id: 16,
    src: "/images/gallery/behind-scenes-4.png",
    alt: "Quality Control Testing",
    category: "behind-scenes",
  },
]

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/Our-Gallery.jpg"
          alt="Chocolate Academy Gallery"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Gallery</span>
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

      {/* Instagram Grid */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Follow Us On Instagram</h2>
          <p className="mb-8 text-[#3c2415]">
            See our latest creations, events, and behind-the-scenes moments on our official Instagram page.
          </p>
          {/* Elfsight Instagram Feed Widget */}
          <div className="flex justify-center">
            <div className="elfsight-app-ea561d69-bb22-4ce5-bee8-57a85da9e875" data-elfsight-app-lazy></div>
          </div>
          <div className="mt-8">
            <a
              href="https://www.instagram.com/chocolateacademypak"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#3c2415] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5a3a28] transition"
            >
              Visit @chocolateacademypak on Instagram
            </a>
          </div>
        </div>
        {/* Elfsight platform script */}
        <script src="https://static.elfsight.com/platform/platform.js" async></script>
      </section>

      <Footer />
    </div>
  )
}
