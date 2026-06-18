import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getCourseBySlug, getCourses } from "@/lib/cms"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const program = await getCourseBySlug(id)

  if (!program) {
    return {
      title: "Program Not Found",
      description: "The intensive program you are looking for does not exist.",
    }
  }

  const keywords = [
    program.title,
    program.level,
    program.duration,
    "Chocolate Academy Courses",
    "Culinary Programs Pakistan",
    "Professional Baking",
    "Pastry Diploma",
    "Chocolate Mastery",
    ...(program.highlights ?? []),
  ].join(", ")

  return {
    title: program.title,
    description: program.description,
    keywords,
    alternates: {
      canonical: `https://chocolateacademy.com.pk/courses/intensive-programs/${program.slug}`,
    },
    openGraph: {
      title: program.title,
      description: program.description,
      url: `https://chocolateacademy.com.pk/courses/intensive-programs/${program.slug}`,
      images: [{ url: program.image || "/placeholder.svg", width: 1200, height: 630, alt: program.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: program.title,
      description: program.description,
      images: [program.image || "/placeholder.svg"],
    },
  }
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const program = await getCourseBySlug(id)

  if (!program) {
    notFound()
  }

  const relatedPrograms = (await getCourses(true)).filter((p) => p.slug !== program.slug)

  const registerHref = program.register_url || `/courses/register?course=${program.slug}`
  const isExternalRegister = /^https?:\/\//.test(registerHref)

  // Structured Data for Course
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description,
    provider: {
      "@type": "EducationalOrganization",
      name: "Chocolate Academy Pakistan",
      url: "https://chocolateacademy.com.pk",
    },
    coursePrerequisites: program.level === "Beginner to Advanced" ? "None" : "Basic culinary skills",
    educationalCredentialAwarded: program.certification,
    offers: {
      "@type": "Offer",
      price: program.fee,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `https://chocolateacademy.com.pk/courses/register?course=${program.slug}`,
    },
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Add JSON-LD Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      {/* Page Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.title}</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses" className="hover:text-amber-400 transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses/intensive-programs" className="hover:text-amber-400 transition-colors">
              Intensive Programs
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">{program.title}</span>
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

      {/* Program Overview */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-[#3c2415]">Program Overview</h2>

              {program.program_overview ? (
                <div
                  className="prose prose-stone max-w-none text-gray-700 mb-8 [&_h1]:text-[#3c2415] [&_h2]:text-[#3c2415] [&_h3]:text-[#3c2415] [&_a]:text-amber-800 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                  dangerouslySetInnerHTML={{ __html: program.program_overview }}
                />
              ) : (
                <p className="text-gray-700 mb-6">{program.description}</p>
              )}

              {/* Highlights */}
              {program.highlights && program.highlights.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Program Highlights</h3>
                  <ul className="space-y-2">
                    {program.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start text-[#3c2415]">
                        <span className="text-amber-600 mr-2 text-lg leading-6">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Curriculum */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Detailed Curriculum</h3>
                {program.detailed_curriculum ? (
                  <div
                    className="prose prose-stone max-w-none text-gray-700 [&_h1]:text-[#3c2415] [&_h2]:text-[#3c2415] [&_h3]:text-[#3c2415] [&_a]:text-amber-800 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6"
                    dangerouslySetInnerHTML={{ __html: program.detailed_curriculum }}
                  />
                ) : (
                  <p className="text-gray-700">
                    Our comprehensive curriculum is designed to provide both theoretical knowledge and practical skills.
                    Contact us for the full module breakdown.
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Program Details</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Duration:</span>
                    <span className="font-semibold text-[#3c2415]">{program.duration}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Level:</span>
                    <span className="font-semibold text-[#3c2415]">{program.level}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Certification:</span>
                    <span className="font-semibold text-[#3c2415] text-right">
                      {program.certification?.split(",")[0]}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Fee:</span>
                    <span className="font-semibold text-[#3c2415]">Rs. {Number(program.fee).toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {isExternalRegister ? (
                    <a href={registerHref} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-[#3c2415] hover:bg-[#5a3a28] text-white">Register Now</Button>
                    </a>
                  ) : (
                    <Link href={registerHref}>
                      <Button className="w-full bg-[#3c2415] hover:bg-[#5a3a28] text-white">Register Now</Button>
                    </Link>
                  )}

                  <a
                    href={`https://wa.me/923248842000?text=Hello,%20I'm%20interested%20in%20the%20${encodeURIComponent(program.title)}%20program.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-[#3c2415]  hover:bg-[#3c2415] hover:text-white flex items-center justify-center gap-2"
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
                      Inquire via WhatsApp
                    </Button>
                  </a>
                </div>

                <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                  <h4 className="font-bold text-[#3c2415] mb-2">Need Help?</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Our program advisors are available to answer any questions you may have about this program.
                  </p>
                  <p className="text-sm font-semibold text-[#3c2415]">Call: 0309-3336142</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-[#3c2415]">Related Programs</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPrograms.map((relatedProgram) => (
                <div
                  key={relatedProgram.slug}
                  className="bg-[#fdf6f0] rounded-lg overflow-hidden shadow-md flex flex-col"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedProgram.image || "/placeholder.svg"}
                      alt={relatedProgram.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <h3 className="text-white font-bold text-xl p-4">{relatedProgram.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-gray-700 mb-4 flex-1">{relatedProgram.description.substring(0, 120)}...</p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          {relatedProgram.duration}
                        </span>
                        <span className="bg-[#3c2415] text-white text-xs px-2 py-1 rounded-full">
                          {relatedProgram.level}
                        </span>
                      </div>
                      <Link href={`/courses/intensive-programs/${relatedProgram.slug}`}>
                        <Button variant="outline" className=" border-[#3c2415] hover:bg-[#3c2415] hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Passion into Profession?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Take the first step towards a rewarding career in the culinary arts. Register now for {program.title} and
            join our community of culinary professionals.
          </p>
          <Link href={`/courses/register?course=${program.slug}`}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">Apply Now</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
