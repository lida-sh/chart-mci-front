<template>
    <div>
        <div class="px-[3rem]  pb-[0.2rem]">
            <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
                <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد مجوز جدید</h3>
                <hr class="mb-5 sm:mb-10">
                <Form :validation-schema="schema" @submit="submit">
                    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4">
                        <app-text-input name="permission_display_name" :label="$t('permission_display_name')"
                            class=" sm:col-span-1"></app-text-input>
                        <app-text-input name="permission_name" :label="$t('permission_name')"
                            class="sm:col-span-1"></app-text-input>
                        <app-button type="submit" :loading="loading"
                            class="btn btn-block h-8 sm:col-span-2 bg-indigo-800 hover:bg-indigo-500 text-white hover:text-base mt-2">{{
                                $t('submit')
                            }}</app-button>
                    </div>
                </Form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin"
})
import { Form } from "vee-validate"
import type { FormActions } from 'vee-validate';
import { useCreatePermissionService } from '~/composables/permissions/usePermission.service';
import { usePermissionValidation } from '~/composables/permissions/usePernission.validation';
import { ToastEnum } from '~/types';
const loading = ref(false)
const { schema } = usePermissionValidation();
const { showToast } = useToast();
const createPermission = useCreatePermissionService()
const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true;
    createPermission({ ...values }, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "مجوز جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            navigateTo("/admin/permissions")
        }
    }).finally(() => {
        loading.value = false
    })

}
</script>

<style scoped></style>