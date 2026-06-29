<template>
    <div class="px-[1rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]">
            <h3 class="mb-3 text-md text-gray-600 font-bold">ایجاد اداره کل جدید</h3>
            <hr class="mb-10">
            <Form :validation-schema="schema" @submit="submit" class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-2">
                <app-text-input name="title" class="lg:col-span-6" :label="$t('title')"></app-text-input>
                <app-select-input name="architecture_id" :options="architectures!" :label="$t('architecture_id')"
                    class="col-span-2" @selectedItem="changeSelectItem"></app-select-input>
                <app-select-input name="status" class="lg:col-span-2" :options-list="options" :label="$t('status')"></app-select-input>
                <app-select-input name="occupied" class="lg:col-span-2" :options-list="occupied_options" :label="$t('occupied')"></app-select-input>
                <div class="flex col-span-4">
                    <app-file-input name="files" :label="$t('files')" class="w-full"></app-file-input>
                </div>
                <app-text-input name="office_manager_count" :label="$t('office_manager_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-text-input name="description" area :label="$t('description')" class="col-span-6"></app-text-input>
                <app-button type="submit" :loading="loading"
                    class="btn btn-block lg:col-span-6 bg-indigo-800 hover:bg-indigo-600 text-white text-sm hover:text-base mt-2">{{
                        $t('submit')
                    }}</app-button>
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
import { useDirectorateValidation } from "~/composables/directorates/useDirectorate.validation";
import { ToastEnum, ButtonVariantEnum } from "~/types";
import dayjs from 'dayjs';

const { $t } = useNuxtApp()
const loading = ref<boolean>(false);

const { schema } = useDirectorateValidation()
const { showToast } = useToast();

import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useCreateDirectorateService } from "~/composables/directorates/useDirectorate.service";
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
        title: "دارای مدیر کل",
        value: "1"
    },
    {
        title: "ظرفیت خالی",
        value: "0"
    },
]
const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const createDirectorate = useCreateDirectorateService();
const changeSelectItem = (selectedItemId) => {
    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}
// const prefix_code = computed(() => (architectureSelected.value ? ("PS-" + architectureSelected.value!.code + "-") : ''))
// const prefix_code = "PS - "
const getArchitectures = useGetBaseArchitecturesService()
const { data: architectures, error, execute } = await useLazyAsyncData('architectures', () => getArchitectures(), {server:false
})

// useErrorHandler(error)

// onMounted(() => {
//     if (!unref(architectures)) {
//         execute()
//     }
// })
console.log("architectures are", architectures)

const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true
    console.log("submit", values)
    createDirectorate({ ...values }, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "اداره کل جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/directorates")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>