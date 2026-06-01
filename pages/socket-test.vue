<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">🧪 OCR Socket Test (Nuxt 3 + TS)</h1>
    
    <!-- کنترل‌ها -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <UButton
        @click="testConnection"
        color="blue"
        variant="solid"
        class="justify-center"
      >
        <template #leading>
          <div class="i-heroicons-link-20-solid w-5 h-5" />
        </template>
        Test Connection
      </UButton>
      
      <UButton
        @click="simulateOcr"
        color="green"
        variant="solid"
        class="justify-center"
      >
        <template #leading>
          <div class="i-heroicons-document-20-solid w-5 h-5" />
        </template>
        Simulate OCR
      </UButton>
      
      <UButton
        @click="startProgress"
        color="purple"
        variant="solid"
        class="justify-center"
      >
        <template #leading>
          <div class="i-heroicons-chart-bar-20-solid w-5 h-5" />
        </template>
        Test Progress
      </UButton>
    </div>

    <!-- وضعیت اتصال -->
    <UCard class="mb-6">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Connection Status</h3>
          <UBadge 
            :color="connectionStatusColor" 
            variant="subtle"
          >
            {{ connectionStatus }}
          </UBadge>
        </div>
      </template>
      
      <div class="flex items-center space-x-3">
        <UIcon 
          :name="connectionStatusIcon" 
          class="w-6 h-6" 
          :class="connectionStatusIconColor"
        />
        <div>
          <p class="font-medium">{{ connectionStatusMessage }}</p>
          <p class="text-sm text-gray-500">Socket ID: {{ socketId }}</p>
        </div>
      </div>
    </UCard>

    <!-- پیشرفت -->
    <UCard v-if="progress > 0" class="mb-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">OCR Progress</h3>
          <span class="text-sm font-medium text-gray-600">{{ progress }}%</span>
        </div>
      </template>
      
      <UProgress 
        :value="progress" 
        size="md" 
        color="green"
      />
      
      <p v-if="currentFile" class="text-sm text-gray-600 mt-2">
        Processing: {{ currentFile }}
      </p>
    </UCard>

    <!-- پیام‌ها -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Real-time Messages</h3>
          <UButton
            @click="clearMessages"
            color="gray"
            variant="ghost"
            size="sm"
          >
            Clear
          </UButton>
        </div>
      </template>

      <div v-if="messages.length === 0" class="text-center py-8 text-gray-500">
        <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>No messages yet. Click buttons above to test socket connection.</p>
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
        >
          <div class="flex justify-between items-start">
            <p class="font-medium text-blue-800">{{ message.text }}</p>
            <span class="text-xs text-blue-600">{{ message.time }}</span>
          </div>
          
          <div v-if="message.data" class="mt-2">
            <UAccordion :items="accordionItems(message)" />
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { SocketMessage, ConnectionStatus, OcrResult } from '~/types/socket'

// State
const messages = ref<Array<{ text: string; data?: any; time: string }>>([])
const connectionStatus = ref<ConnectionStatus['status']>('disconnected')
const connectionStatusMessage = ref<string>('Not connected to server')
const progress = ref<number>(0)
const currentFile = ref<string>('')
const socketId = ref<string>('')

// Computed
const connectionStatusColor = computed(() => {
  switch (connectionStatus.value) {
    case 'connected': return 'green'
    case 'connecting': return 'yellow'
    default: return 'red'
  }
})

const connectionStatusIcon = computed(() => {
  switch (connectionStatus.value) {
    case 'connected': return 'i-heroicons-check-circle-20-solid'
    case 'connecting': return 'i-heroicons-arrow-path-20-solid'
    default: return 'i-heroicons-x-circle-20-solid'
  }
})

const connectionStatusIconColor = computed(() => {
  switch (connectionStatus.value) {
    case 'connected': return 'text-green-500'
    case 'connecting': return 'text-yellow-500'
    default: return 'text-red-500'
  }
})

// Methods
const setupSocketConnection = () => {
  const { $echo } = useNuxtApp()
  
  if (!$echo) {
    addMessage('Echo not available - running on server side?')
    return
  }

  // گوش دادن به اتصال
  $echo.connector.socket.on('connect', () => {
    connectionStatus.value = 'connected'
    connectionStatusMessage.value = 'Connected to Laravel Echo Server'
    socketId.value = $echo.socketId()
    addMessage('Socket connected successfully!')
  })

  $echo.connector.socket.on('disconnect', () => {
    connectionStatus.value = 'disconnected'
    connectionStatusMessage.value = 'Disconnected from server'
    socketId.value = ''
    addMessage('Socket disconnected')
  })

  $echo.connector.socket.on('reconnecting', (attempt: number) => {
    connectionStatus.value = 'connecting'
    connectionStatusMessage.value = `Reconnecting... (attempt ${attempt})`
  })

  $echo.connector.socket.on('connect_error', (error: Error) => {
    connectionStatus.value = 'error'
    connectionStatusMessage.value = `Connection error: ${error.message}`
    addMessage(`Connection error: ${error.message}`)
  })

  // گوش دادن به کانال تست
  $echo.channel('test-ocr-channel')
    .listen('.ocr.message', (data: SocketMessage) => {
      addMessage(data.message, data.data)
      
      // به روز رسانی پیشرفت
      if (data.data && data.data.progress) {
        progress.value = data.data.progress
      }
      
      if (data.data && data.data.current_file) {
        currentFile.value = data.data.current_file
      }
      
      // اگر پردازش کامل شد
      if (data.data && data.data.progress === 100) {
        setTimeout(() => {
          progress.value = 0
          currentFile.value = ''
        }, 2000)
      }
    })

  connectionStatus.value = 'connecting'
  connectionStatusMessage.value = 'Connecting to socket server...'
}

const testConnection = async (): Promise<void> => {
  try {
    const { data: response } = await useFetch('/test-broadcast', {
      baseURL: 'http://localhost:8000'
    })
    addMessage('Test broadcast sent to Laravel')
  } catch (error: any) {
    addMessage('Error sending test: ' + error.message)
  }
}

const simulateOcr = async (): Promise<void> => {
  const keyword = 'قاسم'
  try {
    progress.value = 0
    const { data: response } = await useFetch(`/simulate-ocr/${encodeURIComponent(keyword)}`, {
      baseURL: 'http://localhost:8000'
    })
    addMessage(`OCR simulation started for "${keyword}"`)
  } catch (error: any) {
    addMessage('Error simulating OCR: ' + error.message)
  }
}

const startProgress = async (): Promise<void> => {
  try {
    progress.value = 0
    const { data: response } = await useFetch('/ocr-progress', {
      baseURL: 'http://localhost:8000'
    })
    addMessage('Progress simulation started')
  } catch (error: any) {
    addMessage('Error starting progress: ' + error.message)
  }
}

const addMessage = (text: string, data: any = null): void => {
  messages.value.unshift({
    text,
    data,
    time: new Date().toLocaleTimeString()
  })
  
  // محدود کردن تعداد پیام‌ها
  if (messages.value.length > 20) {
    messages.value.pop()
  }
}

const clearMessages = (): void => {
  messages.value = []
}

const accordionItems = (message: any) => {
  return [{
    label: 'View Data',
    content: `
      <div class="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-auto">
        <pre>${JSON.stringify(message.data, null, 2)}</pre>
      </div>
    `
  }]
}

// Lifecycle
onMounted(() => {
  setupSocketConnection()
})

onBeforeUnmount(() => {
  const { $echo } = useNuxtApp()
  if ($echo) {
    $echo.leave('test-ocr-channel')
    $echo.disconnect()
  }
})
</script>