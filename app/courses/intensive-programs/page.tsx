import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Intensive Programs",
  description:
    "Elevate your culinary skills with Chocolate Academy Pakistan's intensive programs: Cake Decoration, Grand Diplome in Chocolate & Patisserie, and Grand Diplome in Culinary Arts.",
  keywords: [
    "Intensive Culinary Programs",
    "Professional Baking Courses",
    "Chocolate Diploma Pakistan",
    "Patisserie Training",
    "Culinary Arts Diploma",
    "Cake Decoration Course",
    "Grand Diplome Chocolate",
  ],
  openGraph: {
    title: "Intensive Programs | Chocolate Academy Pakistan",
    description:
      "Elevate your culinary skills with Chocolate Academy Pakistan's intensive programs: Cake Decoration, Grand Diplome in Chocolate & Patisserie, and Grand Diplome in Culinary Arts.",
    url: "https://chocolateacademy.com.pk/courses/intensive-programs",
    images: [
      {
        url: "/images/Workshops-&-Courses.jpg", // Use a relevant image for the page
        width: 1200,
        height: 630,
        alt: "Intensive Culinary Programs at Chocolate Academy Pakistan",
      },
    ],
    type: "website",
  },
}

// Program data
const programs = [
  {
    id: "cake-decoration",
    title: "Cake Decoration & Fondant Art",
    description:
      "This 04-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demand. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute.",
    image: "/images/courses/cake-decor.webp",
    duration: "1 month",
    level: "Beginner to Advanced",
    certification: "International Chocolate Academy",
    charges: "PKR 75,000",
  },
  {
    id: "grand-diplome-en-chocolat-et-pattisserie",
    title: "Grand Diplome en Chocolat Et Pattisserie",
    description:
      "A comprehensive 4-month program covering everything from theory and techniques to advanced chocolate mastery and entrepreneurship. This intensive course includes 14 core modules and complementary business classes, preparing you for a successful career in the culinary arts industry.",
    image: "/images/courses/choc.webp",
    duration: "4 months",
    level: "Professional",
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    charges: "PKR 425,000",
  },
  {
    id: "grand-diploma-culinary",
    title: "Grand Diplome en Culinary & Finishing Arts",
    description:
      "A comprehensive 16-week program covering essential culinary techniques, international cuisines, and professional finishing arts. This intensive course includes 15 core modules and complementary business classes, preparing you for a successful career in the culinary arts industry.",
    image: "/images/courses/cul.webp",
    duration: "16 weeks",
    level: "Professional",
    certification: "GPDP, TYPSY AUSTRALIA, ICM UK, INTERNATIONAL CHOCOLATE ACADEMY, HIGHFIELD UK",
    charges: "PKR 450,000",
  },
]

export default function IntensiveProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/Workshops-&-Courses.jpg"
          alt="Intensive Programs"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Intensive Programs</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Elevate your skills with our comprehensive professional programs designed for serious culinary enthusiasts
            and professionals
          </p>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses" className="hover:text-amber-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Intensive Programs</span>
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

      {/* Programs Introduction */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#3c2415]">
              Transform Your Passion Into Profession
            </h2>
            <p className="text-gray-700">
              Our intensive programs are designed to provide comprehensive training in specialized culinary arts.
              Whether you're looking to start a career or enhance your existing skills, these programs offer in-depth
              knowledge, hands-on experience, and internationally recognized certifications.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 gap-16">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2 relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-amber-800 rounded-lg transform rotate-1"></div>
                  <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={program.image || "/placeholder.svg"}
                      alt={program.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                          {program.duration}
                        </span>
                        <span className="bg-[#3c2415] text-white text-xs px-3 py-1 rounded-full">{program.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#3c2415]">{program.title}</h3>
                  <p className="text-gray-700 mb-6">{program.description}</p>

                  <div className="bg-white rounded-xl shadow p-6 my-6">
                    <h3 className="font-bold text-lg mb-4 text-[#3c2415]">Program Highlights:</h3>
                    <ul className="space-y-2">
                      {[
                        "Hands-on practical training",
                        "Small batch sizes for personalized attention",
                        `Industry-recognized certification: ${program.certification}`,
                        program.charges
                          ? `Program Fee: ${program.charges}`
                          : "Career guidance and placement assistance",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center text-[#3c2415]">
                          <span className="text-amber-600 mr-2 text-lg">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link href={`/courses/intensive-programs/${program.id}`}>
                      <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">View Program Details</Button>
                    </Link>
                    <a
                      href={`https://wa.me/923248842000?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(program.title)}%20program.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-[#3c2415]  hover:bg-[#3c2415] hover:text-white flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        Inquire Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Programs */}
      <section className="py-16 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Intensive Programs</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#5a3a28] p-8 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Instructors</h3>
              <p>
                Learn from internationally trained chefs with decades of experience in top establishments around the
                world.
              </p>
            </div>

            <div className="bg-[#5a3a28] p-8 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                  <path d="M10 9H8"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Global Recognition</h3>
              <p>
                Receive certifications recognized by culinary institutions worldwide, opening doors to international
                career opportunities.
              </p>
            </div>

            <div className="bg-[#5a3a28] p-8 rounded-lg text-center transform transition-transform hover:scale-105">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z"></path>
                  <path d="M12 22V12"></path>
                  <path d="M16 12h-8"></path>
                  <path d="M18 8c0-4.4-3.6-8-8-8S2 3.6 2 8s3.6 8 8 8h4c4.4 0 8 3.6 8 8v0c0-4.4-3.6-8-8-8h-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">State-of-the-Art Facilities</h3>
              <p>
                Train in our professionally equipped kitchens with the latest tools and technology used in the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#3c2415]">Success Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#3c2415">
                  <path d="M11.3 6.2H9.8c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2zm8.7 0h-1.5c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2z"></path>
                </svg>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/courses/testimonial1.png"
                    alt="Testimonial"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#3c2415]">Ahmed Khan</h4>
                  <p className="text-amber-800">Grand Diploma Graduate, Now Head Pastry Chef at The Ritz</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "The Grand Diploma in Chocolate & Pastry completely transformed my career. The hands-on training and
                mentorship from world-class chefs gave me the confidence and skills to excel in the industry. Within
                three months of graduating, I secured a position at a 5-star hotel."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#3c2415">
                  <path d="M11.3 6.2H9.8c-2.7 0-5.8 1-5.8 5.5v.2c0 2.4 1.8 4.4 4.1 4.4 2.3 0 4.1-1.8 4.1-4.1 0-2.2-1.8-4.1-4.1-4.1h-.1c.1-1.6 1.4-2.2 3.3-2.2V6.2z"></path>
                </svg>
              </div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/images/courses/testimonial2.png"
                    alt="Testimonial"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#3c2415]">Fatima Zaidi</h4>
                  <p className="text-amber-800">Cake Decoration Graduate, Owner of 'Sweet Creations'</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-4">
                "After completing the Cake Decoration & Fondant Art program, I started my own business that has now
                grown into one of the most sought-after custom cake studios in Lahore. The techniques I learned and the
                business guidance provided by the academy were invaluable to my success."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Culinary Journey?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Take the first step towards a rewarding career in the culinary arts. Our next batch of intensive programs
            starts soon. Limited seats available!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses/register">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">Apply Now</Button>
            </Link>
            <a
              href="https://wa.me/923248842000?text=Hello,%20I'd%20like%20to%20learn%20more%20about%20your%20intensive%20programs."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#3c2415] text-lg px-8 py-6"
              >
                Contact an Advisor
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
