<template>
    <div class="card bg-gray-100 border border-gray-400 shadow-sm p-2">
      <div class="card-body">
       <div class="flex flex-col items-center justify-center gap-2 text-xs font-bold">
         <div class="flex items-center justify-center gap-2">
            <span class="text-nowrap">تعداد پست</span>
            <span class="">{{ positions }}</span>
            <ArrowIcon class="w-4 h-4 text-red-500" ></ArrowIcon>
            <span class="">{{ old_positions_count }}</span>
            <span class="text-red-500 ">({{ ( Number(old_positions_count) - positions ) }})</span>
         </div>
         <div class="flex items-center justify-center gap-2">
            <span class="text-nowrap">تعداد اداره کل</span>
            <span class="">{{ directorate_count }}</span>
            <ArrowIcon class="w-4 h-4 text-red-500" ></ArrowIcon>
            <span class="">{{ old_directorates_count }}</span>
            <span class="text-red-500 ">({{ ( Number(old_directorates_count) - directorate_count ) }})</span>
         </div>
         <div class="flex items-center justify-center gap-2">
            <span class="text-nowrap">تعداد اداره</span>
            <span class="">{{ departments_count }}</span>
            <ArrowIcon class="w-4 h-4 text-red-500" ></ArrowIcon>
            <span class="">{{ old_departments_count }}</span>
            <span class="text-red-500 ">({{ ( Number(old_departments_count) - departments_count ) }})</span>
         </div>
         <div class="flex items-center justify-center gap-2">
            <span class="text-nowrap">تعداد کارشناس</span>
            <span class="">{{ experts_count }}</span>
            <ArrowIcon class="w-4 h-4 text-red-500" ></ArrowIcon>
            <span class="">{{ old_expert_positions_count }}</span>
            <span class="text-red-500 ">({{ ( Number(old_expert_positions_count) - experts_count ) }})</span>
         </div>
        
       </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import ArrowIcon from './ArrowIcon.vue';
 const props = defineProps<{old_departments_count:string, old_directorates_count:string, old_expert_positions_count:string, old_positions_count: string,
    positions:number, directorate_count: number, departments_count: number, experts_count:number
 }>()
</script>

<style scoped>

</style>