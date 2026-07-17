<template>
  <div class="w-full h-screen flex items-center justify-center bg-slate-900">
    <div
      class="relative flex items-center justify-center"
      style="width: 500px; height: 500px;"
    >
      <!-- مرکز -->
      <div
        class="absolute z-20 w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl"
      >
        ETOM
      </div>

      <!-- آیکون‌ها -->
      <div
        v-for="(icon, index) in icons"
        :key="index"
        :ref="el => iconRefs[index] = el"
        class="absolute z-10 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center font-bold"
      >
        {{ icon }}
      </div>

      <!-- نقاط رنگی -->
      <div class="points-orbit absolute inset-0">
  <div
    v-for="(color, index) in colors"
    :key="index"
    :ref="el => pointRefs[index] = el"
    class="point absolute"
    :style="{ backgroundColor: color }"
  ></div>
</div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ref, onMounted } from 'vue'

const icons = ['1', '2', '3', '4', '5', '6']
const colors = ['#22c55e', '#f59e0b', '#ef4444']

const iconRefs = ref([])
const pointRefs = ref([])

onMounted(() => {
  // ------------------
  // آیکون‌ها
  // ------------------
  const iconRadius = 240
  const iconCount = icons.length

  iconRefs.value.forEach((el, i) => {
    const angle = (i / iconCount) * Math.PI * 2

    const x = Math.cos(angle) * iconRadius
    const y = Math.sin(angle) * iconRadius

    gsap.set(el, { x, y })

    gsap.to(el, {
      x: Math.cos(angle) * (iconRadius + 15),
      y: Math.sin(angle) * (iconRadius + 15),
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      // delay: i * 0.15
    })
  })

  // ------------------
  // نقاط رنگی
  // ------------------
  const angles = [0, 120, 240]
const radius = 200

pointRefs.value.forEach((el, i) => {
  const rad = angles[i] * Math.PI / 180

  gsap.set(el, {
    left: '50%',
    top: '50%',
    xPercent: -50,
    yPercent: -50,
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius
  })
})

  // فقط یک بار هنگام لود
  gsap.fromTo(
    '.points-orbit',
    {
      rotation: -90,
      opacity: 0
    },
    {
      rotation: 0,
      opacity: 1,
      duration: 2.5,
      ease: 'power3.out'
    }
  )
})
</script>
<style>
.points-orbit {
  width: 100%;
  height: 100%;
  position: absolute;
}

.point {
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  position: absolute;
}

</style>