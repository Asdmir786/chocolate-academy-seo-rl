"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, User } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"
    if (isAuthenticated) {
      router.push("/admin/newsletters")
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple validation
    if (!username || !password) {
      setError("Please enter both username and password")
      setIsLoading(false)
      return
    }

    // Check credentials (hardcoded for this example)
    if (username === "admin" && password === "chocolate@#") {
      // Set authentication in localStorage
      localStorage.setItem("adminAuthenticated", "true")

      // Add timestamp for session expiration (24 hours)
      const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000
      localStorage.setItem("adminAuthExpires", expiresAt.toString())

      // Redirect to admin dashboard
      router.push("/admin/newsletters")
    } else {
      setError("Invalid username or password")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 py-12 bg-[#fdf6f0] flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <Card className="border-[#3c2415]/20 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-[#3c2415]">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[#3c2415]">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        className="pl-10"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#3c2415]">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-[#3c2415] hover:bg-[#5a3a28]" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
