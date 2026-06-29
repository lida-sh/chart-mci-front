<template>
  <div class="flex flex-col gap-2 items-center justify-center p-2">
    <NuxtLink :to="`/architectures/${item.slug}`" class="bg-[#9AD872] min-h-14 text-center border border-[#468432] flex flex-col gap-2 items-center justify-center  p-2 rounded-lg text-xs font-medium">
       <span class="w-full">{{item.displayTitle}}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">

import type { ArchitectureTreeStructBaseDto } from '~/composables/architectures/architecture.dto';

const props = defineProps<{item: ArchitectureTreeStructBaseDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>