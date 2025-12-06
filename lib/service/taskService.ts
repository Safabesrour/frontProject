import axios from "axios"

const BASEURL = "http://localhost:5000/api/"

const api = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Helper function to map MongoDB _id to id
const mapTaskId = (task: any) => {
  if (!task) return task
  if (task._id && !task.id) {
    return { ...task, id: task._id }
  }
  return task
}

// Helper function to map array of tasks
const mapTaskIds = (tasks: any[]) => {
  if (!Array.isArray(tasks)) return tasks
  return tasks.map(mapTaskId)
}

export interface CreateTaskPayload {
  title: string
  description: string
  deadline: string
  priority?: "low" | "medium" | "high"
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  completed?: boolean
}

export const taskService = {
  // Create a new task
  createTask: async (taskData: CreateTaskPayload) => {
    try {
      const response = await api.post("tasks", taskData)
      return mapTaskId(response.data)
    } catch (error) {
      console.error("Create task error:", error)
      throw error
    }
  },

  // Get all tasks for logged-in user
  getTasks: async (filters?: { status?: string; search?: string; sort?: string }) => {
    try {
      const params = new URLSearchParams()
      if (filters?.status) params.append("status", filters.status)
      if (filters?.search) params.append("search", filters.search)
      if (filters?.sort) params.append("sort", filters.sort)

      const response = await api.get(`tasks${params.toString() ? "?" + params.toString() : ""}`)
      return mapTaskIds(response.data)
    } catch (error) {
      console.error("Get tasks error:", error)
      throw error
    }
  },

  // Update a task
  updateTask: async (taskId: string, taskData: Partial<UpdateTaskPayload>) => {
    try {
      const response = await api.put(`tasks/${taskId}`, taskData)
      return mapTaskId(response.data)
    } catch (error) {
      console.error("Update task error:", error)
      throw error
    }
  },

  // Delete a task
  deleteTask: async (taskId: string) => {
    try {
      const response = await api.delete(`tasks/${taskId}`)
      return response.data
    } catch (error) {
      console.error("Delete task error:", error)
      throw error
    }
  },

  // Toggle task completion status
  toggleTaskComplete: async (taskId: string, completed: boolean) => {
    try {
      const response = await api.put(`tasks/${taskId}`, { completed })
      return mapTaskId(response.data)
    } catch (error) {
      console.error("Toggle task error:", error)
      throw error
    }
  },
}
