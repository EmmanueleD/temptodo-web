<template>
  <AppLayout>
    <div class="max-w-3xl mx-auto px-4 py-12">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-text mb-2">
          Your Todos
        </h2>
        <p class="text-text-secondary">
          Self-destruct in 24 hours
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="todoStore.loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="todoStore.error" class="text-center py-12">
        <div class="text-red-500">{{ todoStore.error }}</div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!todoStore.hasActiveTodos" class="bg-white rounded-xl shadow-sm p-8 text-center">
        <div class="flex flex-col items-center">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-text mb-2">No active todos</h3>
          <p class="text-text-secondary">Your todos will appear here</p>
        </div>
      </div>

      <!-- Todos List -->
      <div v-else>
        <TransitionGroup 
          name="todo-list" 
          tag="div"
          class="space-y-4"
        >
          <TodoItem
            v-for="todo in todoStore.sortedTodos"
            :key="todo._id"  
            :todo="todo"
            @delete="handleDeleteTodo"
          />
        </TransitionGroup>
      </div>

      <!-- Add Todo Button -->
      <button 
        class="fixed bottom-8 right-8 bg-primary text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        @click="showAddTodo = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <!-- Add Todo Modal -->
      <AddTodoModal 
        :is-open="showAddTodo"
        @close="showAddTodo = false"
        @add="handleAddTodo"
      />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import AppLayout from '../components/layout/AppLayout.vue'
import AddTodoModal from '../components/todos/AddTodoModal.vue'
import TodoItem from '../components/todos/TodoItem.vue'

const todoStore = useTodoStore()
const showAddTodo = ref(false)
let updateInterval = null

onMounted(async () => {
  // Fetch initial todos
  await todoStore.fetchTodos()
  
  // Start periodic updates
  updateInterval = setInterval(() => {
    todoStore.updateTimeLeft()
  }, 60000) // Update every minute
})

onUnmounted(() => {
  // Clean up interval on component destroy
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

const handleAddTodo = async (todoData) => {
  try {
    await todoStore.addTodo(todoData)
    showAddTodo.value = false
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
}

const handleDeleteTodo = async (id) => {
  try {
    await todoStore.deleteTodo(id)
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
}
</script>

<style scoped>
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.3s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Assicura che gli elementi mantengano il loro spazio durante l'animazione */
.todo-list-move {
  transition: transform 0.3s ease;
}
</style>