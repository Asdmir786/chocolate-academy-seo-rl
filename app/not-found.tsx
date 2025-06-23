import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6f0] px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#3c2415]">404</h1>
        <h2 className="text-3xl font-bold text-[#3c2415] mt-4 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button asChild className="bg-[#3c2415] hover:bg-[#5a3a28]">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}
