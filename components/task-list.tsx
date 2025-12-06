"use client"

import type { Task } from "./dashboard-page"
import TaskCard from "@/components/task-card"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
  onEdit: (task: Task) => void
}

export default function TaskList({ tasks, onDelete, onToggleComplete, onEdit }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-xl">
        <div className="text-4xl mb-4">📝</div>
        <p className="text-foreground text-lg font-medium mb-2">No tasks yet</p>
        <p className="text-muted-foreground">Create your first task to get started and boost your productivity!</p>
      </div>
    )
  }

  // Sort tasks: incomplete first, then by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground mb-4">Your Tasks</h2>
      {sortedTasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} onToggleComplete={onToggleComplete} onEdit={onEdit} />
      ))}
    </div>
  )
}
