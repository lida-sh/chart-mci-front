<template>
  <div class="pr-[0.5rem]  pb-[0.2rem] min-h-screen">
    <div v-if="!(data?.architectures && data?.architectures?.length > 0) && !pending" class="card p-8 w-full h-40 rounded-box shadow-lg bg-white flex items-center justify-center">
      معماری ثبت نشده است.
        </div>
    <div v-else class="card px-2 py-8 flex flex-col gap-4 w-full rounded-box shadow-lg bg-white">
      <h3 class="text-lg font-bold text-gray-700 mb-5">لیست معماری های مخابرات ایران</h3>
      <table class="table table-zebra ">
        <thead>
          <tr class="bg-stone-300 rounded-lg text-base">
            <th class="text-center">شماره</th>
            <th class="text-center">عنوان</th>
            <th class="text-center">کد</th>
            <th class="text-center">کاربر ثبت کننده</th>
            <th class="text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data?.architectures" :key="index" class="hover divide-y">
            <td class="text-center">{{ ((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1 }}</td>
            <!-- <td class="text-center">{{ index + 1 }}</td> -->
            <td class="text-center">{{ item.displayTitle }}</td>
            <td class="text-center">{{ item.code }}</td>
            <td class="text-center">{{ item.user.fullName }}</td>
            <td class="text-right flex items-center justify-center gap-2 ">
              <NuxtLink :to="`architectures/${item.slug}`"
                class="btn btn-outline border-sky-700 hover:border-none border-2 btn-sm text-sky-600 text-xs hover:bg-gradient-to-b hover:from-sky-900 hover:to-sky-400 hover:text-white">
                نمایش
              </NuxtLink>
              <NuxtLink :to="`architectures/edit/${item.id}`"
                class="btn btn-outline border-amber-700 hover:border-none border-2 btn-sm text-amber-600 text-xs hover:bg-gradient-to-b hover:from-amber-900 hover:to-amber-400 hover:text-white">
                ویرایش
              </NuxtLink>
              <button @click="deleteProcedureConfirmation(item.id)"
                class="btn btn-outline border-red-700 hover:border-none border-2 btn-sm text-red-600 text-xs hover:bg-gradient-to-b hover:from-red-900 hover:to-red-400 hover:text-white">حذف</button>
            </td>

          </tr>
          
        </tbody>
      </table>
    </div>
    <app-modal v-model="deleteConfirmation">
      <template #title>
        <h3 class="text-sm xl:text-base font-bold text-blue-800">تایید حذف معماری</h3>
      </template>
      <div class="flex flex-col overflow-visible justify-center gap-10 mt-8">
        <h3 class="text-sm xl:text-base">آیا از حذف معماری مورد نظر مطمئن هستید؟</h3>
      </div>
      <template #actions>
        <div class="flex justify-between items-center w-full">
          <app-button :loading="loading"
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteArchitectureconfirmed()">حذف
            معماری</app-button>
          <button
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteConfirmation = false">بازگشت به
            لیست
            معماری ها</button>
        </div>
      </template>

    </app-modal>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin"
})

import { useGetArchitecturesService, useDeleteArchitectureService } from '~/composables/architectures/useArchitecture.service';
import { ToastEnum, ButtonVariantEnum } from "~/types";
const loading = ref(false)

const { showToast } = useToast();
const deleteConfirmation = ref(false)
const getArchitectures = useGetArchitecturesService()
const { data, pending, error, refresh } = await useAsyncData('architectures', () => getArchitectures(), { server: false })

console.log("data", data.value)

const procedureIdForDelete = ref<number>(-1)
const deleteProcedureConfirmation = (id: number) => {
  deleteConfirmation.value = true
  procedureIdForDelete.value = id
}
const deleteProcedure = useDeleteArchitectureService()
const deleteArchitectureconfirmed = () => {
  loading.value = true
  deleteProcedure(procedureIdForDelete.value).then((res)=>{
    if(res !== undefined){
      refresh()
      showToast({ message: "سند مورد نظر حذف شد.", type: ToastEnum.success })
    }
  }).finally(()=>{
    loading.value = false
    deleteConfirmation.value = false
  })
}
</script>

<style scoped></style>