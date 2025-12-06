"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { authService } from "@/lib/service/authService"

interface AuthPageProps {
  onLogin: (username: string) => void
  onBack: () => void
}

export default function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        setIsLoading(false)
        return
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters")
        setIsLoading(false)
        return
      }
    }

    try {
      let response
      if (isSignUp) {
        response = await authService.register(email, password,name)
      } else {
        response = await authService.login(email, password)
      }

      // Extract username from email (part before @)
      const username = email.split("@")[0]
      localStorage.setItem("taskAppUser", username)
      onLogin(username)
    } catch (err: any) {
      setError(err.response?.data?.message || `${isSignUp ? "Sign up" : "Login"} failed. Please try again.`)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-background dark:from-background dark:via-slate-900/30 dark:to-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary cursor-pointer" onClick={onBack}>
            TaskFlow
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" onClick={onBack}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Auth Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-muted-foreground text-center text-sm mb-8">
              {isSignUp ? "Sign up to start managing your tasks" : "Log in to your account"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              {isSignUp && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError("")
                    setName("")
                  }}
                  className="text-primary font-semibold hover:underline"
></button>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2">
                {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError("")
                  }}
                  className="text-primary font-semibold hover:underline"
                >
                  {isSignUp ? "Log In" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
