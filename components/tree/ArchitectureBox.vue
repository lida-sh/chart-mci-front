<template>
    <div class="bg-purple-200 border border-purple-400 text-xs flex items-center justify-center px-5 py-6 rounded-lg" >
       <span class="">{{title}}</span> 
    </div>
</template>

<script setup lang="ts">
 const props = defineProps<{title:string}>()
</script>

<style scoped>

</style>