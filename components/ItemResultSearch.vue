<template>
    <div class="w-full bg-white rounded-lg flex flex-col lg:flex-row items-center shadow-lg p-5">
        <div class="-m-1.5 overflow-x-auto w-full">
            <div class="p-1.5 w-full inline-block align-middle">
                <div class="overflow-hidden">
                    <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 flex flex-row lg:flex-col">
                        <thead>
                            <tr class="flex flex-col lg:flex-row lg:w-full">
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    ردیف</th>
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    نوع سند</th>
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    نام سند</th>
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    کد</th>
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    معماری والد</th>
                                <th scope="col"
                                    class="px-6 py-3 text-start text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    فرایند والد</th>
                                <th scope="col"
                                    class="px-6 py-3 text-end text-base font-bold text-gray-500 uppercase dark:text-neutral-500">
                                    </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="flex flex-col lg:flex-row lg:w-full odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                       </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                    {{ item.type || "زیر فرایند"}}   </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                    {{ item.title }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    {{ item.code }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    {{ item.process.title }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                    {{ item.architecture.title }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <button type="button"
                                        class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400">جزئیات</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ArchitectureClientBaseDto } from '~/composables/architectures/architecture.dto';
import { ProcessBaseClientDto } from '../composables/processes/process.dto';

interface Item {
    title: string,
    type: string,
    code: string,
    created_at: string,
    process: ProcessBaseClientDto
    architecture: ArchitectureClientBaseDto
}
const props = defineProps<{ item: Item }>()
</script>

<style scoped></style>