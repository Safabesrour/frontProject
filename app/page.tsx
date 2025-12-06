"use client"

import { useState, useEffect } from "react"
import LandingPage from "@/components/landing-page"
import AuthPage from "@/components/auth-page"
import DashboardPage from "@/components/dashboard-page"

export default function Home() {
  const [appState, setAppState] = useState<"landing" | "auth" | "dashboard">("landing")
  const [currentUser, setCurrentUser] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("taskAppUser")
    if (storedUser) {
      setCurrentUser(storedUser)
      setAppState("dashboard")
    }
    setIsLoading(false)
  }, [])

  const handleGetStarted = () => {
    setAppState("auth")
  }

  const handleLogin = (username: string) => {
    setCurrentUser(username)
    setAppState("dashboard")
    localStorage.setItem("taskAppUser", username)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setAppState("landing")
    localStorage.removeItem("taskAppUser")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {appState === "landing" && <LandingPage onGetStarted={handleGetStarted} />}
      {appState === "auth" && <AuthPage onLogin={handleLogin} onBack={() => setAppState("landing")} />}
      {appState === "dashboard" && currentUser && <DashboardPage user={currentUser} onLogout={handleLogout} />}
    </>
  )
}
