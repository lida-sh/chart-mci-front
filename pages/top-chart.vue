<template>
    <div class="flex flex-col w-full items-center justify-center">
        <div v-if="!data" class="flex flex-col items-center justify-center min-h-screen">
            <span class="loading loading-spinner text-neutral"></span>
        </div>
        <div v-else class="relative flex flex-col gap-2 items-center justify-center p-[1rem]">
            <tree-architecture-box title="هیئت مدیره شرکت مخابرات ایران" id="master" class="invisible"></tree-architecture-box>
            <div
                class="flex lg:flex-row flex items-start justify-center p-4 gap-2 mt-2 ">
                <tree-architecture-box2 title="اداره کل دفترهیئت مدیره و امورمجامع شرکت های تابعه" id="master" class="invisible"></tree-architecture-box2>
                 <tree-architecture-box2 title="اداره کل حسابرسی داخلی" id="master" class="invisible"></tree-architecture-box2>
                 <tree-architecture-box2 title="شرکت های تابعه ذیل شرکت مخابرات ایران" id="master" class="invisible"></tree-architecture-box2>
            </div>
            <tree-architecture-box title="مدیر عامل" id="master" class="invisible"></tree-architecture-box>
            <div
                class="flex lg:flex-row flex-col items-start justify-center lg:border-2 lg:border-dashed lg:border-gray-400 p-2 gap-2 mt-2 architecture invisible">
                <tree-arch-top-chart-box v-for="directorate_architecture in data?.directorate_architectures" :item="directorate_architecture" class="architecture invisible"></tree-arch-top-chart-box>
            </div>
            <div
                class="flex lg:flex-row flex-col items-start justify-center lg:border-2 lg:border-dashed lg:border-gray-400 p-2 gap-2 mt-2 architecture invisible">
                <tree-arch-top-chart-box v-for="deputy_architecture in data?.deputy_architectures" :item="deputy_architecture" class="architecture invisible"></tree-arch-top-chart-box>
            </div>
            <tree-architecture-box2 title="مناطق مخابراتی" class="mt-4 architecture"></tree-architecture-box2>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTopChartStructureService } from '~/composables/architectures/useArchitecture.service';
import { gsap } from "gsap"
let tl = gsap.timeline()
const route = useRoute();
const getTopChartTree = useTopChartStructureService();
const { data, pending } = useLazyAsyncData('top-chart', () => getTopChartTree(), { server: false })
console.log("first test", data.value)
const runAnimation = () => {
    setTimeout(()=>{
    tl.from("#master", {
        x: -100,
        duration: 1,
        autoAlpha: 0,
        ease: "power1"
    })
    .from(".architecture", {
        // y: "100%",
        y: 100,
        duration: 1,
        autoAlpha: 0,
        ease: "power4",
        stagger: 0.3

    })
    },1000)

}
watch(data, async (val) => {
  if (val) {
    await nextTick()
    runAnimation()
  }
}, { immediate: true })
onMounted(async () => {
    // await nextTick();
    // watch(data,()=>{
    //     if (data.value) {
    //     runAnimation()
    // }
    // },{immediate: true})
    // runAnimation()
})




</script>

<style scoped></style>