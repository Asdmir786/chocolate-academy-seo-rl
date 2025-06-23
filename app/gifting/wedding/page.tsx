import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wedding Gifting",
  description:
    "Add elegance to your wedding with Chocolate Academy Pakistan's premium chocolate favors and gifts. Personalized packaging, custom flavors, and stunning displays for your special day.",
  keywords: [
    "Wedding Chocolate Favors Pakistan",
    "Custom Wedding Chocolates",
    "Bridal Party Gifts",
    "Chocolate Centerpieces Wedding",
    "Personalized Wedding Favors",
    "Luxury Wedding Gifts",
  ],
  openGraph: {
    title: "Wedding Gifting | Chocolate Academy Pakistan",
    description:
      "Add elegance to your wedding with Chocolate Academy Pakistan's premium chocolate favors and gifts. Personalized packaging, custom flavors, and stunning displays for your special day.",
    url: "https://chocolateacademy.com.pk/gifting/wedding",
    images: [
      {
        url: "/images/Wedding-Gifts.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Wedding Chocolate Favors",
      },
    ],
    type: "website",
  },
}

export default function WeddingGiftingPage() {
  const weddingProducts = [
    {
      name: "Luxury Wedding Favor Boxes",
      description: "Elegant favor boxes with premium chocolates, customized with the couple's names and wedding date.",
      price: "Rs. 800 - Rs. 1,500 per box",
      image: "/images/gifting/wedding-product1.png",
    },
    {
      name: "Bridal Party Gift Sets",
      description: "Special chocolate assortments for the bridal party, beautifully packaged in premium gift boxes.",
      price: "Rs. 3,000 - Rs. 5,000 per set",
      image: "/images/gifting/wedding-product2.png",
    },
    {
      name: "Chocolate Centerpieces",
      description: "Stunning chocolate displays that serve as both decoration and delicious treats for your guests.",
      price: "Rs. 5,000 - Rs. 10,000",
      image: "/images/gifting/wedding-product3.png",
    },
    {
      name: "Thank You Gift Boxes",
      description: "Express gratitude to special guests with these elegant chocolate gift boxes.",
      price: "Rs. 2,000 - Rs. 4,000",
      image: "/images/gifting/wedding-product4.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/Wedding-Gifts.jpg"
          alt="Wedding Gifting"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wedding Gifting</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/gifting" className="hover:text-amber-400 transition-colors">
              Gifting
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Wedding</span>
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

      {/* Intro Section */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Make Your Special Day Even Sweeter</h2>
              <p className="text-gray-700 mb-4">
                Add a touch of elegance and sweetness to your wedding celebration with our premium chocolate favors and
                gifts. Our wedding collection is designed to complement your special day with exquisite flavors and
                beautiful presentation.
              </p>
              <p className="text-gray-700 mb-6">
                From personalized favor boxes to stunning chocolate displays, we offer a range of options to suit your
                wedding theme and budget. Our team works closely with you to create custom chocolate gifts that will
                delight your guests and make your wedding day unforgettable.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/923248842000?text=Hello,%20I'm%20interested%20in%20wedding%20gifting%20options%20from%20Chocolate%20Academy%20Pakistan."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
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
                    Inquire on WhatsApp
                  </Button>
                </a>
                <Button variant="outline" className="border-[#3c2415]  hover:bg-[#3c2415] hover:text-white">
                  Schedule Consultation
                </Button>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl order-1 md:order-2">
              <Image src="/images/Wedding-Gifts.jpg" alt="Wedding Gifting" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Products */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">Wedding Chocolate Collection</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingProducts.map((product, index) => (
              <div key={index} className="bg-[#fdf6f0] rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-xl font-bold mb-2 text-[#3c2415]">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-amber-800 font-bold mb-4">{product.price}</p>
                  <a
                    href={`https://wa.me/923294329451?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20for%20my%20wedding.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">Inquire Now</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Customization Options */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customization Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#5a3a28] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-2 text-white">
                  1
                </span>
                Personalized Packaging
              </h3>
              <p className="mb-4">
                Add your names, wedding date, or monogram to our elegant packaging options. Choose from a variety of
                colors to match your wedding theme.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Custom ribbon colors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Personalized tags</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Monogram options</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-2 text-white">
                  2
                </span>
                Flavor Selection
              </h3>
              <p className="mb-4">
                Choose from our extensive range of chocolate flavors to create a custom assortment that reflects your
                taste preferences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Classic and exotic flavors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Dietary options available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Seasonal specialties</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center mr-2 text-white">
                  3
                </span>
                Presentation Options
              </h3>
              <p className="mb-4">
                From individual favor boxes to elaborate displays, we offer various presentation options to suit your
                wedding style.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Tiered displays</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Gift table arrangements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Place setting favors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">What Our Couples Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#3c2415">
                  <path d="M11.3 6.2H9.8c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2zm8.7 0h-1.5c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2z"></path>
                </svg>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "The chocolate favors were the highlight of our wedding! Our guests couldn't stop talking about how
                beautiful and delicious they were. The Chocolate Academy team was a pleasure to work with from start to
                finish."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#3c2415] rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-white">S&A</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#3c2415]">Sara & Ahmed</h4>
                  <p className="text-amber-800 text-sm">Wedding in Lahore, 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#3c2415">
                  <path d="M11.3 6.2H9.8c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2z"></path>
                </svg>
              </div>
              <p className="mb-4 text-gray-700 italic">
                "We ordered custom chocolate favors for our wedding and they exceeded our expectations. The attention to
                detail was impressive and they perfectly matched our wedding colors. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#3c2415] rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-white">M&F</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#3c2415]">Malik & Fatima</h4>
                  <p className="text-amber-800 text-sm">Wedding in Islamabad, 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-6 text-[#3c2415]">Ready to sweeten your wedding day?</h3>
            <a
              href="https://wa.me/923248842000?text=Hello,%20I'd%20like%20to%20discuss%20wedding%20favors%20from%20Chocolate%20Academy%20Pakistan."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white">
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
                Contact Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
