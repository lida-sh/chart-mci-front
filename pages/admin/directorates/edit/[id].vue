<template>
    <div class="px-[1rem]  pb-[0.2rem]">
        <div v-if="!pending" class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
            <h3 class="mb-3 text-sm text-gray-600 font-bold">ویرایش اداره کل {{ data?.directorate?.title }}</h3>
            <hr class="mb-10">
            <Form :validation-schema="schema" @submit="submit">
                <div class="flex flex-col lg:grid lg:grid-cols-6 gap-3 lg:gap-2">
                    <app-text-input name="title" v-model="data!.directorate!.title" :label="$t('title')"
                        class="lg:col-span-6"></app-text-input>
                    <app-select-input name="architecture_id" :options="data?.architectures!"
                        v-model="data!.directorate!.architecture_id" :label="$t('architecture_id')" class="lg:col-span-2"
                        @selectedItem="changeSelectItem"></app-select-input>
                    <app-select-input name="status" :options-list="options" :label="$t('status')"
                        v-model="data!.directorate!.status" class="lg:col-span-2"></app-select-input>
                    <app-select-input name="occupied" :options-list="occupied_options" :label="$t('occupied')"
                        v-model="data!.directorate!.occupied" class="lg:col-span-2"></app-select-input>
                    <app-file-input name="files" :label="$t('files')" class="lg:col-span-4"></app-file-input>
                    <app-text-input name="office_manager_count" :label="$t('office_manager_count')"  v-model="data!.directorate!.office_manager_count" class="col-span-2" type="number" min="0"></app-text-input>
                    <div class="flex flex-col items-center gap-4 md:flex-row flex-wrap col-span-6"> 
                        <template v-for="(item, index) in filesDirectorate" :key="index">
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
                        v-model="data!.directorate!.description" class="lg:col-span-6"></app-text-input>
                    <app-button type="submit" :loading="loading"
                        class="btn btn-block lg:col-span-6 bg-indigo-800 hover:bg-indigo-500 text-white hover:text-l mt-2">{{
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
import { useGetBaseArchitecturesService } from "~/composables/architectures/useArchitecture.service";
import { useEditDirectorateValidation } from "~/composables/directorates/useDirectorate.validation";
import { ToastEnum, ButtonVariantEnum } from "~/types";

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
const { $t } = useNuxtApp()
// const loading = ref<boolean>(false);

const { schema } = useEditDirectorateValidation()
const { showToast } = useToast();
const route = useRoute();
import { useErrorHandler } from "~/composables/useErrorHandler";
import type { ArchitectureBaseDto } from "~/composables/architectures/architecture.dto";
import { useCreateDirectorateService } from "~/composables/directorates/useDirectorate.service";
import { useGetDirectorateByIdService } from "~/composables/directorates/useDirectorate.service"
import type { FileDto } from '~~/composables/file.dto';
import { useEditDirectorate } from "~/composables/directorates/useEditDirectorate";

const architectureIdSelected = ref<number | null>(null)
const architectureSelected = ref<ArchitectureBaseDto | null>(null)
const fileIdsForDeleteArray = ref<number[]>([])
const filesDirectorate = ref<FileDto[]>([])
const getArchitectures = useGetBaseArchitecturesService()
const getDirectorateById = useGetDirectorateByIdService();
const createDirectorate = useCreateDirectorateService();
const changeSelectItem = (selectedItemId) => {
    // architectureIdSelected.value = selectedItemId

    // architectureSelected.value = architectures.value?.find((item) => item.id == architectureIdSelected.value)
    // console.log("emit", architectureSelected.value)
}


const { data, pending, error } = await useAsyncData('edit-directorate' + route.params.id, async () => {
    const [architectures, directorate] = await Promise.all([getArchitectures(), getDirectorateById(route.params.id as string)]);
    return { architectures, directorate }
}, { server: false })
// useErrorHandler(error)
watch(data, (value) => {
    if ((data.value)?.directorate) {
        filesDirectorate.value = (data.value)?.directorate?.files
    }

}, { immediate: true })
const deleteFile = (id: number) => {
    fileIdsForDeleteArray.value?.push(id);
    console.log("click", fileIdsForDeleteArray.value)
    let index = filesDirectorate.value.findIndex((item) => item.id === id)
    console.log("index", index)
    filesDirectorate.value.splice(index, 1)
    console.log("test", filesDirectorate.value)
}
console.log("processById", data)
const { submit, loading } = useEditDirectorate(route.params.id, fileIdsForDeleteArray.value)



</script>

<style scoped></style>