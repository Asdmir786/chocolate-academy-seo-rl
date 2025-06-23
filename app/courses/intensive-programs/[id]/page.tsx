import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Metadata } from "next"

// Program data
export const programs = [
  {
    id: "cake-decoration",
    title: "Cake Decoration & Fondant Art",
    description:
      "This 04-week premium Cake decoration and fondant art course will equip you with the knowledge and tools to slay any designer cake project your client demand. Master the art of making incredible cakes with a distinctive approach in a one-of-its-kind learning institute. The ultimate purpose of this 01-month course is to equip you with the basic and professional skills of handling fondant and buttercream. This course will include thorough sessions in which you will be provided with all the food material and a separate recipe book. After the course, students will be able to design their own fondant cakes as a final project.",
    image: "/images/courses/cake-decor.webp",
    duration: "1 month",
    level: "Beginner to Advanced",
    certification: "International Chocolate Academy",
    price: 75000,
    startDates: ["January 15, 2025", "March 10, 2025", "June 5, 2025"],
    curriculum: [
      "Week 1: Baking a cake using the creamy method, Making cake icing from scratch, Leveling cake layer, cake filling, crumb coating, and smooth frosting of cakes, Stabilizing single heightened cake",
      "Week 2: Making Fondant from Scratch, Coloring the fondant, Preserving the fondant, Covering the cake with fondant, Sharpening the fondant cake edges, Using fondant tools in fondant decoration (roses, peony flowers, characters)",
      "Week 3: Stabilizing two-tier cake with buttercream and fondant, Making gravity-defying cake, Character Molding and balancing, 3D Cake",
      "Week 4: Learning to professionally stable three-tier cake with a stand, Costing an overview of the business of baking, The participants will cover two wedding cakes in three tiers, 3D Cake",
    ],
    instructors: [
      {
        name: "Chef Marie",
        title: "Master Cake Artist",
        bio: "With over 20 years of experience in cake artistry, Chef Marie specializes in fondant and buttercream techniques.",
      },
    ],
    detailedCurriculum: {
      complementaryClasses: ["Business Support", "Social Media Marketing", "Food Safety & Hygiene"],
    },
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
    price: 425000,
    startDates: ["January 15, 2025", "April 15, 2025", "July 15, 2025"],
    curriculum: [
      "Theory and Techniques",
      "Cakes",
      "Pastry Passion",
      "French Patisserie",
      "Ice-Cream Delights",
      "Modern Desserts and Entremets",
      "Cake Decoration and Fondant Art",
      "Chocolate Mastery",
      "Artisan Bread",
      "Quick Breads",
      "Breakfast Creations",
      "Hi-TEA Delights",
      "Entrepreneurship Masterclasses",
      "Patisserie Showcase and Challenges",
    ],
    instructors: [
      {
        name: "Chef Marie",
        title: "Master Pastry Chef",
        bio: "With over 20 years of experience in prestigious hotels across Europe and Asia, Chef Marie specializes in French patisserie and chocolate work.",
      },
    ],
    detailedCurriculum: {
      complementaryClasses: ["Business Support", "Social Media Marketing", "Food Safety & Hygiene"],
    },
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
    price: 450000,
    startDates: ["January 15, 2025", "April 15, 2025", "July 15, 2025"],
    curriculum: [
      "Essential Techniques",
      "Health-Focused Cuisine",
      "Soups, Salads, Sandwiches",
      "Taste of Asia",
      "Mediterranean Marvels",
      "Flavors of the World",
      "South Asian Delicacies",
      "Breakfast Globally",
      "Seafood Mastery",
      "Fast & Flavorful Temptations",
      "Art of Desserts",
      "Hi-TEA Delights",
      "Culinary Finesse",
      "Entrepreneurship Classes",
      "Culinary Showcase",
    ],
    instructors: [
      {
        name: "Chef Marie",
        title: "Master Chef",
        bio: "With over 20 years of experience in prestigious hotels across Europe and Asia, Chef Marie specializes in international cuisine and culinary arts.",
      },
    ],
    detailedCurriculum: {
      complementaryClasses: ["Business Support", "Social Media Marketing", "Food Safety & Hygiene"],
    },
  },
]

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const program = programs.find((p) => p.id === params.id)

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
    ...program.curriculum, // Add curriculum items as keywords
  ].join(", ")

  return {
    title: program.title,
    description: program.description,
    keywords: keywords,
    alternates: {
      canonical: `https://chocolateacademy.com.pk/courses/intensive-programs/${program.id}`, // Canonical tag
    },
    openGraph: {
      title: program.title,
      description: program.description,
      url: `https://chocolateacademy.com.pk/courses/intensive-programs/${program.id}`,
      images: [
        {
          url: program.image || "/placeholder.svg", // Use the program's image
          width: 1200,
          height: 630,
          alt: program.title,
        },
      ],
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

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const program = programs.find((p) => p.id === params.id)

  if (!program) {
    notFound()
  }

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
    hasCourseInstance: program.startDates.map((date) => ({
      "@type": "CourseInstance",
      courseMode: "Onsite",
      startDate: date,
      // endDate: calculateEndDate(date, program.duration), // You might need a helper function for this
      location: {
        "@type": "Place",
        name: "Chocolate Academy Pakistan Campuses",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pakistan",
          addressCountry: "PK",
        },
      },
      offers: {
        "@type": "Offer",
        price: program.price,
        priceCurrency: "PKR",
        availability: "https://schema.org/InStock",
        url: `https://chocolateacademy.com.pk/courses/register?course=${program.id}`,
      },
    })),
    // Add more properties like `courseWorkload`, `learningResourceType`, etc. if available
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
              <p className="text-gray-700 mb-6">{program.description}</p>

              {program.detailedCurriculum && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Detailed Curriculum</h3>
                  {program.detailedCurriculum.sauces && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#3c2415] mb-2">Sauces:</h4>
                      <ul className="list-disc pl-6 text-[#3c2415]">
                        {program.detailedCurriculum.sauces.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {program.detailedCurriculum.buttercream && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#3c2415] mb-2">Buttercream:</h4>
                      <ul className="list-disc pl-6 text-[#3c2415]">
                        {program.detailedCurriculum.buttercream.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {program.detailedCurriculum.flavors && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#3c2415] mb-2">Flavors of Cakes:</h4>
                      <ul className="list-disc pl-6 text-[#3c2415]">
                        {program.detailedCurriculum.flavors.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {program.detailedCurriculum.complementary && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#3c2415] mb-2">Complementary Classes:</h4>
                      <ul className="list-disc pl-6 text-[#3c2415]">
                        {program.detailedCurriculum.complementary.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <Tabs defaultValue="curriculum" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#f5e6d8]">
                  <TabsTrigger
                    value="curriculum"
                    className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white"
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructors"
                    className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white"
                  >
                    Instructors
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="schedule"
                    className="data-[state=active]:bg-[#3c2415] data-[state=active]:text-white"
                  >
                    Schedule
                  </TabsTrigger> */}
                </TabsList>

                <TabsContent value="curriculum" className="bg-white p-6 rounded-b-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Detailed Curriculum</h3>
                  <p className="text-gray-700 mb-4">
                    Our comprehensive curriculum is designed to provide both theoretical knowledge and practical skills.
                    Each module builds upon the previous one, ensuring a structured learning experience.
                  </p>

                  {program.id === "grand-diplome-en-chocolat-et-pattisserie" ? (
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-bold text-lg text-[#3c2415] mb-4">Course Modules</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {program.curriculum.map((item, index) => (
                            <div key={index} className="border-l-4 border-amber-800 pl-4 py-2">
                              <h5 className="font-semibold text-[#3c2415]">Module {index + 1}</h5>
                              <p className="text-gray-700 text-sm">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {program.detailedCurriculum?.complementaryClasses && (
                        <div>
                          <h4 className="font-bold text-lg text-[#3c2415] mb-4">Complementary Classes</h4>
                          <ul className="list-disc pl-6 text-gray-700 space-y-2">
                            {program.detailedCurriculum.complementaryClasses.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {program.curriculum.map((item, index) => (
                        <div key={index} className="border-l-4 border-amber-800 pl-4">
                          <h4 className="font-bold text-[#3c2415]">Week {index + 1}</h4>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="instructors" className="bg-white p-6 rounded-b-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Meet Your Instructors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {program.instructors.map((instructor, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <div className="w-24 h-24 rounded-full bg-[#3c2415] mb-4 flex items-center justify-center text-white text-2xl font-bold">
                          {instructor.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-[#3c2415]">{instructor.name}</h4>
                        <p className="text-amber-800 mb-2">{instructor.title}</p>
                        <p className="text-gray-700 text-sm">{instructor.bio}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="bg-white p-6 rounded-b-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Upcoming Batches</h3>
                  <div className="space-y-4">
                    {program.startDates.map((date, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border-b">
                        <div>
                          <h4 className="font-bold text-[#3c2415]">Batch {index + 1}</h4>
                          <p className="text-gray-700">Starting: {date}</p>
                        </div>
                        <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                          {index === 0 ? "Few Seats Left" : "Open for Registration"}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
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
                    <span className="font-semibold text-[#3c2415]">{program.certification.split(",")[0]}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Fee:</span>
                    <span className="font-semibold text-[#3c2415]">Rs. {program.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link href={`/courses/register?course=${program.id}`}>
                    <Button className="w-full bg-[#3c2415] hover:bg-[#5a3a28] text-white">Register Now</Button>
                  </Link>

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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-[#3c2415]">Related Programs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs
              .filter((p) => p.id !== program.id)
              .map((relatedProgram) => (
                <div
                  key={relatedProgram.id}
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
                      <Link href={`/courses/intensive-programs/${relatedProgram.id}`}>
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

      {/* CTA Section */}
      <section className="py-12 bg-[#3c2415] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Passion into Profession?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Take the first step towards a rewarding career in the culinary arts. Register now for {program.title} and
            join our community of culinary professionals.
          </p>
          <Link href={`/courses/register?course=${program.id}`}>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-6">Apply Now</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
