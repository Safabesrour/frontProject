"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant="outline"
      size="icon"
      className="rounded-lg border-border bg-card hover:bg-muted"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.415 0l1.414 1.414a1 1 0 11-1.414 1.414L4.22 5.636a1 1 0 010-1.414zm11.07 0a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.415 1.414l-1.413-1.414a1 1 0 010-1.414zM4 10a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm12 0a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-5.02-5.02a1 1 0 010 1.415L5.636 9.586a1 1 0 11-1.414-1.414l4.242-4.242a1 1 0 011.414 0zm5.656 5.656a1 1 0 010 1.415l-4.242 4.242a1 1 0 11-1.414-1.414l4.242-4.242a1 1 0 011.414 0zM10 15a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </Button>
  )
}
