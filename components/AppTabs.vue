<template>
    <div>
        <div class="tabs tabs-lift flex">
            <button v-for="(tab, index) in tabs" :key="index" class="tab tab-lifted border-base-300 rounded-t-lg overflow-hidden h-14 z-20 "
                :class="{'border-t border-r border-l border-b-0 bg-base-100 -mb-px z-0 font-medium': activeTab === index, '': activeTab != index}"  @click="activeTab = index">
                {{ tab.label }}
            </button>
        </div>

        <div class="-mt-px p-4 border-r border-l border-b border-t border-base-300 rounded-md overflow-hidden z-10 relative bg-base-100">
            <slot :name="'tab-' + activeTab" />
        </div>
    </div>
</template>

<script setup lang="ts">
interface TabType {label: string}
const props = defineProps<{tabs:TabType[]}>()

const activeTab = ref(0)

</script>

<style scoped></style>