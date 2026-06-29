<template>
    <div class="px-[1rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]">
            <h3 class="mb-3 text-md text-gray-600 font-bold">ایجاد اداره جدید</h3>
            <hr class="mb-5 sm:mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col md:grid md:grid-cols-6 md:gap-2">
                    <app-text-input name="title" :label="$t('title')" class="col-span-1 sm:col-span-6"></app-text-input>
                    <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                        class="col-span-3" @selectedItem="changeSelectItem"></app-select-input>
                    <app-select-input name="directorate_id" :options="directorates!" :label="$t('directorate_id')"
                        class="col-span-3"></app-select-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        class="col-span-2"></app-select-input>
                    <app-select-input name="occupied" :options-list="occupied_options" :label="$t('occupied')"
                        class="col-span-2"></app-select-input>
                    <app-text-input name="evaluated_expert_positions_count" :label="$t('evaluated_expert_positions_count')" class="md:col-span-2" type="number" min="0"></app-text-input>
                    <app-text-input name="old_permanent_experts_count" :label="$t('old_permanent_experts_count')" class="md:col-span-3 xl:col-span-2" type="number" min="0"></app-text-input>
                    <app-text-input name="old_contracting_experts_count" :label="$t('old_contracting_experts_count')" class="md:col-span-3 xl:col-span-2" type="number" min="0"></app-text-input>
                    <app-text-input name="old_below_expert_count" :label="$t('old_below_expert_count')" class="col-span-2" type="number" min="0"></app-text-input>
                    
                    <div class="flex col-span-4">
                        <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                    </div>
                    <app-text-input name="description" area :label="$t('description')"
                        class="sm:col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block sm:col-span-6 bg-indigo-800 hover:bg-indigo-600 text-white hover:text-base mt-2">{{
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

import { ToastEnum, ButtonVariantEnum } from "~/types";


const { $t } = useNuxtApp()
const loading = ref<boolean>(false);

const { schema } = useDepartmentValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useGetBaseDirectoratesService } from "~/composables/directorates/useDirectorate.service";
import type { DirectorateBaseDto } from "~/composables/directorates/directorate.dto";
import { useDepartmentValidation } from "~/composables/departments/useDepartment.validation";
import { useCreateDepartmentService } from "~/composables/departments/useDepartment.service";

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
const directorates = ref<DirectorateBaseDto[]>([])
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createDepartment = useCreateDepartmentService();
const getArchitectures = useGetBaseArchitecturesService()
const getDirectorates = useGetBaseDirectoratesService();
const { data: architectures, error } = await useLazyAsyncData('architectures', () => getArchitectures({ toastError: true }), {
    server: false
})

useErrorHandler(error)


console.log("architectures are", architectures)
const changeSelectItem = async (selectedItemId) => {
    const data = await getDirectorates(selectedItemId, { toastError: true })
    if (data !== undefined) {
        directorates.value = data
    }

    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}



const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    console.log("ok");
    loading.value = true
    
    createDepartment({...values}, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "اداره جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/departments")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped>
.en{
    font-family:Arial, Helvetica, sans-serif;
}</style>