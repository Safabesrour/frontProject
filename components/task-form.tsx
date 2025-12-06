"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { taskService } from "@/lib/service/taskService"
import type { Task } from "./dashboard-page"

interface TaskFormProps {
  onSubmit: (task: any) => void
  onSuccess?: () => void
  initialTask?: Task | null
}
export default function TaskForm({ onSubmit, onSuccess, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description)
      setDeadline(initialTask.deadline)
      setPriority(initialTask.priority)
    }
  }, [initialTask])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!title.trim()) {
      setError("Task title is required")
      setIsLoading(false)
      return
    }

    if (!deadline) {
      setError("Deadline is required")
      setIsLoading(false)
      return
    }

    try {
      const taskData = {
        title: title.trim(),
        description: description.trim(),
        deadline,
        priority,
      }

      if (initialTask) {
        // Update existing task
        const updatedTask = await taskService.updateTask(initialTask.id, {
          ...taskData,
          completed: initialTask.completed,
        })
        onSubmit({
          ...updatedTask,
          id: initialTask.id,
          createdAt: initialTask.createdAt,
        })
      } else {
        // Create new task
        const newTask = await taskService.createTask(taskData)
        onSubmit(newTask)
      }

      // Reset form
      setTitle("")
      setDescription("")
      setDeadline("")
      setPriority("medium")

      onSuccess?.()
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save task. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-6">{initialTask ? "Edit Task" : "Create New Task"}</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
            Task Title *
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
            Description (Optional)
          </label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-foreground mb-2">
              Deadline *
            </label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm border border-destructive/20">
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6">
            {isLoading ? "Saving..." : initialTask ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </div>
  )
}
