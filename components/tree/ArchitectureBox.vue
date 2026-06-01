<template>
    <div class="bg-blue-200 border border-blue-400 flex items-center justify-center px-5 py-6 rounded-lg">
       <span class="">{{title}}</span> 
    </div>
</template>

<script setup lang="ts">
 const props = defineProps<{title:string}>()
</script>

<style scoped>

</style>