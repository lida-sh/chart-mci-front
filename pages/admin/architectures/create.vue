<template>
    <div class="px-[1rem]  pb-[0.2rem]">
        <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]">
            <h3 class="mb-10 text-md text-gray-600 font-bold">ایجاد معماری جدید</h3>
            <Form :validation-schema="schema" @submit="submit"
                class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-2">
                <app-text-input name="title" :label="$t('title')" class="col-span-6"></app-text-input>
                <app-select-input name="type" :optionsList="optionsType" :label="$t('type')" class="col-span-2"></app-select-input>
                <app-text-input name="old_directorates_count" :label="$t('old_directorates_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-text-input name="old_departments_count" :label="$t('old_departments_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-text-input name="old_positions_count" :label="$t('old_positions_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-text-input name="old_expert_positions_count" :label="$t('old_expert_positions_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-text-input name="office_manager_count" :label="$t('office_manager_count')" class="col-span-2" type="number" min="0"></app-text-input>
                <app-select-input name="status" :label="$t('status')" class="col-span-2" :options-list="options" ></app-select-input>
                <app-file-input name="files" :label="$t('files')" class="col-span-4"></app-file-input>
                <app-text-input name="description" area :label="$t('description')" class="col-span-6"></app-text-input>
                <app-button type="submit" :loading="loading"
                    class="btn btn-block col-span-6 bg-indigo-800 hover:bg-indigo-600 text-white hover:text-base mt-2">{{ $t('submit')
                    }}</app-button>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import { Form } from "vee-validate"


import { useArchitectureValidation } from "~/composables/architectures/useArchitecture.validation";
import { useCreateArchitecture } from "~/composables/architectures/useCreateArchitecture";
import { ButtonVariantEnum } from "~/types";

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
const { $t } = useNuxtApp()
const { schema } = useArchitectureValidation()
const { submit, loading } = useCreateArchitecture()
</script>

<style scoped></style>