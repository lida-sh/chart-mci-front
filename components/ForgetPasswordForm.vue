<template>
    <div>
        <h2 class="mb-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">فراموشی رمز عبور
        </h2>
        <Form :validation-schema="schema" class="space-y-6" @submit="submit">
            <div>
                <app-text-input name="email" :label="$t('email')" thin
                    class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
            </div>
            <div>
                <app-button type="submit" :loading="loading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ارسال لینک تغییر رمز عبور</app-button>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import {Form} from "vee-validate"
import { useForgetPassword } from "~/composables/auth/resetPassword/useForgetPassword";
import { useForgetPasswordValidation } from "~/composables/auth/resetPassword/useForgetPassword.validation";
const {submit, loading, error} = useForgetPassword()
const {schema} = useForgetPasswordValidation()
</script>

<style scoped></style>