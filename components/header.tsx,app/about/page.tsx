\`\`\`tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, ChevronDown, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { trackWhatsAppClick } from "@/lib/analytics"

export default function HomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const menuItems = [
    { name: "ABOUT US", href: "/about" },
    { name: "SHOP", href: "/shop" },
    { name: "GIFTING", href: "/gifting" },
    {
      name: "COURSES ",
      href: "/courses",
      dropdown: [
        { name: "All Courses", href: "/courses/intensive-programs" },
        { name: "Workshops", href: "/courses/workshops" },
      ],
    },
    { name: "CONTACT US", href: "/contact" },
    { name: "GALLERY", href: "/gallery" },
  ]

  /* ---------- scroll state ---------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* ---------- WhatsApp click ---------- */
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    trackWhatsAppClick({
      source: "header",
      buttonLocation: "top_bar",
      phoneNumber: "923093336142",
    })
    window.open("https://wa.me/923093336142", "_blank")
  }

  /* ---------- render ---------- */
  return (
    <>
      {/* Top-bar */}
      <div className="bg-[#3c2415] text-white py-1 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xs flex items-center">
            <span className="hidden md:inline-block mr-4">Welcome to Chocolate Academy Pakistan</span>
            <a href="tel:+923093336142" className="hover:text-amber-400 transition-colors">
              Call&nbsp;Us:&nbsp;0309-3336142
            </a>
          </div>

          <div className="text-xs flex items-center space-x-4">
            <button onClick={handleWhatsAppClick} className="flex items-center hover:text-amber-400 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              WhatsApp
            </button>

            <Link href="/contact" className="hover:text-amber-400">
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#3c2415]/95 backdrop-blur-sm shadow-lg py-2"
            : "bg-gradient-to-r from-[#3c2415] to-[#5a3a28] py-3"
        }`}
      >
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/images/chocolate-pattern.png')",
              backgroundSize: "200px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex items-center justify-between">
          {/* mobile menu */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="bg-[#3c2415] text-white border-r-[#5a3a28] w-[300px]">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="relative" onClick={() => setIsMenuOpen(false)}>
                      <Image
                        src="/images/logo.webp"
                        alt="Chocolate Academy"
                        width={150}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </Link>
                    <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* links */}
                  <nav className="flex flex-col space-y-1">
                    {menuItems.map((item) =>
                      item.dropdown ? (
                        <div key={item.name} className="space-y-1">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                            className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium hover:bg-[#2a1a0f] rounded-md"
                          >
                            {item.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {activeDropdown === item.name && (
                            <div className="pl-6 space-y-1 animate-in slide-in-from-left-5">
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-3 py-2 text-sm hover:bg-[#2a1a0f] rounded-md"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="px-3 py-2 text-sm hover:bg-[#2a1a0f] rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ),
                    )}
                  </nav>

                  {/* socials */}
                  <div className="mt-auto pt-6 border-t border-[#5a3a28]">
                    <div className="flex justify-center space-x-4">
                      {["facebook", "instagram", "twitter"].map((s) => (
                        <a key={s} href={`#${s}`} className="hover:text-amber-400 transition-colors">
                          <Image src={`/images/social/${s}.svg`} alt={s} width={18} height={18} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* logo */}
          <Link href="/" className="relative group">
            <motion.div initial={{ y: 0 }} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
              <Image
                src="/images/logo.webp"
                alt="Chocolate Academy"
                width={180}
                height={50}
                className={`h-12 w-auto transition-all duration-300 ${isScrolled ? "h-10" : "h-12"}`}
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-amber-400"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="relative px-3 py-2 text-xs font-medium overflow-hidden group flex items-center">
                      <span className="z-10 group-hover:text-amber-400 text-white">{item.name}</span>
                      <ChevronDown className="h-3 w-3 ml-1 opacity-70 group-hover:text-amber-400 text-white" />
                      <span className="absolute bottom-0 left-0 w-full h-0 bg-[#2a1a0f] transition-all group-hover:h-full" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-[#3c2415] border-[#5a3a28] text-white">
                    {item.dropdown.map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link href={sub.href} className="cursor-pointer hover:bg-[#2a1a0f] hover:text-amber-400">
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-xs font-medium overflow-hidden group"
                >
                  <span className="z-10 group-hover:text-amber-400 text-white">{item.name}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0 bg-[#2a1a0f] transition-all group-hover:h-full" />
                </Link>
              ),
            )}
          </nav>

          {/* social rhs */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-white text-sm font-semibold">Follow us</span>
            <a
              href="https://instagram.com/chocolateacademy.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* decorative drip */}
        {!isScrolled && (
          <div className="absolute -bottom-3 left-0 w-full overflow-hidden h-3">
            <div
              className="w-full h-12"
              style={{
                backgroundImage: "url('/images/chocolate-drip.png')",
                backgroundSize: "contain",
                backgroundRepeat: "repeat-x",
              }}
            />
          </div>
        )}
      </header>
    </>
  )
}
\`\`\`

\`\`\`tsx
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Chocolate Academy Pakistan",
  description:
    "Learn about Chocolate Academy Pakistan, our mission, and our expert chocolatiers. Discover the art of chocolate making with us.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-gray-700 text-lg text-center">
          Welcome to Chocolate Academy Pakistan, where we are passionate about
          the art and science of chocolate making.
        </p>
      </section>

      {/* Our Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600">
            Founded in [Year], Chocolate Academy Pakistan was born out of a
            desire to share the joy and intricacies of chocolate with the
            world. Our expert chocolatiers have years of experience and a deep
            love for creating exquisite chocolates.
          </p>
          <p className="text-gray-600 mt-4">
            We believe in using only the finest ingredients and traditional
            techniques to craft chocolates that are both delicious and
            visually stunning.
          </p>
        </div>
        <div>
          <Image
            src="/images/about/our-story.webp"
            alt="Our Story"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Our Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <Image
            src="/images/about/our-mission.webp"
            alt="Our Mission"
            width={500}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            At Chocolate Academy Pakistan, our mission is to inspire and
            educate chocolate lovers of all levels. Whether you're a beginner
            or an experienced chocolatier, we offer a range of courses and
            workshops to help you master the art of chocolate making.
          </p>
          <p className="text-gray-600 mt-4">
            We are committed to providing a supportive and engaging learning
            environment where you can explore your creativity and develop your
            skills.
          </p>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <Image
              src="/images/about/team-1.webp"
              alt="Team Member 1"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-500">Head Chocolatier</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <Image
              src="/images/about/team-2.webp"
              alt="Team Member 2"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-500">Senior Instructor</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <Image
              src="/images/about/team-3.webp"
              alt="Team Member 3"
              width={200}
              height={200}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">David Lee</h3>
            <p className="text-gray-500">Chocolate Artist</p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to start?</h2>
        <p className="text-gray-600 mb-8">
          Contact us today to learn more about our courses and workshops.
        </p>
        <a
          href="/contact"
          className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  )
}
\`\`\`
