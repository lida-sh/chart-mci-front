<template>
    <div class="card w-full lg:w-[50rem] xl:w-[60rem] 2xl:w-[80rem] h-full flex-col text-white shadow-md">
        <!-- <div class="hidden lg:flex gap-4 absolute"> -->
        <button
            class="hidden lg:flex absolute z-10 top-1/2 -translate-y-1/2 -right-20 w-12 h-12 bg-[#5c5d74] text-white rounded-xl  items-center justify-center border border-gray-500 border-opacity-70"
            @click="prevSlide" :disabled="currentSlide == 0">
            <div classs="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </button>
        <button
            class="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-20 w-12 h-12 bg-[#5c5d74] text-white rounded-xl  items-center justify-center border border-gray-500 border-opacity-70"
            @click="nextSlide" :disabled="docTypesSlides.length == currentSlide" :class="docTypesSlides.length == currentSlide">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>

        </button>
        <!-- </div> -->
        <div class="hidden lg:block absolute top-14 text-yellow-500 left-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
            </svg>

        </div>
        <div class="bg-[#4749e3] h-[25rem] rounded-t-3xl px-10 lg:px-20 pt-16">
            <h1 class="text-lg lg:text-2xl xl:text-3xl font-bold mb-12"><span class="">{{ docTypesSlides[currentSlide].title }}</span> (<span
                    class="en">{{ docTypesSlides[currentSlide].latinTitle }}</span>) :</h1>
            <p class="text-sm lg:text-lg font-bold mb-4">{{ docTypesSlides[currentSlide].description }}</p>
            <p class="text-sm lg:text-lg font-bold">کد {{ docTypesSlides[currentSlide].title }} با {{
                docTypesSlides[currentSlide].code }} شروع می شود</p>
            <!-- <p class="text-lg font-bold">یک نمونه {{ docTypes[0].title }}</p> -->

        </div>
        <div class="bg-white h-[10rem] rounded-b-3xl pr-20 pt-16">
            <img :src="docTypesSlides[currentSlide].image" alt=""
                class="absolute bottom-[12%] lg:bottom-[8%] rounded-md shadow-xl w-[80%] sm:w-1/3 left-[10%]">
        </div>
        <div class="hidden lg:flex gap-8 w-full h-10 items-center justify-center absolute -bottom-14">
            <button v-for="(slide, index) in docTypesSlides" :key="index" @click="goToSlide(index)" class="w-3 h-3 rounded-full"
                :class="index === currentSlide ? 'bg-[#f56c28]' : 'bg-gray-300'"></button>
            <!-- <div class="bg-[#f56c28] rounded-full w-3 h-3"></div>
            <div class="bg-gray-300 rounded-full w-3 h-3"></div>
            <div class="bg-gray-300 rounded-full w-3 h-3"></div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
const docTypesSlides = ref([
    {
        title: "فرایند",
        latinTitle: "Process",
        description: "مجموعه ای از  زیرفرایندهای مرتبط به که هم یا متعامل که جهت ارائه نتیجه موردنظر از دروندادها استفاده می کند.",
        code: "PS",
        image: "/images/NETWORK-PROCESS.png",
        style: "w-[80%] sm:w-1/3 left-[10%]"
    },
    {
        title: "زیر فرایند",
        latinTitle: "Sub Process",
        description: "مجموعه ای از  فعالیت های مرتبط به¬هم یا متعامل که جهت ارائه نتیجه موردنظر از دروندادها استفاده می کند.",
        code: "SP",
        image: "/images/SUBPROCESS.png",
        style: "w-[80%] sm:w-1/3 left-[10%]"
    },
    {
        title: "روش اجرایی",
        latinTitle: "Procedure",
        description: "مستندی که طریقه مشخص برای انجام یک فعالیت یا فرآیند را بیان می کند.",
        code: "PR",
        image: "/images/PROCEDURE.png",
        style: "w-[80%] sm:w-1/3 left-[10%]"
    },
    // {
    //     title: "دستورالعمل",
    //     latinTitle: "Instruction",
    //     description: "مستندی است که به طور دقیق بیان می کند، وظایف چگونه باید انجام شوند.",
    //     code: "IN",
    //     image: "/images/1.png",
    //     style: "w-[40%] sm:w-1/5 left-[25%] sm:left-[10%]"
    // },

])
const currentSlide = ref(0)
const intervalTime = 4000
let interval
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % docTypesSlides.value.length
}
const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1) % docTypesSlides.value.length
}

const goToSlide = (index) => {
    currentSlide.value = index
}
onMounted(() => {
    interval = setInterval(nextSlide, intervalTime)
})

onUnmounted(() => {
    clearInterval(interval)
})
</script>

<style scoped>
.en {
    font-family: serif;
}
</style>