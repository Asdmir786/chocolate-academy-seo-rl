import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Birthday Gifting",
  description:
    "Make birthdays unforgettable with Chocolate Academy Pakistan's premium chocolate gifts. Decadent cakes, assorted gift boxes, and custom chocolate letters for all ages.",
  keywords: [
    "Birthday Chocolate Gifts Pakistan",
    "Custom Birthday Cakes Lahore",
    "Chocolate Gift Boxes Birthday",
    "Personalized Chocolate Gifts",
    "Birthday Treats",
    "Gifts for Kids Teens Adults",
  ],
  openGraph: {
    title: "Birthday Gifting | Chocolate Academy Pakistan",
    description:
      "Make birthdays unforgettable with Chocolate Academy Pakistan's premium chocolate gifts. Decadent cakes, assorted gift boxes, and custom chocolate letters for all ages.",
    url: "https://chocolateacademy.com.pk/gifting/birthday",
    images: [
      {
        url: "/images/Birthday-Gifts.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Birthday Chocolate Gifts",
      },
    ],
    type: "website",
  },
}

export default function BirthdayGiftingPage() {
  const birthdayProducts = [
    {
      name: "Chocolate Birthday Cake",
      description: "Decadent chocolate cake with premium chocolate ganache and custom birthday message.",
      price: "Rs. 3,500 - Rs. 6,000",
      image: "/images/gifting/birthday-product1.png",
    },
    {
      name: "Birthday Gift Box",
      description: "Assorted chocolates in a festive gift box, perfect for celebrating special birthdays.",
      price: "Rs. 2,500 - Rs. 4,500",
      image: "/images/gifting/birthday-product2.png",
    },
    {
      name: "Chocolate Letters & Numbers",
      description: "Custom chocolate letters or numbers to celebrate milestone birthdays.",
      price: "Rs. 1,500 - Rs. 3,000",
      image: "/images/gifting/birthday-product3.png",
    },
    {
      name: "Birthday Chocolate Hamper",
      description: "Luxury hamper with chocolates, cookies, and treats for an unforgettable birthday surprise.",
      price: "Rs. 5,000 - Rs. 8,000",
      image: "/images/gifting/birthday-product4.png",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image
          src="/images/Birthday-Gifts.jpg"
          alt="Birthday Gifting"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Birthday Gifting</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/gifting" className="hover:text-amber-400 transition-colors">
              Gifting
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Birthday</span>
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
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/Birthday-Gifts.jpg" alt="Birthday Gifting" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Celebrate Special Moments with Chocolate</h2>
              <p className="text-gray-700 mb-4">
                Make birthdays unforgettable with our premium chocolate gifts. From decadent cakes to personalized
                chocolate arrangements, we offer a range of options to help you celebrate your loved ones in style.
              </p>
              <p className="text-gray-700 mb-6">
                Our birthday collection features festive designs and delicious flavors that are sure to delight
                recipients of all ages. Each gift is carefully crafted with premium ingredients and beautifully
                presented for a memorable birthday surprise.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/923248842000?text=Hello,%20I'm%20interested%20in%20birthday%20gifting%20options%20from%20Chocolate%20Academy%20Pakistan."
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
                  View All Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Products */}
      {/* <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3c2415]">Birthday Chocolate Collection</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {birthdayProducts.map((product, index) => (
              <div key={index} className="bg-[#fdf6f0] rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="relative h-64 md:h-auto md:w-1/2">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6 md:w-1/2">
                  <h3 className="text-xl font-bold mb-2 text-[#3c2415]">{product.name}</h3>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <p className="text-amber-800 font-bold mb-4">{product.price}</p>
                  <a
                    href={`https://wa.me/923294329451?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20for%20a%20birthday%20gift.`}
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

      {/* Age-Specific Gifts */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Gifts for Every Age</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">Kids</span>
              </div>
              <h3 className="text-xl font-bold mb-3">For Children</h3>
              <p className="mb-4">Fun and colorful chocolate treats that will delight children of all ages.</p>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Chocolate lollipops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Character chocolates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Fun shapes and colors</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">Teens</span>
              </div>
              <h3 className="text-xl font-bold mb-3">For Teenagers</h3>
              <p className="mb-4">Trendy chocolate gifts that appeal to teenage tastes and preferences.</p>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Chocolate gift boxes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Chocolate bars with messages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Modern designs</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">Adults</span>
              </div>
              <h3 className="text-xl font-bold mb-3">For Adults</h3>
              <p className="mb-4">Sophisticated chocolate gifts for discerning adult palates.</p>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Premium assortments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Artisanal bonbons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Elegant packaging</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#5a3a28] p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl font-bold">Milestone</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Milestone Birthdays</h3>
              <p className="mb-4">Special gifts to celebrate significant birthday milestones.</p>
              <ul className="text-left space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Custom age designs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Luxury gift hampers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">✓</span>
                  <span>Personalized messages</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Orders */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Custom Birthday Orders</h2>
              <p className="text-gray-700 mb-4 ">
                Looking for something unique? We specialize in creating custom chocolate gifts tailored to the birthday
                person's preferences and interests.
              </p>
              <p className="text-gray-700 mb-6">
                From chocolate sculptures to personalized messages, our team can bring your ideas to life. Contact us to
                discuss your custom birthday gift requirements.
              </p>

              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Custom Order Process</h3>
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#3c2415] rounded-full flex items-center justify-center mr-3 text-white font-bold shrink-0">
                      1
                    </span>
                    <span className="text-gray-700">Contact us with your requirements and ideas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#3c2415] rounded-full flex items-center justify-center mr-3 text-white font-bold shrink-0">
                      2
                    </span>
                    <span className="text-gray-700">Our team will provide design options and pricing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#3c2415] rounded-full flex items-center justify-center mr-3 text-white font-bold shrink-0">
                      3
                    </span>
                    <span className="text-gray-700">Approve the final design and place your order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 bg-[#3c2415] rounded-full flex items-center justify-center mr-3 text-white font-bold shrink-0">
                      4
                    </span>
                    <span className="text-gray-700">Receive your custom birthday gift on your preferred date</span>
                  </li>
                </ol>
              </div>

              <a
                href="https://wa.me/923248842000?text=Hello,%20I'd%20like%20to%20inquire%20about%20a%20custom%20birthday%20gift%20from%20Chocolate%20Academy%20Pakistan."
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
                  Inquire About Custom Orders
                </Button>
              </a>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/gifting/birthday-custom.png"
                alt="Custom Birthday Gifts"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
