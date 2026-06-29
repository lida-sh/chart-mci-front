<template>
    <div class="px-[1rem] pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-[5rem]">
            <template v-if="architecture">
                <h3 class="mb-10 text-md text-gray-600 font-bold">ویرایش معماری {{ architecture?.displayTitle }}</h3>
                <Form :validation-schema="schema" @submit="submit"
                    class="grid grid-cold-1 sm:grid-cols-6 gap-2 items-center">
                    <app-text-input name="title" v-model="architecture.title" :label="$t('title')"
                        class="col-span-6"></app-text-input>
                    <app-select-input name="type" :optionsList="optionsType" v-model="architecture.type" :label="$t('type')"
                        class="col-span-2"></app-select-input>
                    <app-text-input name="old_directorates_count" :label="$t('old_directorates_count')" class="col-span-2" type="number" min="0" v-model="architecture.old_directorates_count"></app-text-input>
                    <app-text-input name="old_departments_count" :label="$t('old_departments_count')" class="col-span-2" type="number" min="0" v-model="architecture.old_departments_count"></app-text-input>
                    <app-text-input name="old_positions_count" :label="$t('old_positions_count')" class="col-span-2" type="number" min="0" v-model="architecture.old_positions_count"></app-text-input>
                    <app-text-input name="old_expert_positions_count" :label="$t('old_expert_positions_count')" class="col-span-2" type="number" min="0" v-model="architecture.old_positions_count"></app-text-input>
                    <app-text-input name="office_manager_count" :label="$t('office_manager_count')" class="col-span-2" type="number" min="0" v-model="architecture.office_manager_count"></app-text-input>
                    <app-select-input name="status" :label="$t('status')" class="col-span-2" :options-list="options" v-model="architecture.status"></app-select-input>
                    <app-file-input name="files" :label="$t('files')" class="col-span-4"></app-file-input>
                    <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 col-span-6">
                        <template v-for="(item, index) in filesArchitecture" :key="index">
                            <div class="relative flex items-center justify-center px-2 py-3 w-40 shadow-lg rounded-lg">
                                <type-file-display :file-name="item.fileName" :file-path="item.filePath"></type-file-display>
                                <button class="absolute right-2 top-2 text-red-600" type="button" @click="deleteFile(item.id)">
                                    <IconsAdminClose></IconsAdminClose>
                                </button>
                            </div>
                        </template>
                    </div>
                    <app-text-input name="description" v-model="architecture.description" area
                        :label="$t('description')" class="col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block col-span-6 bg-[#0A2A92] hover:bg-indigo-500 text-white mt-2">{{
                            $t('submit')
                        }}</app-button>
                </Form>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import type { FileDto } from '~~/composables/file.dto';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { Form } from "vee-validate"
import { useGetArchitectureByIdService } from "~/composables/architectures/useArchitecture.service";
import { useEditArchitectureValidation } from "~/composables/architectures/useArchitecture.validation";
import { useEditArchitecture } from "~/composables/architectures/useEditArchitecture";
const route = useRoute();

const optionsType = [
    {
        title: "اداره کل",
        value: "directorate"
    },
    {
        title: "معاونت",
        value: "deputy"
    },
]
const options = [
    {
        title: "فعال",
        value: "1"
    },
    {
        title: "غیر فعال",
        value: "0"
    },
]
const fileIdsForDeleteArray = ref<number[]>([])
const filesArchitecture = ref<FileDto[]>([])
const { $t } = useNuxtApp()
const { schema } = useEditArchitectureValidation()
const { submit, loading } = useEditArchitecture(route.params.id, fileIdsForDeleteArray.value)

const getArchitecture = useGetArchitectureByIdService()

const { data: architecture, pending } = await useLazyAsyncData("architecture" + route.params.id, () => getArchitecture(route.params.id as string), { server: false })
watch(architecture, (value)=>{
    if(architecture.value){
        filesArchitecture.value = architecture?.value.files
    }
    
},{immediate:true})

const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    console.log("click", fileIdsForDeleteArray.value)
    let index = filesArchitecture.value.findIndex((item) => item.id === id)
    console.log("index", index)
    filesArchitecture.value.splice(index, 1)
    console.log("test", filesArchitecture.value)
}
console.log("recieve architecte is", architecture.value)
</script>

<style scoped></style>