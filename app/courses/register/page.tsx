"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Workshop data (simplified version)
const workshops = [
  { id: "cdfa", title: "CDFA", price: 150000 },
  { id: "gdicp-8", title: "GDICP-8", price: 300000 },
  { id: "gdicfa-01", title: "GDICFA-01", price: 350000 },
  { id: "barrista", title: "BARRISTA", price: 80000 },
  { id: "kids-summer-camp", title: "Kids Summer Camp", price: 40000 },
  { id: "kids-teen-splash", title: "Kids Teen Splash", price: 45000 },
  { id: "winter-camp", title: "Winter Camp", price: 30000 },
]

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const courseId = searchParams.get("course")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    course: courseId || "",
    paymentMethod: "bank-transfer",
    message: "",
    agreeTerms: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  useEffect(() => {
    if (courseId) {
      const course = workshops.find((w) => w.id === courseId)
      setSelectedCourse(course)
      setFormData((prev) => ({ ...prev, course: courseId }))
    }
  }, [courseId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "course") {
      const course = workshops.find((w) => w.id === value)
      setSelectedCourse(course)
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      toast({
        title: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setIsSubmitted(true)
        toast({
          title: "Registration successful!",
          description: "We've received your registration and will contact you shortly.",
        })
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Toaster />

      {/* Page Banner */}
      <section className="relative h-[200px] overflow-hidden">
        <Image
          src="/images/Contact-us.jpg"
          alt="Course Registration"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Course Registration</h1>
          <div className="flex items-center text-sm">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/courses/workshops" className="hover:text-amber-400 transition-colors">
              Workshops
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-amber-400">Register</span>
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

      {/* Registration Content */}
      <section className="py-12 bg-[#fdf6f0]">
        <div className="container mx-auto px-4">
          {isSubmitted ? (
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
              <h2 className="text-2xl font-bold text-[#3c2415] mb-4">Registration Successful!</h2>
              <p className="text-gray-700 mb-6">
                Thank you for registering for our course. We have sent a confirmation email to your email address. Our
                team will contact you shortly with further details.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#3c2415] hover:bg-[#5a3a28] text-white" onClick={() => setIsSubmitted(false)}>
                  Register Another Course
                </Button>
                <Button
                  variant="outline"
                  className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                  onClick={() => router.push("/courses/workshops")}
                >
                  Back to Workshops
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Registration Form */}
              <div className="md:col-span-2">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-[#3c2415] mb-6">Registration Form</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </Label>
                        <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
                          <SelectTrigger id="city">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lahore">Lahore</SelectItem>
                            <SelectItem value="karachi">Karachi</SelectItem>
                            <SelectItem value="islamabad">Islamabad</SelectItem>
                            <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                            <SelectItem value="faisalabad">Faisalabad</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="course">
                          Select Course <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={formData.course}
                          onValueChange={(value) => handleSelectChange("course", value)}
                          required
                        >
                          <SelectTrigger id="course">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {workshops.map((workshop) => (
                              <SelectItem key={workshop.id} value={workshop.id}>
                                {workshop.title} - Rs. {workshop.price.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label>
                          Payment Method <span className="text-red-500">*</span>
                        </Label>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                            <Label htmlFor="bank-transfer" className="cursor-pointer">
                              Bank Transfer
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cash" id="cash" />
                            <Label htmlFor="cash" className="cursor-pointer">
                              Cash Payment
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="cursor-pointer">
                              Credit Card
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Any specific requirements or questions?"
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeTerms"
                            checked={formData.agreeTerms}
                            onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                          />
                          <Label htmlFor="agreeTerms" className="text-sm leading-tight">
                            I agree to the{" "}
                            <Link href="#" className="text-amber-800 underline">
                              terms and conditions
                            </Link>{" "}
                            and consent to the processing of my personal data as described in the
                            <Link href="#" className="text-amber-800 underline">
                              {" "}
                              privacy policy
                            </Link>
                            .
                          </Label>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#3c2415] hover:bg-[#5a3a28] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Course Information */}
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h3 className="text-xl font-bold mb-4 text-[#3c2415]">Course Information</h3>

                  {selectedCourse ? (
                    <div>
                      <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                        <Image
                          src={`/images/courses/${selectedCourse.id}.jpg`}
                          alt={selectedCourse.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h4 className="text-lg font-bold text-[#3c2415] mb-2">{selectedCourse.title}</h4>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Course Fee:</span>
                          <span className="font-semibold text-[#3c2415]">
                            Rs. {selectedCourse.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-[#3c2415]">
                            {selectedCourse.id.includes("month")
                              ? "1 Month"
                              : selectedCourse.id === "gdicp-8" || selectedCourse.id === "gdicfa-01"
                                ? "4 Months"
                                : selectedCourse.id === "winter-camp"
                                  ? "2 Weeks"
                                  : "1 Month"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span className="font-semibold text-[#3c2415]">January 24, 2025</span>
                        </div>
                      </div>

                      <div className="bg-amber-100 p-4 rounded-md mb-4">
                        <h5 className="font-semibold text-[#3c2415] mb-2">Registration Process:</h5>
                        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
                          <li>Fill out the registration form</li>
                          <li>Submit your application</li>
                          <li>Receive confirmation email</li>
                          <li>Complete payment</li>
                          <li>Get ready for your course!</li>
                        </ol>
                      </div>

                      <div className="text-sm text-gray-600">
                        <p>Need help with registration?</p>
                        <a
                          href="https://wa.me/923248842000?text=Hello,%20I%20need%20help%20with%20course%20registration."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-green-600 mt-2"
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
                          Contact us on WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">Please select a course to see details</p>
                      <Link href="/courses/workshops">
                        <Button
                          variant="outline"
                          className="border-[#3c2415] text-[#3c2415] hover:bg-[#3c2415] hover:text-white"
                        >
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
