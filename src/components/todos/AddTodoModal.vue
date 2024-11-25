<template>
  <Modal :is-open="isOpen" @close="$emit('close')">
    <div class="sm:flex sm:items-start">
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
        <h3 class="text-xl font-semibold leading-6 text-text">
          Add New Todo
        </h3>
        
        <div class="mt-6">
          <form @submit.prevent="handleSubmit">
            <!-- Todo Title -->
            <div class="mb-6">
              <label for="title" class="block text-sm font-medium text-text mb-2">
                What needs to be done?
              </label>
              <input
                id="title"
                type="text"
                v-model="title"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your todo"
                :maxlength="maxLength"
                required
              />
              <div class="mt-1 text-sm text-text-secondary flex justify-between">
                <span>{{ characterCount }}/{{ maxLength }} characters</span>
                <span>Will self-destruct in 24h</span>
              </div>
            </div>

            <!-- Notification Time -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-text mb-2">
                Notify me before expiration
              </label>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="notificationType"
                    value="30"
                    class="mr-2 text-primary focus:ring-primary"
                  />
                  <span>30 minutes before</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="notificationType"
                    value="60"
                    class="mr-2 text-primary focus:ring-primary"
                  />
                  <span>1 hour before</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="notificationType"
                    value="custom"
                    class="mr-2 text-primary focus:ring-primary"
                  />
                  <span>Custom time before</span>
                </label>

                <!-- Custom Time Input -->
                <div 
                  v-if="notificationType === 'custom'"
                  class="flex items-center ml-6 mt-2"
                >
                  <input
                    type="number"
                    v-model="customHours"
                    min="1"
                    max="23"
                    class="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <span class="ml-2 text-sm text-text-secondary">hours before</span>
                </div>

                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="notificationType"
                    value="0"
                    class="mr-2 text-primary focus:ring-primary"
                  />
                  <span>Don't notify me</span>
                </label>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                class="w-full sm:w-auto sm:ml-3 inline-flex justify-center rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                :disabled="!isValid"
              >
                Create Todo
              </button>
              <button
                type="button"
                class="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-md bg-white px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '../ui/Modal.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'add'])

const title = ref('')
const notificationType = ref('30')
const customHours = ref(2)
const maxLength = 100

const characterCount = computed(() => title.value.length)

const isValid = computed(() => {
  if (!title.value.trim()) return false
  if (notificationType.value === 'custom' && (!customHours.value || customHours.value < 1 || customHours.value > 23)) {
    return false
  }
  return true
})

const getNotificationMinutes = () => {
  if (notificationType.value === 'custom') {
    return customHours.value * 60
  }
  return parseInt(notificationType.value)
}

const handleSubmit = async () => {
  if (title.value.trim()) {
    const todoData = {
      title: title.value,
      notifyAt: calculateNotificationTime() // Funzione per calcolare il tempo di notifica
    }
    
    try {
      await emit('add', todoData)
      title.value = ''
      emit('close')
    } catch (error) {
      // Gestione errori
      console.error('Failed to create todo:', error)
    }
  }
}

const calculateNotificationTime = () => {
  if (notificationType.value === 'custom') {
    const hours = parseInt(customHours.value)
    if (hours > 0 && hours < 24) {
      const notifyAt = new Date()
      notifyAt.setHours(notifyAt.getHours() + (24 - hours))
      return notifyAt.toISOString()
    }
  } else {
    const minutes = parseInt(notificationType.value)
    if (minutes > 0) {
      const notifyAt = new Date()
      notifyAt.setHours(notifyAt.getHours() + 24)
      notifyAt.setMinutes(notifyAt.getMinutes() - minutes)
      return notifyAt.toISOString()
    }
  }
  return null
}
</script>