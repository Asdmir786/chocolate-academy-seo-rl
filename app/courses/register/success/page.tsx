import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Banner */}
      <section className="relative h-[200px] overflow-hidden">
        <Image
          src="/images/courses/success-banner.png"
          alt="Registration Success"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Registration Successful</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses/workshops" className="hover:text-amber-400 transition-colors">
              Workshops
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Success</span>
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

      {/* Success Content */}
      <section className="py-16 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="green"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-[#3c2415] mb-4">Thank You for Registering!</h2>

            <p className="text-gray-700 mb-6">
              Your registration has been successfully submitted. We have sent a confirmation email to your email address
              with all the details about your course. Our team will contact you shortly with further information.
            </p>

            <div className="bg-amber-100 p-4 rounded-md mb-6 text-left">
              <h3 className="font-semibold text-[#3c2415] mb-2">Next Steps:</h3>
              <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
                <li>Check your email for confirmation details</li>
                <li>Complete the payment process as instructed in the email</li>
                <li>Prepare any required materials for your course</li>
                <li>Mark your calendar for the course start date</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses/workshops">
                <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white">Explore More Courses</Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                >
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
