import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Corporate Gifting",
  description:
    "Elevate your corporate relationships with Chocolate Academy Pakistan's premium corporate chocolate gifts. Custom-branded chocolates, elegant gift boxes, and hampers for clients and employees.",
  keywords: [
    "Corporate Chocolate Gifts Pakistan",
    "Branded Chocolates",
    "Employee Appreciation Gifts",
    "Business Gifts Chocolate",
    "Custom Corporate Hampers",
    "Client Gifts Pakistan",
  ],
  openGraph: {
    title: "Corporate Gifting | Chocolate Academy Pakistan",
    description:
      "Elevate your corporate relationships with Chocolate Academy Pakistan's premium corporate chocolate gifts. Custom-branded chocolates, elegant gift boxes, and hampers for clients and employees.",
    url: "https://chocolateacademy.com.pk/gifting/corporate",
    images: [
      {
        url: "/images/Corporate-Gifts.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Corporate Chocolate Gifts",
      },
    ],
    type: "website",
  },
}

export default function CorporateGiftingPage() {
  const corporateProducts = [
    {
      name: "Executive Gift Box",
      description: "Premium assorted chocolates in an elegant box, perfect for executives and VIP clients.",
      price: "Rs. 5,000 - Rs. 10,000",
      image: "/images/gifting/corporate-product1.png",
    },
    {
      name: "Branded Chocolate Bars",
      description: "Custom chocolate bars with your company logo, ideal for events and promotions.",
      price: "Rs. 800 - Rs. 1,500 per piece",
      image: "/images/gifting/corporate-product2.png",
    },
    {
      name: "Corporate Hamper",
      description: "Luxury hamper with chocolates, cookies, and premium treats for special business occasions.",
      price: "Rs. 8,000 - Rs. 15,000",
      image: "/images/gifting/corporate-product3.png",
    },
    {
      name: "Employee Appreciation Box",
      description: "Thoughtful chocolate assortments to recognize and reward your team members.",
      price: "Rs. 2,500 - Rs. 4,000",
      image: "/images/gifting/corporate-product4.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/Corporate-Gifts.jpg"
          alt="Corporate Gifting"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Corporate Gifting</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/gifting" className="hover:text-amber-400 transition-colors">
              Gifting
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Corporate</span>
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
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Elevate Your Corporate Relationships</h2>
              <p className="text-gray-700 mb-4">
                Make a lasting impression on clients, partners, and employees with our premium corporate chocolate
                gifts. Our corporate gifting solutions are designed to reflect your company's values and strengthen your
                business relationships.
              </p>
              <p className="text-gray-700 mb-6">
                From custom-branded chocolates to elegant gift boxes, we offer a range of options to suit your corporate
                gifting needs. Our team works closely with you to create personalized gifts that align with your brand
                identity and budget.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/923248842000?text=Hello,%20I'm%20interested%20in%20corporate%20gifting%20options%20from%20Chocolate%20Academy%20Pakistan."
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
                <Button variant="outline" className="border-[#3c2415] hover:bg-[#3c2415] hover:text-white">
                  Download Brochure
                </Button>
              </div>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/Corporate-Gifts.jpg" alt="Corporate Gifting" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Products */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">Our Corporate Offerings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {corporateProducts.map((product, index) => (
              <div key={index} className="bg-[#fdf6f0] rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-xl font-bold mb-2 text-[#3c2415]">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-amber-800 font-bold mb-4">{product.price}</p>
                  <a
                    href={`https://wa.me/923294329451?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20for%20corporate%20gifting.`}
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

      {/* Benefits */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Corporate Gifts</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5 5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Brand Recognition</h3>
              <p>
                Custom-branded chocolates and packaging help increase brand visibility and recognition among clients and
                partners.
              </p>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Memorable Impression</h3>
              <p>Premium chocolates create a lasting impression that sets your company apart from competitors.</p>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Relationship Building</h3>
              <p>Thoughtful gifts strengthen business relationships and show appreciation for clients and employees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#3c2415]">Trusted By Leading Companies</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-32">
                <Image
                  src={`/images/gifting/client${num}.png`}
                  alt={`Corporate Client ${num}`}
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-[#3c2415]">Ready to place a corporate order?</h3>
            <a
              href="https://wa.me/923248842000?text=Hello,%20I'd%20like%20to%20discuss%20a%20corporate%20order%20for%20Chocolate%20Academy%20Pakistan."
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
