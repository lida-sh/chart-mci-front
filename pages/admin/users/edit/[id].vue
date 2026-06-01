<template>
    <div>
        <div class="px-[3rem] pb-[0.2rem] ">
            <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[3rem]">
                <h3 class="mb-3 text-lg text-gray-600 font-bold">ایجاد کاربر جدید</h3>
                <hr class="mb-5 sm:mb-10">
                <Form :validation-schema="schema" @submit="submit">
                    <div v-if="userData" class="flex flex-col lg:grid lg:grid-cols-3 lg:gap-4">
                        <app-text-input name="first_name" v-model="userData.first_name" :label="$t('first_name')"
                            class=" sm:col-span-1"></app-text-input>
                        <app-text-input name="last_name" v-model="userData.last_name" :label="$t('last_name')"
                            class="sm:col-span-1"></app-text-input>
                        <app-text-input name="national_code" v-model="userData.national_code" :label="$t('national_code')"
                            class="sm:col-span-1"></app-text-input>
                        <app-text-input name="email" v-model="userData.email" :label="$t('email')" class="sm:col-span-1"></app-text-input>
                        <app-text-input name="password" v-model="userData.password" :label="$t('password')" class="sm:col-span-1"></app-text-input>
                        <app-select-input name="role" v-model="userData.roles[0].name" :options-list="optionsList" :label="$t('role')"
                            class="col-span-1"></app-select-input>
                        <div class="flex flex-col w-full sm:col-span-3 my-4">
                            <app-collaps-permission>
                                <template #title>
                                    <h6 class="text-[11px] lg:text-[14px] font-medium">
                                        مجوزها
                                    </h6>
                                </template>
                                <div v-if="permissions"
                                    class="text-base leading-7 font-light py-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <template class="" v-for="(item, index) in permissions" :key="index">
                                        <div class="justify-start">
                                            <Field type="checkbox" name="permissions" v-model="permissionSelected" :value="item.name" 
                                                :id="item.name" class="ml-2 focus:ring-0 focus:ring-offset-0 "/>
                                                                                                                                                  
                                            <label :for="item.name" class="text-sm">{{ item.display_name }}</label>
                                        </div>
                                    </template>
                                </div>
                            </app-collaps-permission>
                            
                        </div>
                        <app-button type="submit" :loading="loading"
                            class="btn btn-block h-8 sm:col-span-3 bg-indigo-800 hover:bg-indigo-500 text-white hover:text-base my-8 lg:my-4">{{
                                $t('submit')
                            }}</app-button>
                    </div>
                </Form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// :checked="userData.permissions.some((i)=>{return i == item.display_name})"
import Multiselect from '@vueform/multiselect'
definePageMeta({
    layout: "admin"
})
import { Form, Field, useField } from "vee-validate"
import { useUserValidation } from "~/composables/users/useUser.validation"
import { useGetRolesAndPermissions } from "~/composables/roles/useRole.service"
import {PermissionDto} from "~/composables/permissions/permission.dto"
import {useEditUser} from "~/composables/users/useEditUser"

import { ToastEnum } from '~/types';
import {useGetUserByIdService} from "~/composables/users/useUser.service"
const route = useRoute();

const permissions = ref<PermissionDto[]>([])
interface OptionList {
    title: string,
    value: string
}
const optionsList = ref<OptionList[]>([])
const userData = ref()
const permissionSelected = ref([])
const { schema } = useUserValidation()
const getRolesAndPermissions = useGetRolesAndPermissions()
const getUserById = useGetUserByIdService()

onMounted(async () => {
    const [rolesAndPermissions, user] = await Promise.all([getRolesAndPermissions(), getUserById(route.params.id as string)]);
    if (rolesAndPermissions !== undefined) {
        if (Array.isArray(rolesAndPermissions.roles)) {
            for (let i = 0; i < rolesAndPermissions.roles.length; i++) {
                optionsList.value.push({
                    title: rolesAndPermissions.roles[i].display_name,
                    value: rolesAndPermissions.roles[i].name
                })
            }
        }
        permissions.value = rolesAndPermissions.permissions
        
    }
    if(user !== undefined){
        userData.value = user
        permissionSelected.value = userData.value.permissions
        console.log("permissionSelected", permissionSelected.value)
    }
 
})

const { submit, loading } = useEditUser(route.params.id as string)

</script>

<style scoped></style>