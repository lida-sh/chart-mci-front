<template>
    <div class="">
        <h2 class="mb-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">ورود به حساب کاربری
        </h2>
        <div role="alert" v-if="error" class="bg-red-100 border border-red-300 text-red-600 text-sm py-4 px-4 rounded-lg  mb-8">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> -->
            <span>{{ error }}</span>
        </div>
        <Form :validation-schema="schema" class="space-y-3" @submit="submit">
            <div>
                <app-text-input name="username" :label="$t('username')" thin
                    class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
            </div>
            <div class="flex flex-col ">
                <div class="flex items-center self-end">
                    <div class="text-sm">
                        <button @click="resetPasswordClick" class="font-semibold text-indigo-600 hover:text-indigo-500">
                            فراموشی رمز عبور</button>
                    </div>
                </div>
                <div class="">
                    <app-text-input name="password" type="password" thin :label="$t('password')"
                        class="focus:ring-2 focus:ring-inset focus:ring-indigo-600"></app-text-input>
                </div>
            </div>
            <div>
                <app-button type="submit" :loading="loading"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ورود</app-button>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
import { Form } from "vee-validate"
import { useLogin } from "~/composables/auth/login/useLogin";
import { useLoginValidation } from "~/composables/auth/login/useLogin.validation";
const emit = defineEmits(["resetPassword"]);
const resetPasswordClick = () => {
    emit("resetPassword");
};
const { submit, loading, error } = useLogin()
const { schema } = useLoginValidation()
</script>

<style scoped></style>