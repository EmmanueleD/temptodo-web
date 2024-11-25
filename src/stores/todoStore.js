import { defineStore } from 'pinia'
import api from '../services/api'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    loadingStates: {
      fetchTodos: false,
      addTodo: false,
      deleteTodo: {},
      updateTodo: {}
    },
    error: null
  }),

  getters: {
    sortedTodos: (state) => {
      return [...state.todos].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
    },
    
    hasActiveTodos: (state) => state.todos.length > 0,

    isLoading: (state) => (action, id = null) => {
      if (id) {
        return state.loadingStates[action][id] || false
      }
      return state.loadingStates[action]
    }
  },

  actions: {
    calculateTimeLeft(createdAt) {
      const now = new Date()
      const created = new Date(createdAt)
      const expiresAt = new Date(created.getTime() + (24 * 60 * 60 * 1000))
      
      const diff = expiresAt - now
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      return {
        hours,
        minutes,
        expired: diff <= 0
      }
    },

    updateTimeLeft() {
      // Update timeLeft for each todo
      this.todos = this.todos.map(todo => ({
        ...todo,
        timeLeft: this.calculateTimeLeft(todo.createdAt)
      }))

      // Remove expired todos
      this.todos = this.todos.filter(todo => !todo.timeLeft.expired)
    },

    async fetchTodos() {
      this.loadingStates.fetchTodos = true
      try {
        const response = await api.todos.getAll()
        this.todos = response.data.map(todo => ({
          ...todo,
          timeLeft: this.calculateTimeLeft(todo.createdAt)
        }))
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch todos'
        console.error('Error fetching todos:', error)
      } finally {
        this.loadingStates.fetchTodos = false
      }
    },

    // Create new todo
    async addTodo(todoData) {
      this.loadingStates.addTodo = true
      try {
        const response = await api.todos.create(todoData)
        this.todos.unshift(response.data)
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create todo'
        throw error
      } finally {
        this.loadingStates.addTodo = false
      }
    },

    // Update todo
    async updateTodo(id, todoData) {
      this.loadingStates.updateTodo[id] = true
      try {
        const response = await api.todos.update(id, todoData)
        const index = this.todos.findIndex(todo => todo._id === id)
        if (index !== -1) {
          this.todos[index] = { ...this.todos[index], ...response.data }
        }
        this.error = null
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update todo'
        throw error
      } finally {
        delete this.loadingStates.updateTodo[id]
      }
    },

    // Delete todo
    async deleteTodo(id) {
      this.loadingStates.deleteTodo[id] = true
      try {
        await api.todos.delete(id)
        this.todos = this.todos.filter(todo => todo._id !== id)
        this.error = null
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete todo'
        throw error
      } finally {
        delete this.loadingStates.deleteTodo[id]
      }
    },

    // Update todo notification
    async updateTodoNotification(id, notifyAt) {
      return this.updateTodo(id, { notifyAt })
    },

    // Clear error
    clearError() {
      this.error = null
    },

    // Start automatic cleanup of expired todos
    startAutoCleanup() {
      setInterval(() => {
        const now = new Date()
        this.todos = this.todos.filter(todo => {
          const expiresAt = new Date(todo.createdAt)
          expiresAt.setHours(expiresAt.getHours() + 24)
          return expiresAt > now
        })
      }, 60000) // Check every minute
    }
  }
})