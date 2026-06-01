<template>
    <div class="flex flex-col lg:flex-row justify-center items-start w-full gap-4 px-10 py-14 bg-[#F7F7F7]">
        <section class="px-4 w-full h-full flex flex-col items-start gap-4 max-w-[100rem]">
            <h1 class=" font-sm xl:text-base font-bold mb-4 mr-4">نتایج جستجو:</h1>
            <sub-process-result-search v-if="data?.subProcesses" v-for="(itemDoc, index) in data?.subProcesses"
                :key="index" :item="itemDoc"></sub-process-result-search>
            <process-result-search v-if="data?.processes" v-for="(itemDoc, index) in data?.processes"
                :key="index" :item="itemDoc"></process-result-search>
            <procedure-result-search v-if="data?.procedures" v-for="(itemDoc, index) in data?.procedures"
                :key="index" :item="itemDoc"></procedure-result-search>
        </section>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>