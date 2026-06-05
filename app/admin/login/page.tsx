"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Lock, Mail } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        router.push("/admin")
        router.refresh()
      } else {
        setError(data.error || "Invalid email or password")
        setIsLoading(false)
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
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
                Sign in to manage Chocolate Academy content
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
                    <Label htmlFor="email" className="text-[#3c2415]">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@chocolateacademy.com.pk"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
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
                        autoComplete="current-password"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#3c2415] hover:bg-[#5a3a28]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-xs text-muted-foreground w-full">
                Authorized personnel only. All activity is logged.
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
