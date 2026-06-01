<template>
  <div
    ref="grid"
    class="relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 p-2
           rounded-2xl bg-neutral-950 overflow-hidden"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <!-- Glow overlay -->
    <div
      class="pointer-events-none absolute inset-0"
      :style="glowStyle"
    />

    <!-- Cells -->
    <div
      v-for="p in processes"
      :key="p.id"
      class="relative z-10 flex flex-col items-center justify-center
             h-32 rounded-xl bg-neutral-900
             border border-white/5
             shadow-[0_20px_40px_rgba(0,0,0,0.5)]
             transition-transform duration-300
             hover:-translate-y-1"
    >
      <div class="text-3xl mb-2">
        {{ p.icon }}
      </div>

      <div class="text-sm font-semibold text-neutral-200 text-center">
        {{ p.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const grid = ref(null)

const processes = [
  { id: 1, title: 'Fulfillment', icon: '📦' },
  { id: 2, title: 'Assurance', icon: '🛡️' },
  { id: 3, title: 'Billing', icon: '💳' },
  { id: 4, title: 'Customer Care', icon: '🎧' },
  { id: 5, title: 'Resource Mgmt', icon: '🧱' },
  { id: 6, title: 'Partner Mgmt', icon: '🤝' },
  { id: 1, title: 'Fulfillment', icon: '📦' },
  { id: 2, title: 'Assurance', icon: '🛡️' },
  { id: 3, title: 'Billing', icon: '💳' },
  { id: 4, title: 'Customer Care', icon: '🎧' },
  { id: 5, title: 'Resource Mgmt', icon: '🧱' },
  { id: 6, title: 'Partner Mgmt', icon: '🤝' },
]

const x = ref('50%')
const y = ref('50%')

const onMove = (e) => {
  const rect = grid.value.getBoundingClientRect()
  x.value = `${e.clientX - rect.left}px`
  y.value = `${e.clientY - rect.top}px`
}

const onLeave = () => {
  x.value = '50%'
  y.value = '50%'
}

const glowStyle = computed(() => ({
  background: `
    radial-gradient(
      600px circle at ${x.value} ${y.value},
      rgba(71, 73, 227, 0.35),
      rgba(71, 73, 227, 0.35) 30%,
      transparent 45%
    )
  `
}))
</script>
