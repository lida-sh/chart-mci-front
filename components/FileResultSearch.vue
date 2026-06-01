<template>
    <div class="w-full bg-white border rounded-lg shadow-lg py-5 px-5  select-none">
        <div class="w-full flex flex-col xl:grid xl:grid-cols-12 gap-2 xl:gap-2">

            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-sm font-bold text-gray-500">
                    ردیف</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ rowNumber }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    نام فایل</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 xl:whitespace-wrap text-xs sm:text-sm xl:text-xs  font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.file_name }}
                </div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    نام سند</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-3 text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ truncatedTitle }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    کد</div>
                <div
                    class="en flex items-center justify-start xl:justify-center xl:col-span-2 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.code }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    معماری والد</div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ item.architecture_name }}</div>
            </div>

            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    پیدا شده در متن
                </div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ arrayState(item.found_in_text) === 0
                        ? '-'
                        : arrayState(item.found_in_text) === 1
                            ? 'صفحه'
                            : 'صفحات' }} {{ useArrayToString(item.found_in_text) }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-2 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 text-xs sm:text-sm xl:text-xs 2xl:text-base font-bold text-gray-500">
                    پیدا شده در تصویر
                </div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-2 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs 2xl:text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {{ arrayState(item.found_in_images) === 0
                        ? '-'
                        : arrayState(item.found_in_images) === 1
                            ? 'صفحه'
                            : 'صفحات' }} {{ useArrayToString(item.found_in_images) }}</div>
            </div>
            <div class="grid grid-cols-2 xl:col-span-1 gap-4 lg:gap-2 xl:flex xl:flex-col xl:w-full">
                <div class=""></div>
                <div
                    class="flex items-center justify-start xl:justify-center xl:col-span-1 xl:whitespace-nowrap text-xs sm:text-sm xl:text-xs  font-medium">
                    <button @click="openDetails(item.file_path, item.found_in_text, item.found_in_images, item.dir, keyword)"
                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">
                        مشاهده فایل</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">

import { ProcessClientDto } from '../composables/processes/process.dto';
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps<{ item: any, rowNumber: number, typeDoc: string, keyword: string }>()
const truncatedTitle = computed(() => {
    if (props.item.doc_name) {
        return props.item.doc_name.length > 50 ? props.typeDoc + ' ' + props.item.doc_name.slice(0, 50) + '...' : props.typeDoc + ' ' + props.item.doc_name
    } else {
        return ""
    }

})
const openDetails = ($path, $textPages, $imagePages, $dir, $keyword) => {
   
    router.push({
        path: '/pdf-viewer',
        query: {
            path: $path,
            keyword: $keyword,
            dir: $dir,
            textPages: JSON.stringify($textPages),
            imagePages: JSON.stringify($imagePages),

        }
    })
}
const useArrayToString = (arr) => {
    return arr.slice()      // برای اینکه آرایه اصلی تغییر نکند
        .reverse().join(',');
};
const arrayState = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return 0;        // آرایه مقداری ندارد
    }

    if (arr.length === 1) {
        return 1;       // فقط یک مقدار دارد
    }

    return 2;       // بیشتر از یک مقدار دارد
}
 
</script>

<style scoped>
.en {
    font-family: serif;
}
</style>