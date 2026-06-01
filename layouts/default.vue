<template>
  <div class="flex flex-col w-full h-full">
    <TheMenu></TheMenu>
    <div class="flex w-full">
      <slot></slot>
    </div>
    <FooterClient></FooterClient>
  </div>
</template>

<script setup lang="ts">
import FooterClient from '~/components/FooterClient.vue';


</script>

<style scoped></style>