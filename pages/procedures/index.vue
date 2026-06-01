<template>
  <!-- <div class=""> -->
    <!-- <div  class="flex items-center justify-center w-full bg-[#F7F7F7] non-select h-screen">
      <span class="loading loading-spinner loading-md"></span>
    </div> -->
    <div class="flex flex-col lg:flex-row  items-start w-full gap-4 px-5 py-14 bg-[#F7F7F7] non-select">
      <section class="px-4 py-10 rounded-lg bg-white shadow-lg w-full lg:w-[30rem]">
        <h3 class="text-lg font-bold">فیلترها</h3>
        <Form class="flex flex-col items-center justify-center w-full">
          <div class="divide-y w-full">
            <div class="p-3">
              <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                class="w-full" @selectedItem="changeSelectItem"></app-select-input>
            </div>
            <div class="p-3">
              <app-select-input name="process_id" :options="processes!" :label="$t('process_id')" class="sm:col-span-2"
                @selectedItem="(process) => handleFilter({ process_id: process })"></app-select-input>
            </div>
            <div class="p-3">
              <app-select-input name="docType" v-model="query.docType" :options-list="doctypes" :label="$t('docType')" class="w-full"
                @selectedItem="(docType) => handleFilter({ docType: docType })"></app-select-input>
            </div>
            <div class="p-3">
              <app-search-input name="search" label="جستجو" v-model="searchWord" class="w-full" @input="checkSearchBox"
                @clickSearch="searchWord !== '' && handleFilter({ search: searchWord })"></app-search-input>
            </div>
            <div class="p-3">
              <div class="form-control sm:col-span-2">
                <label class="flex justify-between items-center px-1 pb-1.5" for="status">
                  <span class="label-text">{{ $t('sortedBy') }}</span>
                </label>
                <select
                  class="bg-left-center select-custom focus:ring-0 focus:ring-offset-0 focus:border-gray-300 border-gray-300 rounded-lg h-12 font-normal font-gray-700"
                  placeholder="" v-model="sortedBy" name="sortedBy" @change="handleFilter({ sortedBy: sortedBy })">
                  <option value=""></option>
                  <option v-for="(item, index) in sortItems" :key="index" :value="item.value"
                    class="selection:bg-gray-300">{{
                      item.title }}</option>
                </select>
              </div>
            </div>
          </div>
        </Form>
      </section>
      <section class="w-full h-full flex">
        <div class="px-4 w-full h-full flex flex-col items-start gap-4">
          <h1 class="font-sm xl:text-base font-bold mb-4 mr-4">مستندات سطح چهارم مخابرات ایران :</h1>
          <procedure-result-search v-for="(itemDoc, index) in data?.procedures" :key="index"
            :rowNumber="((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1"
            :item="itemDoc"></procedure-result-search>
          <div class="join flex items-center justify-center mt-5 w-full"
            v-if="data?.meta.total > data?.meta?.per_page!">
            <button v-for="(link, index) in data?.meta.last_page" :key="index" @click="handleFilter({ page: link })"
              class="join-item btn" :class="{ 'btn-active': data?.meta.current_page == link }">{{ link }}</button>
          </div>
          <div class="flex w-full px-10 py-10">
            <a class="btn bg-blue-800 text-white hover:bg-blue-600 shadow-lg transition-color" href="/">بازگشت به صفحه اصلی</a>
          </div>

        </div>

        <!-- <div class="font-sm xl:text-base font-bold mb-4 mr-4">موردی یافت نشد.</div> -->
      </section>

    </div>

    <div>

    </div>

</template>

<script setup lang="ts">
import { useGetBaseArchitecturesService, useGetBaseProcessesService, useGetProceduresService } from '~/composables/home/home.service'
import type { ProcessBaseDto } from '~/composables/processes/process.dto'
const pengingOnGetProcesses = ref(false)


const searchWord = ref("")

const sortedBy = ref(null)
const route = useRoute()
const router = useRouter()

const query = ref<any>({})

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
//
// const processes = ref<ProcessBaseDto[]>([])
// const getProcedures = useGetProceduresService()
// const { data, pending, error, refresh } = await useAsyncData('procedures', () => getProcedures(query.value), {  })
// useErrorHandler(error)
// const getArchitectures = useGetBaseArchitecturesService()
// const { data: architectures } = await useLazyAsyncData('architectures', () => getArchitectures(), {
//   server: false
// })
// const getProcesses = useGetBaseProcessesService();
// const changeSelectItem = async (selectedItemId) => {
//   const data = await getProcesses(selectedItemId, { toastError: true })
//   if (data !== undefined) {
//     processes.value = data
//   }
//   handleFilter({ architecture_id: selectedItemId })
// }



// const handleFilter = (link) => {
//   query.value = { ...route.query, ...link }
//   router.push({ query: query.value })
//   refresh()
// }
//
const processes = ref<ProcessBaseDto[]>([])
onMounted(()=>{
  query.value = route.query
  router.push({ query: query.value })
})
const getProcedures = useGetProceduresService()
const { data, pending, error, refresh } = await useLazyAsyncData('procedures', () => getProcedures(query.value), {})
// useErrorHandler(error)
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures } = await useLazyAsyncData('architectures', () => getArchitectures(), {

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
  if (!link.hasOwnProperty('page')) {
    delete query.value.page
  }
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
</script>

<style scoped>
.btn-active {
  background-color: rgb(37, 99, 235);
  -webkit-text-fill-color: aliceblue;
  border: rgb(37, 99, 235);
}
</style>