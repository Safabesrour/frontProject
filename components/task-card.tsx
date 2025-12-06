"use client"

import type { Task } from "./dashboard-page"
import { Button } from "@/components/ui/button"
import { taskService } from "@/lib/service/taskService"
import { useState } from "react"

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export default function TaskCard({ task, onDelete, onToggleComplete, onEdit }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)

  const handleDelete = async () => {
    if (!task.id) {
      console.error("Task ID is undefined")
      alert("Cannot delete task: ID missing")
      return
    }

    if (confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true)
      try {
        await taskService.deleteTask(task.id)
        onDelete(task.id)
      } catch (error) {
        console.error("Delete failed:", error)
        alert("Failed to delete task")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleToggleComplete = async () => {
    if (!task.id) {
      console.error("Task ID is undefined")
      alert("Cannot update task: ID missing")
      return
    }

    setIsToggling(true)
    try {
      await taskService.toggleTaskComplete(task.id, !task.completed)
      onToggleComplete(task.id)
    } catch (error) {
      console.error("Toggle failed:", error)
      alert("Failed to update task")
    } finally {
      setIsToggling(false)
    }
  }
  const isOverdue = new Date(task.deadline) < new Date() && !task.completed
  const isToday = new Date(task.deadline).toDateString() === new Date().toDateString()
  const isUpcoming =
    new Date(task.deadline) > new Date() &&
    new Date(task.deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/15 text-red-700 dark:text-red-400 border border-red-500/20"
      case "medium":
        return "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20"
      case "low":
        return "bg-green-500/15 text-green-700 dark:text-green-400 border border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDeadlineColor = () => {
    if (isOverdue) return "text-destructive font-semibold"
    if (isToday) return "text-primary font-semibold"
    if (isUpcoming) return "text-accent font-semibold"
    return "text-muted-foreground"
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div
      className={`bg-card border border-border rounded-xl p-5 flex items-start gap-4 transition-all hover:shadow-md ${
        task.completed ? "opacity-60 bg-card/50" : ""
      }`}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 pt-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={isToggling}
          className="w-5 h-5 rounded border border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer accent-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3
            className={`text-base font-semibold ${
              task.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 ${getPriorityColor(task.priority || "medium")}`}
          >
            {(task.priority || "medium").charAt(0).toUpperCase() + (task.priority || "medium").slice(1)}
          </span>
        </div>

        {task.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>}

        <div className="flex items-center gap-4 text-xs">
          <span className={`${getDeadlineColor()}`}>
            {formatDate(task.deadline)}
            {isOverdue && " • Overdue"}
            {isToday && " • Today"}
            {isUpcoming && " • This week"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex gap-2">
        <Button
          onClick={() => onEdit(task)}
          size="sm"
          disabled={isDeleting || isToggling}
          className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 h-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          size="sm"
          disabled={isDeleting || isToggling}
          className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/30 h-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  )
}
