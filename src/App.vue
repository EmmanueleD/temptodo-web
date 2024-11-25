<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <PWAPrompt />
</template>

<script setup>
import PWAPrompt from './components/PWAPrompt.vue'
</script>