<template>
    <div class="relative flex flex-col w-full items-center justify-center">
        <div v-if="!data" class="flex flex-col items-center justify-center min-h-screen">
            <span class="loading loading-spinner text-neutral"></span>
        </div>
        <div v-else class=" flex flex-col items-center justify-center p-[1rem]">
            <tree-architecture-props-card :positions="data?.positions + data?.positions_root + data?.senior_expert_positions"
             :old_directorates_count="data?.old_directorates_count"
             :old_departments_count="data?.old_departments_count"
             :old_expert_positions_count="data?.old_expert_positions_count"
             :old_positions_count="data?.old_positions_count"
             :directorate_count="data?.directorate_count"
             :departments_count="data?.departments_count+data?.departments_root_count"
             :experts_count="data?.experts_count + data?.experts_root_count+ data?.senior_expert_positions"

              class="absolute top-10 left-4"></tree-architecture-props-card>

              <div class="relative inline-block group">
                  <tree-architecture-box :title="data?.displayTitle!" id="master" class="invisible"></tree-architecture-box>
                  <tree-architecture-props-card 
                      :positions="data?.positions + data?.positions_root + data?.senior_expert_positions"
                     :old_directorates_count="data?.old_directorates_count"
                      :old_departments_count="data?.old_departments_count"
                     :old_expert_positions_count="data?.old_expert_positions_count"
                     :old_positions_count="data?.old_positions_count"
                     :directorate_count="data?.directorate_count"
                     :departments_count="data?.departments_count+data?.departments_root_count"
                     :experts_count="data?.experts_count + data?.experts_root_count+ data?.senior_expert_positions"

              class="absolute top-10 left-4 hidden group-hover:block"></tree-architecture-props-card>
              </div>
            <div
                class="flex lg:flex-row flex-col items-start justify-center p-2 gap-2 mt-6 ">
                <tree-office-manager-box :positions="data?.office_manager_count"></tree-office-manager-box>
                <tree-department-box v-for="rootDepartment in data?.rootDepartments" :item="rootDepartment" class="directorate invisible"></tree-department-box>
                <tree-senior-expert-box v-for="senior_expert in data?.senior_experts" :item="senior_expert" class="directorate invisible"></tree-senior-expert-box>
            </div>
            <div
                class="flex lg:flex-row flex-col items-start justify-center p-2 gap-2 mt-6 directorate invisible" :class="{'lg:border-2 lg:border-dashed lg:border-gray-400': data?.directorates.length!==0}">
                <tree-directorate-box v-for="directorate in data?.directorates" :item="directorate" class="directorate invisible"></tree-directorate-box>
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
console.log("first test", data.value)
const runAnimation = () => {
    setTimeout(()=>{
    tl.from("#master", {
        x: -100,
        duration: 1,
        autoAlpha: 0,
        ease: "power1"
    })
    .from(".directorate", {
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