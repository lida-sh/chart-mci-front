<template>
    <div class="inline-flex flex-col bg-amber-100 border border-amber-600 text-justify gap-2 items-center justify-center px-2 py-2 rounded-lg text-xs font-medium" style="flex-direction: column">
       <div class="block text-xs">مسئول دفتر</div>
       <div class="block"> ( {{positions}} پست )</div>
       
    </div>
    <div class="flex flex-col border">
  
</div>
</template>

<script setup lang="ts">
import type { DepartmentTreeStructDto } from '~/composables/departments/department.dto';

const props = defineProps<{positions: number}>()
</script>

<style scoped>

</style>