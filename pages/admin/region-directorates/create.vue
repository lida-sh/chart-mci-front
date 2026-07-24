<template>
  <div class="px-[1rem] pb-[0.2rem]">
    <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]">
      <h3 class="mb-10 text-md text-gray-600 font-bold">
        ایجاد اداره کل منطقه جدید
      </h3>
      <Form
        :validation-schema="schema"
        @submit="submit"
        class="flex flex-col lg:grid lg:grid-cols-6 lg:gap-2"
      >
        <app-text-input
          name="title"
          :label="$t('title')"
          class="col-span-4"
        ></app-text-input>
        <app-select-input
          name="status"
          :label="$t('status')"
          class="col-span-2"
          :options-list="options"
        ></app-select-input>
        <app-file-input
          name="files"
          :label="$t('files')"
          class="col-span-6"
        ></app-file-input>
        <app-text-input
          name="description"
          area
          :label="$t('description')"
          class="col-span-6"
        ></app-text-input>
        <app-button
          type="submit"
          :loading="loading"
          class="btn btn-block col-span-6 bg-indigo-800 hover:bg-indigo-600 text-white hover:text-base mt-2"
          >{{ $t("submit") }}</app-button
        >
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});


import { useRegionDirectorateValidation } from "~/composables/region-directorates/useRegionDirectorate.validation";
import { useCreateRegionDirectorateService } from "~/composables/region-directorates/useRegionDirectorate.service";
import { Form, type FormActions } from "vee-validate"

const options = [
  {
    title: "فعال",
    value: "1",
  },
  {
    title: "غیر فعال",
    value: "0",
  },
];
import { ToastEnum } from "~/types";
const { $t } = useNuxtApp();
const loading = ref<boolean>(false);
    const { showToast } = useToast();
const { schema } = useRegionDirectorateValidation();
const createRegionDirectorate = useCreateRegionDirectorateService()
const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true
    console.log("submit", values)
    createRegionDirectorate({ ...values }, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "اداره کل منطقه جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/region-directorates")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>
