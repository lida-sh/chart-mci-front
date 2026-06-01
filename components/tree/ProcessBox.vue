<template>
  <div class="flex flex-col gap-10 items-center justify-center border-2 border-dashed p-8 border-blue-400 ">
    <NuxtLink :to="`/processes/${item.slug}`" class="bg-green-100 border border-green-400 flex flex-col max-w-[15rem] w-full gap-2 items-center justify-center px-4 py-2 rounded-lg text-sm font-medium">
       <span class="whitespace-nowrap"> فرایند {{item.title}}</span>
       <span class="en"> {{item.code}}</span>
    </NuxtLink>
    <tree-sub-process-box v-for="subProcess in item.subProcesses" :item="subProcess"></tree-sub-process-box>
  </div>
</template>

<script setup lang="ts">

import type { ProcessTreeStructDto } from '~/composables/processes/process.dto';

const props = defineProps<{item: ProcessTreeStructDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>