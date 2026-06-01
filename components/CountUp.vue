<template>
  <span class="" ref="counterRef">{{ displayValue }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
  end: number
  duration?: number
}>()

const displayValue = ref(0)
const counterRef = ref<HTMLElement | null>(null)
let started = false

const startAnimation = () => {
  if (started) return
  started = true

  const duration = props.duration ?? 1500
  const startTime = performance.now()

  const animate = (time: number) => {
    const progress = Math.min((time - startTime) / duration, 1)
    displayValue.value = Math.floor(progress * props.end)

    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startAnimation()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )

  if (counterRef.value) observer.observe(counterRef.value)
})
</script>
