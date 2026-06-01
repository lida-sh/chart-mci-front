<template>
    <div>
        <div class="px-[3rem]  pb-[0.2rem]">
            <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[5rem]">
                <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد نقش جدید</h3>
                <hr class="mb-5 sm:mb-10">
                <Form :validation-schema="schema" @submit="submit">
                    <div class="flex flex-col lg:grid lg:grid-cols-2 lg:gap-4">
                        <app-text-input name="role_display_name" :label="$t('role_display_name')"
                            class=" sm:col-span-1"></app-text-input>
                        <app-text-input name="role_name" :label="$t('role_name')"
                            class="sm:col-span-1"></app-text-input>
                        <!-- <ClientOnly> -->
                            <div class="flex flex-col w-full sm:col-span-2 my-4">
                                <app-collaps-permission>
                                    <template #title>
                                        <h6 class="text-[11px] lg:text-[14px] font-medium">
                                            مجوزها
                                        </h6>
                                    </template>
                                    <div v-if="permissionsRole"
                                        class="text-base leading-7 font-light py-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                        <template class="" v-for="(item, index) in permissionsRole" :key="index" >
                                            <div class="justify-start">
                                                <Field type="checkbox" name="permissions" :value="item.name" as="input"
                                                    :id="item.name" class="ml-2 focus:ring-0 focus:ring-offset-0 " 
                                                    @change="handlePermissionChange"/>
                                                <!-- <input :id="item.name" type="checkbox" @input="handlePermissionChange(item.name, $event)"
                                                    class="ml-2 focus:ring-0 focus:ring-offset-0 " :name="item.name"
                                                    :value="item.name"> -->
                                                <label :for="item.name" class="">{{ item.display_name }}</label>
                                            </div>
                                        </template>
                                        
                                        
                                    </div>
                                </app-collaps-permission>
                                <label class="flex items-center min-h-[1.4rem] px-1">
                                            <span class="label-text-alt leading-3 text-error text-2xs">{{ errorMessage
                                                }}</span>
                                                 <ErrorMessage name="permissions" class="text-error text-xs mt-4" />
                                        </label>
                            </div>
                        <!-- </ClientOnly> -->
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
import { Form, Field, useField, useFieldArray, ErrorMessage } from "vee-validate"
import type { FormActions } from 'vee-validate';
import { useCreateRoleService } from '~/composables/roles/useRole.service';
import { useRoleValidation } from '~/composables/roles/useRole.validation';
import { ToastEnum } from '~/types';
import { useGetPermissionsService } from "~/composables/permissions/usePermission.service"
definePageMeta({
    layout: "admin"
})
const { value: permissionsValue, errorMessage, handleChange } = useField<string[]>(
  'permissions',
  (value) => {
    if (!value || value.length === 0) {
      return 'حداقل یک مجوز باید انتخاب شود';
    }
    return true;
  },
  {
    initialValue: [],
    validateOnValueUpdate: true,
    
  }
);

const handlePermissionChange = (permissionName: string, event: Event) => {
    
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
  
  if (isChecked) {
    // اضافه کردن permission به آرایه
    permissionsValue.value = [...permissionsValue.value, permissionName];
  } else {
    // حذف permission از آرایه
    permissionsValue.value = permissionsValue.value.filter(
      (name) => name !== permissionName
    );
  }
  console.log("trigg", permissionsValue.value)
  console.log("isChecked", isChecked)
  console.log("permissionsValue.value", permissionsValue.value)
};

const { schema } = useRoleValidation();

const loading = ref(false);

const { showToast } = useToast();

const createRole = useCreateRoleService()
const getPermissions = useGetPermissionsService()
const { target, toggleMenu, closeMenu, openMenu } = useMenu();
const { data: permissionsRole, pending } = await useAsyncData("permissions", () => getPermissions(), { server: false })

const submit = (values, { setErrors, resetForm }) => {
    loading.value = true
    console.log("values", values)
    createRole({ ...values }, { setErrors }).then((res) => {
        if (res !== undefined) {
            showToast({ message: "مجوز جدید ایجاد شد.", type: ToastEnum.success })
            resetForm()
            // navigateTo("/admin/roles")
        }
    }).finally(() => {
        loading.value = false
    })
}
</script>

<style scoped></style>