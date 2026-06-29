<template>
    <div class="flex flex-col lg:flex-row justify-center items-start w-full gap-4 px-10 py-14 bg-[#F7F7F7]">
        <section class="px-4 py-10 rounded-lg bg-white shadow-lg  w-full  lg:w-[30rem] ">
            <h3 class="text-lg font-bold">فیلترها</h3>
            <Form :validation-schema="schema" class="flex flex-col items-center justify-center w-full" @submit="submit">
                <div class="divide-y w-full">
                    <div class="p-3">
                        <app-select-input name="architecture_id" :options="architectures!"
                            :label="$t('architecture_id')" class="w-full"
                            @selectedItem="changeSelectItem"></app-select-input>
                    </div>
                    <div class="p-3">
                        <app-select-input name="docType" :options-list="doctypes" :label="$t('docType')" class="w-full"
                            @selectedItem="changeDocTypeItem"></app-select-input>
                    </div>
                    <div class="p-3">
                        <app-select-input name="itemSearch" :options-list="itemsInSearch" :label="$t('itemSearch')"
                            class="w-full"></app-select-input>
                    </div>
                    <div v-if="showProceeeSelect" class="p-3">
                        <app-select-input name="process_id" :options="processes!" :label="$t('process_id')"
                            class="w-full"></app-select-input>
                    </div>
                    <!-- <div class="p-3">
                        <app-select-input name="itemSearch" :options-list="itemsInSearch" :label="$t('itemSearch')"
                            class="w-full" @selectedItem="changeDocTypeItem"></app-select-input>
                    </div> -->
                    <div class="p-3">
                        <app-text-input name="wordSearch" :label="$t('wordSearch')" class="w-full"></app-text-input>
                    </div>
                    <app-button type="button" :loading="loading"
                        class="bg-indigo-600 btn w-full h-10 text-white text-sm text-bold hover:bg-indigo-500">جستجو</app-button>
                </div>
            </Form>
        </section>
        <section class="w-full h-full flex">
            
            <div v-if="!searchOnced" class="flex w-full p-20">
                <h3 class="">با انتخاب فیلترهای مناسب به سند مورد نظر خود دست پیدا کنید.</h3>
            </div>
            <div v-else class="w-full flex flex-col">
                <div class="px-4 w-full flex flex-col items-start gap-4"
                    v-if="(searchResults.length || data?.subProcesses?.length !== (0 || undefined) || data?.processes?.length !== (0 || undefined) || data?.procedures?.length !== (0 || undefined) || data?.files?.length !== (0 || undefined))">
                    <div class="w-full gap-8 flex justify-center items-center">
                        <h1 class="text-center font-sm xl:text-base font-bold mb-2 mr-4">وضعیت: {{ data.statusText }}</h1>
                        <span v-if="!data.status" class="loading loading-dots loading-lg"></span>
                    </div>
                    <h1 class="font-sm xl:text-base font-bold mb-4 mr-4">نتایج جستجو:</h1>
                    <sub-process-result-search v-if="data?.subProcesses" v-for="(itemDoc, index) in data?.subProcesses"
                        :key="index" :item="itemDoc"
                        :row-number="((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1"></sub-process-result-search>
                    <process-result-search v-if="data?.processes" v-for="(itemDoc, index) in data?.processes"
                        :key="index" :item="itemDoc"
                        :row-number="((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1"></process-result-search>
                    <procedure-result-search v-if="data?.procedures" v-for="(itemDoc, index) in data?.procedures"
                        :key="index" :item="itemDoc"
                        :row-number="((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1"></procedure-result-search>
                    <file-result-search v-if="data?.files || searchResults.length"
                        v-for="(itemDoc, index) in (data?.files)" :key="index"
                        :row-number="((data!.meta.current_page - 1) * data!.meta.per_page) + index + 1" :item="itemDoc"
                        :typeDoc="data.typeDoc" :keyword="data?.keyword"></file-result-search>
                </div>
                <div v-if="searchOnced && ( data?.subProcesses?.length === 0 || data?.processes?.length === 0 || data?.procedures?.length === 0  || data?.files?.length === 0)" class="flex w-full p-5 bg-red-50 border border-red-300 rounded-lg"><h3 class="font-sm xl:text-base font-normal">سندی یافت نشد.</h3></div>
            </div>
        </section>




    </div>
</template>

<script setup lang="ts">
import { toRaw } from "vue";
import Echo from 'laravel-echo'
import type { ArchitectureBaseDto } from '~/composables/architectures/architecture.dto';
import { useAdvancedSearchService, useGetBaseArchitecturesService, useGetBaseDirectoratesService, useGetOcrResultsService } from '~/composables/home/home.service';
import { useAdvancedSearchValidation } from '~/composables/home/home.validation';
import type { DirectorateBaseDto } from '~/composables/directorates/directorate.dto';
import { ButtonVariantEnum } from '~/types';
import { Form } from "vee-validate"

const doctypes = [
    {
        title: "فرایند",
        value: "process"
    },
    {
        title: "زیر فرایند",
        value: "subProcess"
    },
    {
        title: "روش اجرایی",
        value: "procedure"
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
const itemsInSearch = [
    {
        title: "عنوان",
        value: "title"
    },
    {
        title: "کد",
        value: "code"
    },
    {
        title: "فایل های شناسنامه ",
        value: "files"
    },
]



const query = ref({})
const route = useRoute()
const router = useRouter()
const searchOnced = ref(false)
const loading = ref(false)
let data = ref<any>()
const architectures = ref<ArchitectureBaseDto[]>([]);
const directorates = ref<DirectorateBaseDto[]>([])
const showProceeeSelect = ref(false)
const getArchitectures = useGetBaseArchitecturesService()
const getDirectorates = useGetBaseDirectoratesService();
const { schema } = useAdvancedSearchValidation()
const searchResults = useState('searchResults', () => [])
const searchKeyword = useState('searchKeyword', () => '')

getArchitectures().then((response) => {
    if (response !== undefined) {
        architectures.value = response
    }
})

const changeSelectItem = async (selectedItemId) => {
    const data = await getDirectorates(selectedItemId, {})
    if (data !== undefined) {
        directorates.value = data
    }
}
const changeDocTypeItem = (selectedItemId) => {
    if (selectedItemId === "process") {
        showProceeeSelect.value = false
    }
    else {
        showProceeeSelect.value = true
    }
}
const doSearch = useAdvancedSearchService();
const submit = (values) => {
    // searchOnced.value =false
    loading.value = true
    query.value = { ...values }
    router.push({ query: query.value })
    doSearch(values).then((response) => {
        if (response !== undefined) {
            data.value = response
            // searchResults.value = data.value
            // searchKeyword.value = data.keyword.value
        }

    }).finally(() => {
        loading.value = false
        searchOnced.value = true
    })

}
const handleFilter = (link) => {
    doSearch({ ...query.value, ...link }).then((response) => {
        if (response !== undefined) {
            console.log(response)
            data.value = response

        }

    }).finally(() => {
        loading.value = false
        searchOnced.value = true
    })
}
const getOcrResults = useGetOcrResultsService()






</script>

<style scoped></style>