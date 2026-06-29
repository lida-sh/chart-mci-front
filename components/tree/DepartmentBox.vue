<template>
    <NuxtLink :to="`/departments/${item.slug}`" class="inline-flex flex-col bg-gray-100 border border-indigo-400 text-center gap-2 items-center justify-center px-2 py-2 rounded-lg text-xs font-medium" style="flex-direction: column">
       <div class="block text-xs">اداره {{item.title}}</div>
       <div class="block"> ( {{item.positions}} پست )</div>
       
    </NuxtLink>
    <div class="flex flex-col border">
  
</div>
</template>

<script setup lang="ts">
import type { DepartmentTreeStructDto } from '~/composables/departments/department.dto';

const props = defineProps<{item: DepartmentTreeStructDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>