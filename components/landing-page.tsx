"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/30 to-background dark:from-background dark:via-slate-900/30 dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">TaskFlow</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button onClick={onGetStarted} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Manage Your Tasks with <span className="text-primary">Purpose</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Stay organized and boost your productivity. Create tasks, set deadlines, track progress, and achieve your
            goals with our intuitive task management platform.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-8 text-left hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">✓</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">Simple and intuitive interface designed for everyone.</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-left hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">⏱</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Deadline Tracking</h3>
              <p className="text-muted-foreground">Never miss a deadline with timely reminders.</p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-left hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">Visualize your progress and stay motivated.</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg"
            >
              Get Started Free
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg border-border bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 TaskFlow. All rights reserved. Productivity made simple.</p>
        </div>
      </footer>
    </div>
  )
}
