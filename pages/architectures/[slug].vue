<template>
    <div class="flex flex-col w-full items-center justify-center">
        <div v-if="!data" class="flex flex-col items-center justify-center min-h-screen">
            <span class="loading loading-spinner text-neutral"></span>
        </div>
        <div v-else class="flex flex-col items-center justify-center p-[3rem]">
            <tree-architecture-box :title="data?.displayTitle!" id="master" class="invisible"></tree-architecture-box>
            <div
                class="flex lg:flex-row flex-col items-start justify-center lg:border-2 lg:border-dashed lg:border-gray-400 p-10 gap-10 mt-6 ">
                <tree-process-box v-for="process in data?.processes" :item="process" class="process invisible"></tree-process-box>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useArchitectureStructureService } from '~/composables/architectures/useArchitecture.service';
import { gsap } from "gsap"
let tl = gsap.timeline()
const route = useRoute();
const getArchitectureTree = useArchitectureStructureService();
const { data, pending } = useAsyncData('architectures' + route.params.slug, () => getArchitectureTree(route.params.slug as string), { server: true })
const runAnimation = () => {
    setTimeout(()=>{
    tl.from("#master", {
        x: -100,
        duration: 1,
        autoAlpha: 0,
        ease: "power1"
    })
    .from(".process", {
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