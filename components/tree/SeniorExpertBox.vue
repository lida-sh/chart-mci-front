<template>
    <NuxtLink to="" class="inline-flex flex-col bg-red-100 border border-indigo-400 text-justify gap-2 items-center justify-center px-2 py-2 rounded-lg text-xs font-medium" style="flex-direction: column">
       <div class="block text-xs">کارشناس {{item.title}}</div>
       <div class="block"> ( {{item.positions_count}} پست )</div>
       
    </NuxtLink>
    <div class="flex flex-col border">
  
</div>
</template>

<script setup lang="ts">
import type { SeniorExpertTreeStructDto } from '~/composables/architectures/architecture.dto';


const props = defineProps<{item: SeniorExpertTreeStructDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>