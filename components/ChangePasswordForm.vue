<template>
    <div>
        <Form :validation-schema="schema"
            :initial-values="{ newPassword: '', confirmPassword: '', token: token }" class="space-y-3"
            @submit="submit">
            <div class="">
                <app-text-input name="token" type="hidden" :value="token"></app-text-input>
            </div>
            <div class="">
                <app-text-input name="password" type="password" thin :label="$t('newPassword')"
                    class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
            </div>
            <div class="">
                <app-text-input name="password_confirmation" type="password" thin :label="$t('confirmNewPassword')"
                    class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
            </div>
            <div>
                <app-button type="submit" :loading="loading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ورود</app-button>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { useChangePasswordValidation } from "~/composables/auth/change-password/useChangePassword.validation"
import { useChangePassword } from "~/composables/auth/change-password/useChangePassword"
import {Form} from "vee-validate"
const route = useRoute();
const token = route.query.token;
// console.log("token", token)
const { submit, loading, error } = useChangePassword(token)
const { schema } = useChangePasswordValidation()
</script>

<style scoped></style>