<template>
  <div class="min-h-screen bg-background">
    <!-- Navbar -->
    <header class="bg-white border-b border-gray-100 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary">
              TempTodo
            </router-link>
          </div>

          <!-- User Menu -->
          <div class="flex items-center">
            <div class="ml-3 relative">
              <div class="flex items-center">
                <!-- User Email -->
                <span class="text-sm text-text-secondary mr-4">
                  {{ authStore.user?.email }}
                </span>

                <!-- Logout Button -->
                <button
                  @click="handleLogout"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-4 w-4 mr-2" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>