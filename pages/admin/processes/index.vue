<template>
  <div class="pr-[0.5rem]  pb-[0.2rem] min-h-screen">

    <div class="flex flex-col gap-4">
      <Form :validation-schema="schema"
        class="card px-4 py-8 flex flex-col sm:grid sm:grid-cols-4 gap-4 w-full rounded-box shadow-lg bg-white">
        <app-select-input name="architecture_id" :label="$t('architecture_id')"
          @selectedItem="(architecture) => handleFilter({ architecture_id: architecture })"
          :options="architectures!"></app-select-input>

        <app-search-input name="search" label="جستجو" v-model="searchWord"
          @clickSearch="searchWord !== '' && handleFilter({ search: searchWord })"></app-search-input>

        <div class="form-control">
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
        <!-- <app-select-input name="status" v-model="status" @selectedItem="(state) => handleFilter({ status: status })"
          :label="$t('status')" :optionsList="items" class=""></app-select-input> -->
        <div class="form-control">
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
      <div v-if="!(data?.processes && data?.processes?.length > 0) && !pending" class="">
        فرایندی ثبت نشده است.
      </div>
      <div v-else class="card p-4 gap-4 w-full rounded-box shadow-lg bg-white">
        <h3 class="text-lg font-bold text-gray-700 mb-5">لیست فرایند های مخابرات ایران</h3>
        <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-300">
          <div
            class="grid grid-cols-12 xl:grid-cols-14 gap-2 h-14 w-full bg-gray-200 text-xs  3xl:text-sm py-4 px-2 border border-white">
            <div class="col-span-1 flex items-center justify-center">ردیف</div>
            <div class="col-span-6 xl:col-span-3 flex items-center justify-center">عنوان</div>
            <div class="col-span-3 xl:col-span-2 flex items-center justify-center">کد</div>
            <div class="hidden xl:col-span-2 xl:flex items-center justify-center">معماری والد</div>
            <div class="col-span-1 xl:col-span-1 flex items-center justify-center">وضعیت</div>
            <div class="hidden xl:col-span-2 xl:flex items-center justify-center">تاریخ ابلاغ</div>
            <div class="hidden xl:col-span-1 xl:flex items-center justify-center">کاربر ثبت کننده</div>
            <div class="hidden xl:col-span-2 xl:flex items-center justify-center">عملیات</div>
            <div class="xl:hidden col-span-1 flex w-full items-center justify-center"></div>
          </div>
          <div class="flex flex-col items-center justify-center w-full divide-y divide-gray-200"
            v-for="(item, index) in data?.processes">
            <div class="grid grid-cols-12 xl:grid-cols-14 gap-2 h-auto w-full bg-white text-xs 2xl:text-sm py-4 px-2 ">
              <div class="col-span-1 flex items-center justify-center">{{ ((data!.meta.current_page - 1) *
                data!.meta.per_page) + index + 1 }}</div>
              <div class="col-span-6 xl:col-span-3 flex items-center justify-center">{{ item.title }}</div>
              <div class="col-span-3 xl:col-span-2 flex items-center justify-center en">{{ item.code }}</div>
              <div class="hidden xl:col-span-2 xl:flex items-center justify-center">{{ item.architecture.title }}</div>
              <div class="col-span-1 xl:col-span-1 flex items-center justify-center"><span v-if="item.status == 1"
                  class="text-green-500">فعال</span>
                <span v-if="item.status == 0" class="text-red-500">غیر فعال</span>
              </div>
              <div class="hidden xl:col-span-2 xl:flex items-center justify-center">{{ item.notification_date }}</div>
              <div class="hidden xl:col-span-1 xl:flex items-center justify-center">{{ item.user.fullName }}</div>
              <div class="hidden xl:col-span-2 xl:flex items-center justify-center gap-1 2xl:gap-2">
                <NuxtLink :to="`processes/${item.slug}`"
                    class="text-indigo-700 text-xs hover:text-indigo-400">
                    <icons-admin-eye></icons-admin-eye>
                  </NuxtLink>
                  <NuxtLink :to="`processes/edit/${item.id}`"
                    class="text-amber-600 text-xs  hover:text-amber-400">
                    <icons-admin-edit></icons-admin-edit>
                  </NuxtLink>
                  <button @click="deleteProcessConfirmation(item.id)"
                    class="text-red-600 text-xs hover:text-red-400"><icons-admin-trash></icons-admin-trash></button>
              </div>
              <div class="col-span-1 flex xl:hidden items-center justify-center">
                <button class="flex w-2" @click="toggleDetails(item.id)"><icons-collaps-arrow-down
                    :class="openRow === item.id ? 'rotate-90 transition-transform' : 'rotate-0 transition-transform'"></icons-collaps-arrow-down></button>
              </div>
            </div>
            <div :id="'details' + item.id"
              class="flex flex-col divide-y divide-gray-200 xl:hidden w-full text-xs px-4 h-0 overflow-hidden opacity-0">
              <div class="flex items-center justify-between w-full py-3">
                <div class="flex items-center justify-center">معماری والد</div>
                <div class="flex items-center justify-center">{{ item.architecture.title }}</div>
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
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink :to="`processes/${item.slug}`"
                    class="text-indigo-700 text-xs hover:text-indigo-400">
                    <icons-admin-eye></icons-admin-eye>
                  </NuxtLink>
                  <NuxtLink :to="`processes/edit/${item.id}`"
                    class="text-amber-600 text-xs  hover:text-amber-400">
                    <icons-admin-edit></icons-admin-edit>
                  </NuxtLink>
                  <button @click="deleteProcessConfirmation(item.id)"
                    class="text-red-600 text-xs hover:text-red-400"><icons-admin-trash></icons-admin-trash></button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <!-- <table class="table table-zebra ">
          <thead>
            <tr class="bg-gray-200 rounded-lg text-base">
              <th class="text-center">شماره</th>
              <th class="text-center">عنوان</th>
              <th class="text-center">کد</th>
              <th class="text-center">معماری والد</th>
              <th class="text-center">وضعیت</th>
              <th class="text-center">تاریخ ابلاغ</th>
              <th class="text-center">کاربر ثبت کننده</th>
              <th class="text-center">عملیات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data?.processes" class="hover divide-y">
              <th class="text-center">{{ index }}</th> -->
              <!-- <td class="text-center">{{ ((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1 }}</td>
              <td class="text-center">{{ item.title }}</td>
              <td class="text-center en whitespace-nowrap">{{ item.code }}</td>
              <td class="text-center">{{ item.architecture.title }}</td>
              <td class="text-center">
                <span v-if="item.status == 1" class="text-green-500">فعال</span>
                <span v-if="item.status == 0" class="text-red-500">غیر فعال</span>
              </td>
              <td class="text-center">{{ item.notification_date }}</td>
              <td class="text-center">{{ item.user.fullName }}</td>
              <td class="text-right flex items-center justify-center gap-2 ">
                <NuxtLink :to="`processes/${item.slug}`"
                  class="btn btn-outline border-sky-700 hover:border-none border-2 btn-sm text-sky-600 text-xs hover:bg-gradient-to-b hover:from-sky-900 hover:to-sky-400 hover:text-white">
                  نمایش
                </NuxtLink>
                <NuxtLink :to="`processes/edit/${item.id}`"
                  class="btn btn-outline border-amber-700 hover:border-none border-2 btn-sm text-amber-600 text-xs hover:bg-gradient-to-b hover:from-amber-900 hover:to-amber-400 hover:text-white">
                  ویرایش
                </NuxtLink>
                <button @click="deleteProcessConfirmation(item.id)"
                  class="btn btn-outline border-red-700 hover:border-none border-2 btn-sm text-red-600 text-xs hover:bg-gradient-to-b hover:from-red-900 hover:to-red-400 hover:text-white">حذف</button>
              </td>

            </tr>

          </tbody>
        </table>  -->

      </div>
      <div class="join flex items-center justify-center mt-5" v-if="data?.meta.total > data?.meta?.per_page!">
        <button v-for="(link, index) in data?.meta.last_page" :key="index" @click="handleFilter({ page: link })"
          class="join-item btn" :class="{ 'btn-active': data?.meta.current_page == link }">{{ link }}</button>
        <!-- <button class="join-item btn btn-active">2</button> -->
      </div>
    </div>
    <app-modal v-model="deleteConfirmation">
      <template #title>
        <h3 class="text-sm xl:text-base font-bold text-blue-800">تایید حذف فرایند</h3>
      </template>
      <div class="flex flex-col overflow-visible justify-center gap-10 mt-8">
        <h3 class="text-sm xl:text-base">آیا از حذف فرایند مورد نظر مطمئن هستید؟</h3>
      </div>
      <template #actions>
        <div class="flex justify-between items-center w-full">
          <app-button :loading="loading"
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteProcessconfirmed()">حذف
            فرایند</app-button>
          <button
            class="btn border-2 border-[#4749e3] text-[#4749e3] hover:bg-[#4749e3] hover:text-white hover:border-[#4749e3]"
            @click="deleteConfirmation = false">بازگشت به
            لیست
            فرایندها</button>
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
import { TailwindPagination } from 'laravel-vue-pagination';
import { useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";
import { useGetProcessesService, useDeleteProcessService } from '~/composables/processes/useProcess.service';
import { useProcessFilter } from '~/composables/processes/useProcess.validation';
import { Form } from "vee-validate";
const query = ref({})
import { ToastEnum, ButtonVariantEnum } from "~/types";
const { showToast } = useToast();
const loading = ref(false)
const deleteConfirmation = ref(false)
const { schema } = useProcessFilter()
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
const sortItems = [
  { title: 'جدیدترین', value: "newest" },
  { title: 'قدیمی ترین', value: "oldest" },
]
const getProcesses = useGetProcessesService()
const { data, pending, error, refresh } = await useAsyncData('processes', () => getProcesses(query.value), { server: false })
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures } = await useLazyAsyncData('architectures', () => getArchitectures(), {
  server: false
})
// const { data, pending, error } = await useAsyncData('get-processes', async () => {
//   const [architectures, processes] = await Promise.all([getArchitectures(),  getProcesses()]);
//   return { architectures, processes }
// }, { server: false })
useErrorHandler(error)

const handleFilter = (link) => {
  query.value = { ...route.query, ...link }
  router.push({ query: query.value })
  refresh()
  // console.log("query", query.value)
}
const processIdForDelete = ref<number>(-1)
const deleteProcessConfirmation = (id: number) => {
  deleteConfirmation.value = true
  processIdForDelete.value = id
}
const deleteProcess = useDeleteProcessService()
const deleteProcessconfirmed = () => {
  loading.value = true
  deleteProcess(processIdForDelete.value).then((res) => {
    if (res !== undefined) {
      refresh()
      showToast({ message: "فرایند مورد نظر حذف شد.", type: ToastEnum.success })
    }
  }).finally(() => {
    loading.value = false
    deleteConfirmation.value = false
  })
}
const openRow = ref<number | null>(null)
const toggleDetails = async (id: number) => {
  if (openRow.value === id) {
    const el = document.getElementById('details' + id)
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

<style scoped>
.en {
  font-family: 'Times New Roman', serif;
}
</style>