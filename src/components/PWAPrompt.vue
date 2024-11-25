<template>
  <div v-if="showInstallPrompt" 
       class="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200">
    <div class="max-w-3xl mx-auto flex items-center justify-between">
      <div>
        <h3 class="text-lg font-semibold">Install TempTodo</h3>
        <p class="text-sm text-gray-600">Add to your home screen for quick access</p>
      </div>
      <div class="flex gap-2">
        <button @click="closePrompt" 
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
          Not now
        </button>
        <button @click="installPWA" 
                class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Install
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const deferredPrompt = ref(null)
const showInstallPrompt = ref(false)

const handleBeforeInstallPrompt = (e) => {
  e.preventDefault()
  deferredPrompt.value = e
  showInstallPrompt.value = true
}

const installPWA = async () => {
  if (!deferredPrompt.value) return
  
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  
  if (outcome === 'accepted') {
    console.log('PWA installed')
  }
  
  deferredPrompt.value = null
  showInstallPrompt.value = false
}

const closePrompt = () => {
  showInstallPrompt.value = false
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})
</script>