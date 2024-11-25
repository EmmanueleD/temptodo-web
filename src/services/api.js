import axios from 'axios'

const api = axios.create({
  baseURL: 'https://temptodo-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor per il token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor per gestire gli errori
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth endpoints
  auth: {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (credentials) => api.post('/auth/register', credentials),
    verify: () => api.get('/auth/verify')
  },
  
  // Todo endpoints
  todos: {
    getAll: () => api.get('/todos'),
    create: (data) => api.post('/todos', data),
    update: (id, data) => api.patch(`/todos/${id}`, data),
    delete: (id) => api.delete(`/todos/${id}`)
  }
}