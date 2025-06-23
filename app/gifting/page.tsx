import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronRight, Gift, Cake, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Gifting",
  description:
    "Elevate your special moments with Chocolate Academy Pakistan's signature chocolate boxes. Perfect for weddings, birthdays, corporate events, and custom gifting.",
  keywords: [
    "Chocolate Gifts Pakistan",
    "Luxury Chocolate Boxes",
    "Wedding Chocolate Favors",
    "Birthday Chocolate Gifts",
    "Corporate Chocolate Gifts",
    "Custom Chocolate Gifts",
    "Gourmet Chocolate",
  ],
  openGraph: {
    title: "Gifting | Chocolate Academy Pakistan",
    description:
      "Elevate your special moments with Chocolate Academy Pakistan's signature chocolate boxes. Perfect for weddings, birthdays, corporate events, and custom gifting.",
    url: "https://chocolateacademy.com.pk/gifting",
    images: [
      {
        url: "/images/Gifts.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Chocolate Gifting for All Occasions",
      },
    ],
    type: "website",
  },
}

export default function GiftingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/Gifts.jpg" alt="Chocolate Gifting" fill className="object-cover brightness-75" priority />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gifting</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Gifting</span>
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

      {/* Main Content */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#3c2415]">Events & Occasions</h2>
            <p className="text-[#3c2415]">
              Elevate your special moments with our signature chocolate boxes — thoughtfully crafted to add a touch of
              elegance and indulgence to any event. Personalize your celebrations with beautifully curated chocolate
              favor boxes that are wrapped in love and sophistication. Make every gathering memorable with Chocolate
              Academy Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Wedding Gifting */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image src="/images/gifting/wedding.webp" alt="Wedding Gifting" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Cake className="h-8 w-8 mb-2" />
                  <h3 className="text-xl font-bold">Wedding</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-[#3c2415]">
                  Make your wedding day even more special with our exquisite chocolate favors. Personalized to match
                  your wedding theme and colors, our chocolate gifts will leave a lasting impression on your guests.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#3c2415] hover:bg-[#5a3a28]">
                  <Link href="/gifting/wedding">Explore Wedding Gifts</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Birthday Gifting */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/images/gifting/birthday-gifting.webp"
                  alt="Birthday Gifting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Gift className="h-8 w-8 mb-2" />
                  <h3 className="text-xl font-bold">Birthday</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-[#3c2415]">
                  Celebrate birthdays with our delightful chocolate creations. From personalized chocolate messages to
                  themed gift boxes, we have everything to make the birthday person feel extra special.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#3c2415] hover:bg-[#5a3a28]">
                  <Link href="/gifting/birthday">Explore Birthday Gifts</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Corporate Gifting */}
            <Card className="bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image
                  src="/images/gifting/corporate-gifting.webp"
                  alt="Corporate Gifting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Briefcase className="h-8 w-8 mb-2" />
                  <h3 className="text-xl font-bold">Corporate</h3>
                </div>
              </div>
              <CardContent className="pt-6">
                <p className="text-[#3c2415]">
                  Impress your clients, partners, and employees with our premium corporate chocolate gifts. Customized
                  with your company logo and packaged elegantly, our corporate gifts are perfect for any business
                  occasion.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#3c2415] hover:bg-[#5a3a28]">
                  <Link href="/gifting/corporate">Explore Corporate Gifts</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Custom Gifting */}
          <div className="bg-white p-8 rounded-lg shadow-md mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#3c2415]">Custom Chocolate Gifts</h3>
                <p className="text-[#3c2415] mb-4">
                  Looking for something unique? We offer fully customized chocolate gifts tailored to your specific
                  requirements. Whether it's a special shape, flavor, or packaging design, our team can bring your
                  vision to life.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Personalized chocolate messages",
                    "Custom shapes and designs",
                    "Corporate branding and logos",
                    "Themed gift boxes",
                    "Bulk orders for events",
                    "Seasonal and holiday specials",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-800 mr-2">✓</span>
                      <span className="text-[#3c2415]">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="bg-[#3c2415] hover:bg-[#5a3a28]">
                  <Link href="/contact">Request Custom Order</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
                <Image src="/images/cocoa-beans.png" alt="Custom Chocolate Gifts" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-[#3c2415]">What Our Customers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah Ahmed",
                  role: "Wedding Client",
                  quote:
                    "The chocolate favors for our wedding were absolutely stunning! Our guests couldn't stop talking about how delicious they were. Thank you for making our special day even more memorable.",
                },
                {
                  name: "Imran Khan",
                  role: "Corporate Client",
                  quote:
                    "We ordered custom chocolate gifts with our company logo for our annual client appreciation event. The quality was exceptional, and the presentation was very professional. Highly recommended!",
                },
                {
                  name: "Ayesha Malik",
                  role: "Birthday Celebration",
                  quote:
                    "I ordered a custom chocolate gift box for my mother's 60th birthday. The team went above and beyond to create something truly special. The chocolates were not only beautiful but also delicious!",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-[#3c2415] text-lg">{testimonial.name}</CardTitle>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="italic text-[#3c2415]">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Process */}
          <div className="bg-[#3c2415] text-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">How to Order</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Contact Us",
                  description: "Reach out to us via phone, email, or our contact form to discuss your requirements.",
                },
                {
                  step: "2",
                  title: "Customization",
                  description: "Work with our team to customize your chocolate gifts according to your preferences.",
                },
                {
                  step: "3",
                  title: "Confirmation",
                  description: "Review and confirm your order details, including quantity, design, and delivery date.",
                },
                {
                  step: "4",
                  title: "Delivery",
                  description: "Sit back and relax as we prepare and deliver your chocolate gifts right on time.",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p className="text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild className="bg-amber-700 hover:bg-amber-600">
                <Link href="/contact">Start Your Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
