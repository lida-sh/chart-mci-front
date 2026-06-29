<template>
    <div class="px-[1rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]" v-if="data?.department">
            <h3 class="mb-3 text-md text-gray-600 font-bold">ویرایش اداره  {{ data?.department?.title }}</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-2">
                    <app-text-input name="title" :label="$t('title')" class="col-span-6"
                        v-model="data!.department!.title"></app-text-input>
                    <app-select-input name="architecture_id" :options="data?.architectures!"
                        :label="$t('architecture_id')" class="col-span-3" @selectedItem="changeSelectItem"
                        v-model="data!.department!.architecture_id"></app-select-input>
                    <app-select-input name="directorate_id" :options="directorates!" :label="$t('directorate_id')"
                        class="col-span-3" v-model="data!.department!.directorate_id"></app-select-input>
                    
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        v-model="data!.department!.status" class="col-span-2"></app-select-input>
                    <app-select-input name="occupied" :options-list="occupied_options" :label="$t('occupied')"
                        v-model="data!.department!.occupied" class="col-span-2"></app-select-input>
                    <app-text-input name="evaluated_expert_positions_count" :label="$t('evaluated_expert_positions_count')" class="md:col-span-2" type="number" min="0" v-model="data!.department!.evaluated_expert_positions_count"></app-text-input>
                    <app-text-input name="old_permanent_experts_count" :label="$t('old_permanent_experts_count')" class="md:col-span-3 xl:col-span-2" type="number" min="0" v-model="data!.department!.old_permanent_experts_count"></app-text-input>
                    <app-text-input name="old_contracting_experts_count" :label="$t('old_contracting_experts_count')" class="md:col-span-3 xl:col-span-2" type="number" min="0" v-model="data!.department!.old_contracting_experts_count"></app-text-input>
                    <div class="flex col-span-4">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <app-text-input name="old_below_expert_count" :label="$t('old_below_expert_count')" class="col-span-2" type="number" min="0" v-model="data!.department!.old_below_expert_count"></app-text-input>    
                    <div class="flex flex-col sm:flex-row flex-wrap items-center gap-4 col-span-6">
                        <template v-for="(item, index) in filesDepartment" :key="index">
                            <div class="relative flex items-center justify-center px-2 py-3 w-40 shadow-lg rounded-lg">
                                <type-file-display :file-name="item.fileName"></type-file-display>
                                <button class="absolute right-2 top-2 text-red-600" type="button"
                                    @click="deleteFile(item.id)">
                                    <IconsAdminClose></IconsAdminClose>
                                </button>
                            </div>
                        </template>
                    </div>
                    <app-text-input name="description" area :label="$t('description')"
                        v-model="data!.department!.description" class="sm:col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block col-span-6 bg-indigo-800 hover:bg-indigo-500 text-white mt-2">{{
                            $t('submit')
                        }}</app-button>
                </div>
            </Form>

        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import { Form, type FormActions } from "vee-validate"
import { useCreateArchitectureService, useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";

const { $t } = useNuxtApp()


const { schema } = useEditDepartmentValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseDirectoratesService } from "~/composables/directorates/useDirectorate.service";
import type { DirectorateBaseDto } from "~/composables/directorates/directorate.dto";
import { useEditDepartmentValidation } from "~/composables/departments/useDepartment.validation";
import { useCreateDepartmentService, useGetDepartmentByIdService } from "~/composables/departments/useDepartment.service";
import type { FileDto } from "#imports";
import { useEditDepartment } from "~/composables/departments/useEditDepartment";

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
const occupied_options = [
    {
        title: "دارای رئیس اداره",
        value: "1"
    },
    {
        title: "ظرفیت خالی",
        value: "0"
    },
]
const route = useRoute();
const fileIdsForDeleteArray = ref<number[]>([])
const filesDepartment = ref<FileDto[]>([])
const directorates = ref<DirectorateBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createDepartment = useCreateDepartmentService();
const getArchitectures = useGetBaseArchitecturesService()
const getDirectorates = useGetBaseDirectoratesService();
const getDepartmentById = useGetDepartmentByIdService();


// useErrorHandler(error)

const { data, pending, error } = await useAsyncData('edit-sub-process' + route.params.id, async () => {
    const [architectures, department] = await Promise.all([getArchitectures(), getDepartmentById(route.params.id as string)]);
    return { architectures, department }
}, { server: false })
useErrorHandler(error)
watch(data, async (value) => {
    if ((data.value)?.department) {
        filesDepartment.value = (data.value)?.department?.files
        if (data.value && (data.value)?.architectures) {
            const { data: directoratesData } = await useLazyAsyncData('processes-architecture', () => getDirectorates(data!.value!.department!.architecture_id as number, { toastError: true }), {
                server: false
            })
            if (directoratesData.value) {
                directorates.value = directoratesData.value
            }
        }
    }

}, { immediate: true })
const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    console.log("click", fileIdsForDeleteArray.value)
    let index = filesDepartment.value.findIndex((item) => item.id === id)
    console.log("index", index)
    filesDepartment.value.splice(index, 1)
    console.log("test", filesDepartment.value)
}

const { submit, loading } = useEditDepartment(route.params.id, fileIdsForDeleteArray.value)

const changeSelectItem = async (selectedItemId) => {
    const { data } = await useLazyAsyncData('directorates', () => getDirectorates(selectedItemId, { toastError: true }), {
        server: false
    })
    if (data.value) {
        directorates.value = data.value
    }

}




</script>

<style scoped></style>