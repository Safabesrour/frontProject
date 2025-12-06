import axios from "axios"

const BASEURL = "https://backproject-a35a.onrender.com/api/auth/"

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

export const authService = {
  register: async (email: string, password: string, name: string) => {
    try {
      const response = await api.post("register", {
        email,
        name,
        password,
      })
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token)
        console.log("Registration successful, token stored.")
      }
      return response.data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await api.post("login", {
        email,
        password,
      })
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token)
        console.log("Login successful, token stored.")
      }
      return response.data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("taskAppUser")
  },

  getCurrentUser: () => {
    return localStorage.getItem("taskAppUser")
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },
}