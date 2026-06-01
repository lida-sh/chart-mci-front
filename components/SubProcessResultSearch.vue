<template>
    <div class="w-full bg-white border rounded-lg shadow-lg p-5 select-none">
        <div class="w-full flex flex-col xl:grid xl:grid-cols-12 gap-4 xl:gap-2">

            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    ردیف</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.rowNumber || rowNumber }}</div>
            </div>
            
            <div class="grid grid-cols-2 xl:col-span-3 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    نام سند</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ truncatedTitle }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    کد</div>
                <div
                    class="en flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.code }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    معماری والد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.architecture?.title }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    فرایند والد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.process?.title }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    تاریخ ابلاغ
                </div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.notification_date }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div class=""></div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1  text-sm xl:text-xs 2xl:text-sm font-medium">
                    <NuxtLink :to="`/sub-processes/${item.slug}`"
                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                        جزئیات</NuxtLink>
                </div>
            </div>

        </div>
        <!-- <div class="w-full grid grid-cols-2 items-start gap-4 justify-between xl:justify-center xl:flex xl:flex-col xl:items-center">
            <div class="grid grid-cols-1 gap-4 xl:gap-1 xl:grid xl:grid-cols-12 xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    ردیف</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    نوع سند</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    نام سند</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    کد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    معماری والد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    فرایند والد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    تاریخ ابلاغ</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4 xl:gap-1 xl:grid xl:grid-cols-12 xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.rowNumber || rowNumber }}</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.type || "زیر فرایند" }}
                </div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ truncatedTitle }}</div>
                <div
                    class="en flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.code }}</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.architecture?.title }}</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.process?.title }}</div>
                    <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.notification_date }}</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1  text-sm xl:text-xs 2xl:text-sm font-medium">
                    <NuxtLink :to="`/sub-processes/${item.slug}`"
                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                        جزئیات</NuxtLink>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import type { ArchitectureClientBaseDto } from '~/composables/architectures/architecture.dto';
import { ProcessBaseClientDto } from '../composables/processes/process.dto';
import type { SubProcessClientDto } from '~/composables/sub-processes/subProcess.dto';

// interface Item {
//     title: string,
//     type: string,
//     code: string,
//     created_at: string,
//     process: ProcessBaseClientDto
//     architecture: ArchitectureClientBaseDto
// }
const props = defineProps<{ item: SubProcessClientDto, rowNumber: number }>()
const truncatedTitle = computed(() => {
  return props.item.title.length > 50 ? props.item.title.slice(0, 50) + '...' : props.item.title
})
</script>

<style scoped>
.en {
    font-family: serif;
}
</style>