<template>
  <div class="pr-[0.5rem]  pb-[0.2rem] min-h-screen">

    <div class="flex flex-col gap-4">
      <Form class="card p-8 flex flex-col sm:grid sm:grid-cols-6 gap-4 w-full rounded-box shadow-lg bg-white">
        <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
          class="sm:col-span-2" @selectedItem="changeSelectItem"></app-select-input>
        <app-select-input name="process_id" :options="processes!" :label="$t('process_id')" class="sm:col-span-2"
          @selectedItem="(process) => handleFilter({ process_id: process })"></app-select-input>
        <app-select-input name="docType" :options-list="doctypes" :label="$t('docType')"
          @selectedItem="(docType) => handleFilter({ docType: docType })" class="sm:col-span-2"></app-select-input>
        <app-search-input name="search" label="جستجو" v-model="searchWord" class="sm:col-span-2" @input="checkSearchBox"
          @clickSearch="searchWord !== '' && handleFilter({ search: searchWord })"></app-search-input>
        <div class="form-control sm:col-span-2">
          <label class="flex justify-between items-center px-1 pb-1.5" for="status">
            <span class="label-text">{{ $t('status') }}</span>
          </label>
          <select
            class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
            placeholder="" v-model="status" name="status" @change="handleFilter({ status: status })">
            <option value=""></option>
            <option v-for="(item, index) in items" :key="index" :value="item.value" class="selection:bg-gray-300">{{
              item.title }}</option>
          </select>
        </div>
        <div class="form-control sm:col-span-2">
          <label class="flex justify-between items-center px-1 pb-1.5" for="status">
            <span class="label-text">{{ $t('sortedBy') }}</span>
          </label>
          <select
            class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
            placeholder="" v-model="sortedBy" name="sortedBy" @change="handleFilter({ sortedBy: sortedBy })">
            <option value=""></option>
            <option v-for="(item, index) in sortItems" :key="index" :value="item.value" class="selection:bg-gray-300">{{
              item.title }}</option>
          </select>
        </div>
        <!-- <app-select-input name="sortedBy" @selectedItem="(sorted_by) => handleFilter({ sortedBy: sorted_by })"
          :label="$t('sortedBy')" :optionsList="sortItems" class=""></app-select-input> -->
      </Form>
      <div v-if="!(data?.procedures && data?.procedures?.length > 0) && !pending" class="">
        <div class="card p-8 w-full h-40 rounded-box shadow-lg bg-white flex items-center justify-center">
          سندی ثبت نشده است.
        </div>
      </div>
      <div v-else class="card p-8 gap-4 w-full rounded-box shadow-lg bg-white">
        <h3 class="text-lg font-bold text-gray-700 mb-5">لیست مستندات سطح چهارم مخابرات ایران</h3>
        <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-300">
          <div
            class="grid grid-cols-12 xl:grid-cols-14 gap-2 h-14 w-full bg-gray-200 text-xs  3xl:text-sm py-4 px-2 border border-white">
            <div class="col-span-1 flex items-center justify-center">ردیف</div>
            <div class="col-span-6 xl:col-span-3 flex items-center justify-center">عنوان</div>
            <div class="col-span-3 xl:col-span-2 flex items-center justify-center">کد</div>
            <div class="hidden xl:col-span-2 xl:flex items-center justify-center">معماری والد</div>
            <div class="hidden xl:col-span-2 xl:flex items-center justify-center">فرایند والد</div>
            <div class="col-span-1 xl:col-span-1 flex items-center justify-center">وضعیت</div>
            <div class="hidden xl:col-span-1 xl:flex items-center justify-center">تاریخ ابلاغ</div>
            <div class="hidden xl:col-span-1 xl:flex items-center justify-center">کاربر ثبت کننده</div>
            <div class="hidden xl:col-span-1 xl:flex items-center justify-center">عملیات</div>
            <div class="xl:hidden col-span-1 flex w-full items-center justify-center"></div>
          </div>
          <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-200" v-for="(item, index) in data?.procedures">
            <div class="grid grid-cols-12 xl:grid-cols-14 gap-2 h-auto w-full bg-white text-xs 2xl:text-sm py-4 px-2 ">
              <div class="col-span-1 flex items-center justify-center">{{ ((data!.meta.current_page - 1) *
                data!.meta.per_page) + index + 1 }}</div>
              <div class="col-span-6 xl:col-span-3 flex items-center justify-center">{{ item.displayTitle }}</div>
              <div class="col-span-3 xl:col-span-2 flex items-center justify-center en">{{ item.code }}</div>
              <div class="hidden xl:col-span-2 xl:flex items-center justify-center">{{ item.architecture.title }}</div>
              <div class="hidden xl:col-span-2 xl:flex items-center justify-center">{{ item.process.title }}</div>
              <div class="col-span-1 xl:col-span-1 flex items-center justify-center"><span v-if="item.status == 1"
                  class="text-green-500">فعال</span>
                <span v-if="item.status == 0" class="text-red-500">غیر فعال</span>
              </div>
              <div class="hidden xl:col-span-1 xl:flex items-center justify-center">{{ item.notification_date }}</div>
              <div class="hidden xl:col-span-1 xl:flex items-center justify-center">{{ item.user.fullName }}</div>
              <div class="hidden xl:col-span-1 xl:flex items-center justify-center gap-1 2xl:gap-2">
                <NuxtLink :to="`procedures/${item.slug}`"
                  class=" text-indigo-700 text-xs hover:text-indigo-400">
                  <icons-admin-eye></icons-admin-eye>
                </NuxtLink>
                <NuxtLink :to="`procedures/edit/${item.id}`"
                  class=" text-amber-600 text-xs  hover:text-amber-400">
                  <icons-admin-edit></icons-admin-edit>
                </NuxtLink>
                <button @click="deleteProcedureConfirmation(item.id)"
                  class=" text-red-600 text-xs hover:text-red-400"><icons-admin-trash></icons-admin-trash></button>
              </div>
              <div class="col-span-1 flex xl:hidden items-center justify-center">
                <button class="flex w-2" @click="toggleDetails(item.id)"><icons-collaps-arrow-down :class="openRow === item.id ? 'rotate-90 transition-transform' : 'rotate-0 transition-transform'"></icons-collaps-arrow-down></button>
              </div>
            </div>
            <div :id="'details'+item.id" class="flex flex-col divide-y divide-gray-200 xl:hidden w-full text-xs px-4 h-0 overflow-hidden opacity-0">
                <div class="flex items-center justify-between w-full py-3">
                  <div class="flex items-center justify-center">معماری والد</div>
                  <div class="flex items-center justify-center">{{ item.architecture.title }}</div>
                </div>
                <div class="flex items-center justify-between w-full py-3">
                  <div class="flex items-center justify-center">فرایند والد</div>
                  <div class="flex items-center justify-center">{{ item.process.title }}</div>
                </div>
                <div class="flex items-center justify-between w-full py-3">
                  <div class="flex items-center justify-center">تاریخ ابلاغ</div>
                  <div class="flex items-center justify-center">{{ item.notification_date }}</div>
                </div>
                <div class="flex items-center justify-between w-full py-3">
                  <div class="flex items-center justify-center">کاربر ثبت کننده</div>
                  <div class="flex items-center justify-center">{{ item.user.fullName }}</div>
                </div>
                <div class="flex items-center justify-between w-full py-2">
                  <div class="flex items-center justify-center">عملیات</div>
                  <div class="flex items-center justify-center gap-2"><NuxtLink :to="`procedures/${item.slug}`"
                  class="btn btn-outline btn-xs rounded-lg border-indigo-700 hover:border-none border-2 text-indigo-700 text-xs hover:bg-indigo-700 hover:text-white">
                  نمایش
                </NuxtLink>
                <NuxtLink :to="`procedures/edit/${item.id}`"
                  class="btn btn-outline btn-xs rounded-lg border-amber-700 hover:border-none border-2  text-amber-600 text-xs hover:bg-amber-600  hover:text-white">
                  ویرایش
                </NuxtLink>
                <button @click="deleteProcedureConfirmation(item.id)"
                  class="btn btn-outline btn-xs rounded-lg border-red-700 hover:border-none border-2 text-red-600 text-xs hover:bg-red-600 hover:text-white">حذف</button></div>
                </div>
                
              </div>
          </div>
        </div>
      </div>
      <div class="join flex items-center justify-center mt-5" v-if="data?.meta.total > data?.meta?.per_page!">
        <button v-for="(link, index) in data?.meta.last_page" :key="index" @click="handleFilter({ page: link })"
          class="join-item btn" :class="{ 'btn-active': data?.meta.current_page == link }">{{ link }}</button>
      </div>
    </div>
    <app-modal v-model="deleteConfirmation">
      <template #title>
        <h3 class="text-sm xl:text-base font-bold text-blue-800">تایید حذف سند</h3>
      </template>
      <div class="flex flex-col overflow-visible justify-center gap-10 mt-8">
        <h3 class="text-sm xl:text-base">آیا از حذف سند مورد نظر مطمئن هستید؟</h3>
      </div>
      <template #actions>
        <div class="flex justify-between items-center w-full">
          <app-button :loading="loading"
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteProcedureconfirmed()">حذف
            سند</app-button>
          <button
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteConfirmation = false">بازگشت به
            لیست
            سندها</button>
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
import { useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";
import { useGetBaseProcessesService, useGetProcessesService } from '~/composables/processes/useProcess.service';
import { useSubProcessFilter } from '~/composables/sub-processes/useSubProcess.validation';
import { Form } from "vee-validate";
import { useGetSubProcessesService } from '~/composables/sub-processes/useSubProcess.service';
import type { ProcessBaseDto } from '~/composables/processes/process.dto';
import { useGetProceduresService } from "~/composables/procetures/useProcedure.service";
import { useDeleteProcedureService } from "~/composables/procetures/useProcedure.service";
import { ToastEnum, ButtonVariantEnum } from "~/types";
const loading = ref(false)
const query = ref<any>({})
const { schema } = useSubProcessFilter()
const searchWord = ref("")
const status = ref(null)
const sortedBy = ref(null)
const route = useRoute()
const router = useRouter()
router.push({ query: {} })
const items = [
  { title: 'فعال', value: "1" },
  { title: 'غیر فعال', value: "-1" },
]
const doctypes = [
  {
    title: "روش اجرایی",
    value: "procedures"
  },
  {
    title: "دستورالعمل",
    value: "instruction"
  },
  {
    title: "قرارداد",
    value: "contract"
  },
  {
    title: "فرم",
    value: "form"
  },
  {
    title: "آئین نامه",
    value: "regulation"
  },
]
const sortItems = [
  { title: 'جدیدترین', value: "newest" },
  { title: 'قدیمی ترین', value: "oldest" },
]
const { showToast } = useToast();
const processes = ref<ProcessBaseDto[]>([])
const deleteConfirmation = ref(false)
const getProcedures = useGetProceduresService()
const { data, pending, error, refresh } = await useAsyncData('procedures', () => getProcedures(query.value), { server: false })
// useErrorHandler(error)
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures } = await useLazyAsyncData('architectures', () => getArchitectures(), {
  server: false
})
const getProcesses = useGetBaseProcessesService();
const changeSelectItem = async (selectedItemId) => {
  const data = await getProcesses(selectedItemId, { toastError: true })
  if (data !== undefined) {
    processes.value = data
  }
  handleFilter({ architecture_id: selectedItemId })
}

const handleFilter = (link) => {
  query.value = { ...route.query, ...link }
  router.push({ query: query.value })
  refresh()
}
function checkSearchBox(element) {
  console.log(element.target.value)
  if (element.target.value == '') {
    if (query.value.hasOwnProperty('search')) {
      delete query.value.search
    }

    router.push({ query: query.value })
    refresh()
  }
}
const procedureIdForDelete = ref<number>(-1)
const deleteProcedureConfirmation = (id: number) => {
  deleteConfirmation.value = true
  procedureIdForDelete.value = id
}
const deleteProcedure = useDeleteProcedureService()
const deleteProcedureconfirmed = () => {
  loading.value = true
  deleteProcedure(procedureIdForDelete.value).then((res) => {
    if (res !== undefined) {
      refresh()
      showToast({ message: "سند مورد نظر حذف شد.", type: ToastEnum.success })
    }
  }).finally(() => {
    loading.value = false
    deleteConfirmation.value = false
  })
}
const openRow = ref<number|null>(null)
const toggleDetails = async (id:number)=>{
    if (openRow.value === id) {
    const el = document.getElementById('details'+id)
    if (el) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" })
    }
    openRow.value = null}
     else {
    // اگر قبلی باز بود، اول ببندش
    if (openRow.value !== null) {
      const prevEl = document.getElementById('details'+openRow.value)
      if (prevEl) {
        gsap.to(prevEl, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" })
      }
    }
    // باز کردن جدید
    openRow.value = id
    await nextTick()
    const el = document.getElementById('details'+id)
    if (el) {
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" })
    }
  }
}
</script>

<style scoped>
.en {
  font-family: 'Times New Roman', serif;
}
</style>