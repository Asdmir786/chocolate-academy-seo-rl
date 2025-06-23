import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Chocolate Academy Pakistan. Find our campus locations in Lahore, Rawalpindi, Islamabad, Karachi, Faisalabad, Sarai Alamgir, and DHA, contact information, and working hours.",
  keywords: [
    "Contact Chocolate Academy",
    "Chocolate Academy Pakistan Address",
    "Baking School Contact",
    "Culinary Institute Phone Number",
    "Lahore Chocolate Academy",
    "Karachi Pastry School",
  ],
  openGraph: {
    title: "Contact Us | Chocolate Academy Pakistan",
    description:
      "Get in touch with Chocolate Academy Pakistan. Find our campus locations in Lahore, Rawalpindi, Islamabad, Karachi, Faisalabad, Sarai Alamgir, and DHA, contact information, and working hours.",
    url: "https://chocolateacademy.com.pk/contact",
    images: [
      {
        url: "/images/contact-us.jpg", // Use a relevant image for the Contact page
        width: 1200,
        height: 630,
        alt: "Contact Chocolate Academy Pakistan",
      },
    ],
    type: "website",
  },
}

export default function ContactPage() {
  const campuses = [
    {
      name: "Lahore",
      address: "185, New Muslim Town Abu Bakar Block Garden Town, Lahore, 54000",
      phone: "0309-3336142",
      geo: { latitude: 31.5053049, longitude: 74.3329249 },
    },
    {
      name: "Rawalpindi",
      address: "57A Iran Rd, opposite PSO Pump, Block A Satellite Town, Rawalpindi, 43600",
      phone: "0309-3336144",
      geo: { latitude: 33.6007, longitude: 73.0679 }, // Approximate coordinates
    },
    {
      name: "Islamabad",
      address: "Plot No.14-B, 2nd Floor, Sadiq Plaza, Markaz, G-9 Markaz G 9 Markaz G-9, Islamabad, 44000",
      phone: "0326-8079985",
      geo: { latitude: 33.6789, longitude: 73.0479 }, // Approximate coordinates
    },
    {
      name: "Karachi",
      address: "F-22 Liaquat National Hospital Rd, near Tv Station, Dawood Society Dawood CHS, Karachi, 74800",
      phone: "0333-6669828",
      geo: { latitude: 24.8615, longitude: 67.0099 }, // Approximate coordinates
    },
    {
      name: "Faisalabad",
      address: "House No, 72 Officers Colony No. 1, Madina Town, Faisalabad",
      phone: "0309-7778646",
      geo: { latitude: 31.4187, longitude: 73.0791 }, // Approximate coordinates
    },
    {
      name: "Sarai Alamgir",
      address: "Al-Ghani Plaza, Main GT Rd, Sarai Alamgir, 50000",
      phone: "0300-8400376",
      geo: { latitude: 32.9007, longitude: 73.8596 }, // Approximate coordinates
    },
    {
      name: "DHA",
      address: "2nd Floor CSD Shopping Mall Cavalry Ground, Lahore",
      phone: "0309-3336142",
      geo: { latitude: 31.5053049, longitude: 74.3329249 }, // Same as Lahore main campus for simplicity
    },
  ]

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization", // Or LocalBusiness if more general
    name: "Chocolate Academy Pakistan",
    url: "https://chocolateacademy.com.pk/contact",
    logo: "https://chocolateacademy.com.pk/images/logo.png", // Replace with your actual logo URL
    description:
      "Chocolate Academy Pakistan offers professional chocolate and pastry courses, workshops, and gourmet chocolate gifts across multiple campuses in Pakistan.",
    address: campuses.map((campus) => ({
      "@type": "PostalAddress",
      streetAddress: campus.address.split(",")[0].trim(),
      addressLocality: campus.name,
      addressRegion: "Punjab", // Assuming all are in Punjab, adjust if needed
      postalCode: campus.address.split(",").pop()?.trim() || "",
      addressCountry: "PK",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+923093336142", // Main contact number
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5302959096513!2d74.33292491511566!3d31.505304981374592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f0a0f9b9c3%3A0x4b0e3a9f7a2b0e1a!2sChocolate%20Academy%20Pakistan!5e0!3m2!1sen!2s!4v1621234567890!5m2!1sen!2s",
    sameAs: [
      "https://www.facebook.com/chocolateacademypakistan", // Replace with actual social media links
      "https://www.instagram.com/chocolateacademypakistan",
      // Add Twitter, LinkedIn, etc.
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Add JSON-LD Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Page Banner */}
      <section className="relative h-[300px] overflow-hidden">
        <Image src="/images/contact-us.jpg" alt="Contact Us" fill className="object-cover brightness-75" priority />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Contact</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-[#3c2415]">Get In Touch</h2>
              <p className="mb-8 text-[#3c2415]">
                We'd love to hear from you! Whether you have a question about our courses, products, or services, our
                team is ready to assist you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#3c2415] p-3 rounded-full mr-4">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3c2415] mb-1">Email Us</h3>
                    <p className="text-[#3c2415]">courses@chocolateacademy.com.pk</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#3c2415] p-3 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3c2415] mb-1">Working Hours</h3>
                    <p className="text-[#3c2415]">Monday – Friday: 9:00 AM to 6:00 PM</p>
                    <p className="text-[#3c2415]">Saturday: 9:00 AM to 5:00 PM</p>
                    <p className="text-[#3c2415]">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-[#3c2415]">Send Us a Message</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-[#3c2415]">
                          Your Name
                        </label>
                        <Input id="name" placeholder="Enter your name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-[#3c2415]">
                          Your Email
                        </label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-[#3c2415]">
                        Subject
                      </label>
                      <Input id="subject" placeholder="Enter subject" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-[#3c2415]">
                        Message
                      </label>
                      <Textarea id="message" placeholder="Enter your message" rows={5} />
                    </div>
                    <Button type="submit" className="w-full bg-[#3c2415] hover:bg-[#5a3a28]">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Campus Locations */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center text-[#3c2415]">Our Campuses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campuses.map((campus, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-[#3c2415]">{campus.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-amber-700 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#3c2415]">{campus.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-amber-700 mr-3 flex-shrink-0" />
                        <p className="text-sm text-[#3c2415]">{campus.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#3c2415]">Find Us</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5302959096513!2d74.33292491511566!3d31.505304981374592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f0a0f9b9c3%3A0x4b0e3a9f7a2b0e1a!2sChocolate%20Academy%20Pakistan!5e0!3m2!1sen!2s!4v1621234567890!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
