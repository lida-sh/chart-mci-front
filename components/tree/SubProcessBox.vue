<template>
    <NuxtLink :to="`/sub-processes/${item.slug}`" class="bg-indigo-100 max-w-[15rem]                                                                        border border-indigo-400 flex flex-col gap-2 items-center justify-center px-4 py-2 rounded-lg text-sm font-medium">
       <span class="">زیر فرایند {{item.title}}</span>
       <span class="en"> {{item.code}}</span>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { SubProcessTreeStructDto } from '~/composables/sub-processes/subProcess.dto';

const props = defineProps<{item: SubProcessTreeStructDto}>()
</script>

<style scoped>
.en{
  font-family: 'Times New Roman', Times, serif;
}
</style>