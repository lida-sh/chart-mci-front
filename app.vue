<template>
  <div>
    <NuxtLayout>
       <NuxtPage></NuxtPage>
    </NuxtLayout>
    <app-toast></app-toast>
  </div>
</template>
<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
});
</script>
