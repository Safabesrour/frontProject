"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SettingsPageProps {
  user: string
}

export default function SettingsPage({ user }: SettingsPageProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Profile Section */}
      <Card className="border border-border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="bg-muted px-4 py-2 rounded-lg text-foreground">{user}@example.com</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Display Name</label>
            <div className="bg-muted px-4 py-2 rounded-lg text-foreground capitalize">{user}</div>
          </div>
        </div>
      </Card>

      {/* Theme Section */}
      <Card className="border border-border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Appearance</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-4">Theme</label>
            <div className="flex gap-3">
              <Button
                onClick={() => setTheme("light")}
                variant={theme === "light" ? "default" : "outline"}
                className={theme === "light" ? "bg-primary text-primary-foreground" : ""}
              >
                Light
              </Button>
              <Button
                onClick={() => setTheme("dark")}
                variant={theme === "dark" ? "default" : "outline"}
                className={theme === "dark" ? "bg-primary text-primary-foreground" : ""}
              >
                Dark
              </Button>
              <Button
                onClick={() => setTheme("system")}
                variant={theme === "system" ? "default" : "outline"}
                className={theme === "system" ? "bg-primary text-primary-foreground" : ""}
              >
                System
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            {theme === "system" ? "Using your system preference" : `Currently using ${theme} mode`}
          </p>
        </div>
      </Card>

      {/* Account Section */}
      <Card className="border border-border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6">Account</h2>

        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Manage your account settings and preferences. You can update your profile information and customize your
            experience.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border bg-transparent">
              Change Password
            </Button>
            <Button
              variant="outline"
              className="border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
