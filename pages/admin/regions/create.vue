<template>
  <div class="px-[1rem] pb-[0.2rem]">
    <div class="bg-white shadow-lg rounded-2xl p-4 sm:p-[4rem]">
      <h3 class="mb-10 text-md text-gray-600 font-bold">ایجاد معماری جدید</h3>
      <div role="tablist" class="tabs tabs-bordered mb-6">
        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          اطلاعات پایه
        </a>

        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeTab === 'departments' }"
          @click="activeTab = 'departments'"
        >
          ادارات
        </a>

        <a
          role="tab"
          class="tab"
          :class="{ 'tab-active': activeTab === 'users' }"
          @click="activeTab = 'users'"
        >
          کاربران
        </a>
      </div>

      <div class="bg-white border rounded-xl p-6">
        <div v-if="activeTab === 'info'">
          <div class="space-y-4">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="grid grid-cols-12 gap-4 border rounded-lg p-4"
            >
              <div class="col-span-5">
                <input
                  v-model="item.title"
                  type="text"
                  class="input input-bordered w-full"
                  placeholder="عنوان"
                />
              </div>

              <div class="col-span-5">
                <select
                  v-model="item.type"
                  class="select select-bordered w-full"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="1">نوع اول</option>
                  <option value="2">نوع دوم</option>
                </select>
              </div>
              <div class="col-span-2 flex items-center">
                <button class="btn btn-error btn-sm" @click="removeItem(index)">
                  حذف
                </button>
              </div>
            </div>

            <button class="btn btn-primary" @click="addItem">+ افزودن</button>
            <button class="btn btn-circle btn-primary">
  <Icon name="heroicons:plus" />
</button>
          </div>
        </div>

        <div v-else-if="activeTab === 'departments'">محتوای ادارات</div>

        <div v-else-if="activeTab === 'users'">محتوای کاربران</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
import { Form } from "vee-validate";

import { useArchitectureValidation } from "~/composables/architectures/useArchitecture.validation";
import { useCreateArchitecture } from "~/composables/architectures/useCreateArchitecture";
import { ButtonVariantEnum } from "~/types";
const activeTab = ref("info");
const items = ref([
  {
    title: "",
    type: "",
  },
]);

const addItem = () => {
  items.value.push({
    title: "",
    type: "",
  });
};

const removeItem = (index) => {
  items.value.splice(index, 1);
};
const optionsType = [
  {
    title: "اداره کل",
    value: "directorate",
  },
  {
    title: "معاونت",
    value: "deputy",
  },
];
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
const { $t } = useNuxtApp();
const { schema } = useArchitectureValidation();
const { submit, loading } = useCreateArchitecture();
</script>

<style scoped>
.tabs-lift .tab[type="radio"] {
  appearance: none !important;
  -webkit-appearance: none !important;
  background-image: none !important;
}
</style>
