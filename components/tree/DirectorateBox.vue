<template>
  <div class="flex flex-col gap-2 items-center justify-center border-2 border-dashed border-rounded p-2 border-purple-400">
    <NuxtLink :to="`/directorates/${item.slug}`" class="bg-[#9AD872] text-justify border border-[#468432] flex flex-col gap-2 items-center justify-center  p-2 rounded-lg text-xs font-medium">
       <span class="w-full"> اداره کل {{item.title}}</span>
       <span> ( {{item.positions}} پست )</span>
    </NuxtLink>
    <tree-department-box v-for="department in item.departments" :item="department"></tree-department-box>
  </div>
</template>

<script setup lang="ts">

import type { DirectorateTreeStructDto } from '~/composables/directorates/directorate.dto';

const props = defineProps<{item: DirectorateTreeStructDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>