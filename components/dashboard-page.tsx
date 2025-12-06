"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TaskList from "@/components/task-list"
import TaskForm from "@/components/task-form"
import ProgressBar from "@/components/progress-bar"
import SettingsPage from "@/components/settings-page"
import { ThemeToggle } from "@/components/theme-toggle"
import { taskService } from "@/lib/service/taskService"

export interface Task {
  id: string
  title: string
  description: string
  deadline: string
  priority: "low" | "medium" | "high"
  completed: boolean
  createdAt: string
}

interface DashboardPageProps {
  user: string
  onLogout: () => void
}

export default function DashboardPage({ user, onLogout }: DashboardPageProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [activeTab, setActiveTab] = useState("tasks")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        setError("")
        const fetchedTasks = await taskService.getTasks()
        setTasks(fetchedTasks || [])
      } catch (err) {
        console.error("Failed to fetch tasks:", err)
        setError("Failed to load tasks")
        setTasks([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [user])

  const handleAddTask = (task: Omit<Task, "id" | "createdAt">) => {
    // Task is already added via taskService.createTask in task-form
    // Just refresh the list
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }
    setTasks([newTask, ...tasks])
    setShowForm(false)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    // Task is already updated via taskService.updateTask in task-form
    // Just update local state
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
    setEditingTask(null)
    setShowForm(false)
  }

  const handleDeleteTask = (id: string) => {
    // Delete is handled in task-card with taskService.deleteTask
    // Just remove from local state
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleToggleComplete = (id: string) => {
    // Toggle is handled in task-card with taskService.toggleTaskComplete
    // Just update local state
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background dark:from-background dark:via-slate-900/20 dark:to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">TaskFlow</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {user}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              onClick={onLogout}
              className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-8">
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-8">
            {/* Error Message */}
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading tasks...</p>
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-muted-foreground text-sm font-medium mb-2">Total Tasks</p>
                    <p className="text-4xl font-bold text-foreground">{tasks.length}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-muted-foreground text-sm font-medium mb-2">Completed</p>
                    <p className="text-4xl font-bold text-accent">{completedCount}</p>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-muted-foreground text-sm font-medium mb-2">Remaining</p>
                    <p className="text-4xl font-bold text-primary">{tasks.length - completedCount}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Overall Progress</h2>
                  <ProgressBar percentage={progressPercentage} />
                  <p className="text-sm text-muted-foreground mt-4">
                    {completedCount} of {tasks.length} tasks completed
                  </p>
                </div>

                {/* Add Task Button */}
                <div>
                  <Button
                    onClick={() => {
                      setShowForm(!showForm)
                      setEditingTask(null)
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {showForm ? "Cancel" : "+ Add New Task"}
                  </Button>
                </div>

                {/* Task Form */}
                {showForm && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <TaskForm
                      onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                      onSuccess={() => setShowForm(false)}
                      initialTask={editingTask}
                    />
                  </div>
                )}

                {/* Task List */}
                <TaskList
                  tasks={tasks}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                  onEdit={(task) => {
                    setEditingTask(task)
                    setShowForm(true)
                  }}
                />
              </>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPage user={user} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
