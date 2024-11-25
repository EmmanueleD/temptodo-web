<template>
  <div class="min-h-screen bg-gradient-to-b from-white to-purple-50">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary">
              TempTodo
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/login"
              class="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
            <router-link 
              to="/register"
              class="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
            >
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            The Most Satisfying Todo List
            <span class="block text-primary">Ever Created</span>
          </h1>
          <p class="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500">
            Watch as your completed tasks elegantly fade away within 24 hours, 
            giving you that clean-slate feeling you crave.
          </p>
          <div class="mt-8 flex justify-center">
            <router-link
              to="/register"
              class="px-8 py-4 bg-primary text-white rounded-lg font-medium text-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Clean Slate Journey
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center p-6">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Elegant Fading</h3>
            <p class="text-gray-600">
              Tasks gracefully become more transparent over time, 
              creating a beautiful visual representation of your productivity.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center p-6">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">24-Hour Lifecycle</h3>
            <p class="text-gray-600">
              Every task has a natural lifecycle. Complete it and watch it 
              disappear within 24 hours - no cleanup required.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center p-6">
            <div class="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Smart Notifications</h3>
            <p class="text-gray-600">
              Set reminders and get notified before your tasks fade away, 
              ensuring nothing important gets missed.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Proof Section -->
    <div class="py-20 bg-purple-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-12">
          Join the Ranks of Organized Minds
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Testimonial 1 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600 italic mb-4">
              "Finally, a todo list that understands my need for a clean slate. 
              The fading feature is absolutely genius!"
            </p>
            <p class="font-medium">Sarah K.</p>
            <p class="text-sm text-gray-500">Project Manager</p>
          </div>

          <!-- Testimonial 2 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600 italic mb-4">
              "The visual satisfaction of watching completed tasks fade away 
              is oddly therapeutic. I'm obsessed!"
            </p>
            <p class="font-medium">Michael R.</p>
            <p class="text-sm text-gray-500">UX Designer</p>
          </div>

          <!-- Testimonial 3 -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <p class="text-gray-600 italic mb-4">
              "This app turned my daily task management into a mindful practice. 
              It's beautiful and practical."
            </p>
            <p class="font-medium">Emma T.</p>
            <p class="text-sm text-gray-500">Content Creator</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Ready for Your Perfect Todo List?
        </h2>
        <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of productivity enthusiasts who have discovered 
          the satisfaction of a self-cleaning todo list.
        </p>
        <router-link
          to="/register"
          class="inline-block px-8 py-4 bg-primary text-white rounded-lg font-medium text-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started Now - It's Free
        </router-link>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-50 border-t border-gray-100">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} TempTodo. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.bg-gradient-to-b {
  background-size: 100% 100%;
  background-position: 0px 0px;
}
</style>