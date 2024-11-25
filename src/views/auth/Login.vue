<template>
  <div class="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="text-center text-3xl font-bold text-text">
          TempTodo
        </h2>
        <p class="mt-2 text-center text-sm text-text-secondary">
          Sign in to your account
        </p>
      </div>
      <div class="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Error Alert -->
        <div v-if="authStore.error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
          {{ authStore.error }}
        </div>

        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-text">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                :disabled="authStore.loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-text">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="password"
                type="password"
                required
                :disabled="authStore.loading"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="authStore.loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <template v-if="authStore.loading">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </template>
              <template v-else>
                Sign in
              </template>
            </button>
          </div>
        </form>

        <div class="mt-6">
          <router-link 
            to="/register" 
            class="text-sm text-center block text-primary hover:text-primary/90"
          >
            Don't have an account? Sign up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/app')
  } catch (error) {
    // Error is handled by the store and displayed in the template
    console.error('Login failed:', error)
  }
}
</script>