<template>
  <div class="pr-[0.5rem]  pb-[0.2rem] min-h-screen">
    <div v-if="!(data?.architectures && data?.architectures?.length > 0) && !pending" class="card p-8 w-full h-40 rounded-box shadow-lg bg-white flex items-center justify-center">
      معماری ثبت نشده است.
        </div>
    <div v-else class="card px-2 py-8 flex flex-col gap-4 w-full rounded-box shadow-lg bg-white">
      <h3 class="text-sm font-bold text-gray-700 mb-5 mr-4">لیست معماری های مخابرات ایران</h3>
      <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-300">
          <div
            class="grid grid-cols-14 xl:grid-cols-16 gap-2 h-14 w-full bg-gray-200 text-xs 3xl:text-sm py-4 px-2 border border-white">
            <div class="col-span-1 flex items-center justify-center">ردیف</div>
            <div class="col-span-3 2xl:col-span-3 flex items-center justify-center">عنوان</div>
            <div class="col-span-2 2xl:col-span-1 flex items-center justify-center">تعداد اداره کل کارسنجی</div>
            <div class="col-span-2 2xl:col-span-1 flex items-center justify-center">تعداد اداره کارسنجی</div>
            <div class="col-span-2 2xl:col-span-1 flex items-center justify-center">تعداد پست کارسنجی</div>
            <div class="col-span-2 2xl:col-span-1 flex items-center justify-center">تعداد ردیف کارشناسی کارسنجی</div>
            <div class="col-span-1 2xl:col-span-1 flex items-center justify-center">وضعیت</div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center"></div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center"></div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center"></div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center"></div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center"></div>
            <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center">کاربر ثبت کننده</div>
            <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">عملیات</div>
            <div class="2xl:hidden col-span-1 flex w-full items-center justify-center"></div>
          </div>
          <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-200"
            v-for="(item, index) in data?.architectures" :key="item.id">
            <div class="grid grid-cols-14 xl:grid-cols-18 gap-2 h-auto w-full bg-white text-xs 2xl:text-sm py-4 px-2 ">
              <div class="col-span-1 flex items-center justify-center">{{ ((data!.meta.current_page - 1) *
                data!.meta.per_page) + index + 1 }}</div>
              <div class="col-span-3 xl:col-span-3 flex items-center justify-center">{{ item.displayTitle }}</div>
              <div class="col-span-2 xl:col-span-2 flex items-center justify-center">{{ item.directorate_count }}</div>
              <div class="col-span-2 xl:col-span-2 flex items-center justify-center">{{ item.departments_count + item.departments_root_count }}</div>
              <div class="col-span-2 xl:col-span-2 flex items-center justify-center">{{ item.positions + item.positions_root + item.senior_expert_positions }}</div>
              <div class="col-span-2 xl:col-span-2 flex items-center justify-center">{{ item.experts_count + item.experts_root_count + item.senior_expert_positions }}</div>
              <div class="col-span-1 xl:col-span-1 flex items-center justify-center"><span v-if="item.status == 1"
                class="text-green-500">فعال</span>
                <span v-if="item.status == 0" class="text-red-500">غیر فعال</span>
              </div>
              <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-2 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center">{{  }}</div>
              <div class="hidden 2xl:col-span-1 2xl:flex items-center justify-center gap-1 2xl:gap-2">
                <NuxtLink :to="`architectures/${item.slug}`" class="text-indigo-700 text-xs hover:text-indigo-400">
                    <icons-admin-eye></icons-admin-eye>
                  </NuxtLink>
                  <NuxtLink :to="`architectures/edit/${item.id}`" class="text-amber-600 text-xs  hover:text-amber-400">
                    <icons-admin-edit></icons-admin-edit>
                  </NuxtLink>
                  <button @click="deleteArchitectureConfirmation(item.id)"
                    class="text-red-600 text-xs hover:text-red-400"><icons-admin-trash></icons-admin-trash></button>
              </div>
              <div class="col-span-1 flex 2xl:hidden items-center justify-center">
                <button class="flex w-2" @click="toggleDetails(item.id)"><icons-collaps-arrow-down
                    :class="openRow === item.id ? 'rotate-90 transition-transform' : 'rotate-0 transition-transform'"></icons-collaps-arrow-down></button>
              </div>
            </div>
            <div :id="'details' + item.id"
              class="flex flex-col divide-y divide-gray-200 2xl:hidden w-full text-xs px-4 h-0 overflow-hidden opacity-0">
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">تعداد اداره کل موجود</div>
                <div class="flex items-center justify-center">{{ item.old_directorates_count }}</div>
              </div>
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">تعداد اداره موجود</div>
                <div class="flex items-center justify-center">{{ item.departments_count + item.departments_root_count }}</div>
              </div>
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">تعداد ردیف کارشناسی موجود</div>
                <div class="flex items-center justify-center">{{ item.old_expert_positions_count }}</div>
              </div>
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">تعداد پست موجود</div>
                <div class="flex items-center justify-center">{{ item.old_positions_count}}</div>
              </div>
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">کاربر ثبت کننده</div>
                <div class="flex items-center justify-center">{{ item.user.fullName }}</div>
              </div>
              <div class="flex items-center justify-between w-full py-2">
                <div class="flex items-center justify-center">عملیات</div>
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink to="" class="text-indigo-700 text-xs hover:text-indigo-400">
                    <icons-admin-eye></icons-admin-eye>
                  </NuxtLink>
                  <NuxtLink :to="`architectures/edit/${item.id}`" class="text-amber-600 text-xs  hover:text-amber-400">
                    <icons-admin-edit></icons-admin-edit>
                  </NuxtLink>
                  <button @click="deleteArchitectureConfirmation(item.id)"
                    class="text-red-600 text-xs hover:text-red-400"><icons-admin-trash></icons-admin-trash></button>
                </div>
              </div>

            </div>
          </div>
        </div>
      
      <div class="join flex items-center justify-center mt-5" v-if="data?.meta.total > data?.meta?.per_page!">
        <button v-for="(link, index) in data?.meta.last_page" :key="index" @click="handleFilter({ page: link })"
          class="join-item btn" :class="{ 'btn-active': data?.meta.current_page == link }">{{ link }}</button>
        <!-- <button class="join-item btn btn-active">2</button> -->
      </div>
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
import { gsap } from 'gsap'
import { useGetArchitecturesService, useDeleteArchitectureService } from '~/composables/architectures/useArchitecture.service';

const query = ref({})
import { ToastEnum, ButtonVariantEnum } from "~/types";


// const { schema } = useDirectorateFilter()
const searchWord = ref("")
const status = ref(null)
const sortedBy = ref(null)
const route = useRoute()
const router = useRouter()
router.push({ query: {} })
const loading = ref(false)

const { showToast } = useToast();
const deleteConfirmation = ref(false)
const getArchitectures = useGetArchitecturesService()
const { data, pending, error, refresh } = await useAsyncData('architectures', () => getArchitectures(query.value), { server: false })
const handleFilter = (link) => {
  console.log('link=', link)
  query.value = { ...route.query, ...link }
  console.log("query", query.value)
  router.push({ query: query.value })
  refresh()
}
console.log("data new", data.value)

const architectureIdForDelete = ref<number>(-1)
const deleteArchitectureConfirmation = (id: number) => {
  deleteConfirmation.value = true
  architectureIdForDelete.value = id
}
const deleteArchitecture = useDeleteArchitectureService()
const deleteArchitectureconfirmed = () => {
  loading.value = true
  deleteArchitecture(architectureIdForDelete.value).then((res)=>{
    if(res !== undefined){
      refresh()
      showToast({ message: "سند مورد نظر حذف شد.", type: ToastEnum.success })
    }
  }).finally(()=>{
    loading.value = false
    deleteConfirmation.value = false
  })
}
const openRow = ref<number | null>(null)
const toggleDetails = async (id: number) => {
  console.log('clicked', id)
  if (openRow.value === id) {
    const el = document.getElementById('details' + id)
    console.log(el)
    if (el) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" })
    }
    openRow.value = null
  }
  else {
    // اگر قبلی باز بود، اول ببندش
    if (openRow.value !== null) {
      const prevEl = document.getElementById('details' + openRow.value)
      if (prevEl) {
        gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" })
      }
    }
    // باز کردن جدید
    openRow.value = id
    await nextTick()
    const el = document.getElementById('details' + id)
    if (el) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" })
    }
  }
}

</script>

<style scoped></style>