<template>
    <!-- <div class="flex h-screen justify-center items-start py-10 scroll-none"> -->
    <div
        class="flex flex-col items-center border bg-white opacity-85 border-gray-300 rounded-2xl w-[20rem] lg:w-[30rem] xl:w-[50rem] px-2 pt-2 pb-24 xl:px-4">
        <div class="sm:w-full sm:max-w-sm">
            <!-- <img class="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> -->
            <img class="mx-auto w-auto" src="/assets/images/file-icons/tci.png" alt="شرکت مخابرات ایران">
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:px-4 sm:max-w-md">
            <h2 class="mb-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">تغییر رمز عبور 
            </h2>
            <change-password-form></change-password-form>
        </div>
    </div>

    <!-- </div> -->
</template>

<script setup lang="ts">
definePageMeta({
    layout: "authtemp"
})

</script>

<style scoped></style>