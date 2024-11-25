<template>
  <div 
    class="bg-white rounded-lg shadow-sm p-4 mb-4 transform transition-all duration-200 hover:shadow-md"
    :class="[ { 'animate-pulse': isLoading }]"
    :style="opacityStyle"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <h3 class="text-lg font-medium text-text">{{ todo.title }}</h3>
        <div class="flex items-center mt-2 space-x-4">
          <!-- Time remaining -->
          <div class="flex items-center text-sm" :class="timeRemainingColor">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ timeRemaining }}</span>
          </div>
          
          <!-- Notification indicator -->
          <div v-if="todo.notifyAt" class="flex items-center text-sm text-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>{{ notificationTime }}</span>
          </div>
        </div>
      </div>

      <!-- Complete button -->
<button 
  @click="handleDelete"
  :disabled="isLoading"
  class="ml-4 p-2 text-text-secondary hover:text-green-500 rounded-full hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
>
  <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTodoStore } from '../../stores/todoStore'

const todoStore = useTodoStore()

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    validator(todo) {
      return todo && todo.title && todo._id;
    }
  }
})

// Check if todo is in loading state (e.g., being deleted)
const isLoading = computed(() => {
  return todoStore.isLoading('deleteTodo', props.todo._id)
})

// Calculate time remaining with improved color indication
const timeRemaining = computed(() => {
  try {
    const now = new Date()
    const createdAt = new Date(props.todo.createdAt)
    const expiresAt = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000))
    const diff = expiresAt - now

    if (diff <= 0) return 'Expired'

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`
  } catch (error) {
    console.error('Error calculating time remaining:', error)
    return 'Time calculation error'
  }
})

// Color class based on time remaining
const timeRemainingColor = computed(() => {
  const now = new Date()
  const createdAt = new Date(props.todo.createdAt)
  const expiresAt = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000))
  const diff = expiresAt - now

  if (diff <= 0) return 'text-red-500'
  if (diff <= 1 * 60 * 60 * 1000) return 'text-red-500' // less than 1 hour
  if (diff <= 3 * 60 * 60 * 1000) return 'text-orange-500' // less than 3 hours
  if (diff <= 6 * 60 * 60 * 1000) return 'text-yellow-500' // less than 6 hours
  return 'text-text-secondary'
})

// Format notification time
const notificationTime = computed(() => {
  if (!props.todo.notifyAt) return null

  // Calcola tempo di scadenza (24h dopo la creazione)
  const createdAt = new Date(props.todo.createdAt)
  const expiresAt = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000))
  
  // Calcola tempo di notifica
  const notifyAt = new Date(props.todo.notifyAt)
  
  // Calcola la differenza tra scadenza e notifica
  const diff = expiresAt - notifyAt

  // Converti in ore e minuti
  const totalMinutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // Formatta il risultato
  if (hours > 0) {
    return `${hours}h ${minutes}m before`
  } else {
    return `${minutes}m before`
  }
})

// Opacity classes based on time remaining
const opacityStyle = computed(() => {
  const now = new Date()
  const createdAt = new Date(props.todo.createdAt)
  const expiresAt = new Date(createdAt.getTime() + (24 * 60 * 60 * 1000))
  const diff = expiresAt - now

  if (diff <= 0) {
    return 'opacity: 0.3;'
  }

  const totalTime = 24 * 60 * 60 * 1000 // 24 hours in ms
  const remainingPercentage = (diff / totalTime) * 100

  // Map the remaining percentage to an opacity value between 30 and 100
  const opacity = Math.round(30 + (70 * remainingPercentage / 100))

  return `opacity: ${opacity / 100};`
})

// Handle delete with loading state
const handleDelete = async () => {
  try {
    await todoStore.deleteTodo(props.todo._id)
  } catch (error) {
    // Error handling is managed by the store
    console.error('Failed to delete todo:', error)
  }
}
</script>