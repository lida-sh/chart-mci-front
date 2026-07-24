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
          <Form :validation-schema="schema" @submit="submit">
            <app-select-input
              name="province_id"
              :options="data?.provinces"
              :label="$t('architecture_id')"
              class=""
            ></app-select-input>
            <div class="space-y-4">
              <div
                v-for="(item, index) in items"
                :key="index"
                class="flex flex-col gap-4 border rounded-lg p-4"
              >
                <div class="col-span-5">
                  <div class="flex flex-col md:grid md:grid-cols-6 md:gap-2">
                    <app-text-input
                      name="title"
                      :label="$t('title')"
                      class="col-span-1 sm:col-span-6"
                    ></app-text-input>
                    <app-select-input
                      name="architecture_id"
                      class="col-span-3"
                      @selectedItem=""
                    ></app-select-input>
                    <app-select-input
                      name="directorate_id"
                      class="col-span-3"
                    ></app-select-input>
                    <app-select-input
                      name="status"
                      :options-list="options"
                      :label="$t('status')"
                      class="col-span-2"
                    ></app-select-input>
                    <app-select-input
                      name="occupied"
                      :label="$t('occupied')"
                      class="col-span-2"
                    ></app-select-input>
                    <app-text-input
                      name="evaluated_expert_positions_count"
                      :label="$t('evaluated_expert_positions_count')"
                      class="md:col-span-2"
                      type="number"
                      min="0"
                    ></app-text-input>
                    <app-text-input
                      name="old_permanent_experts_count"
                      :label="$t('old_permanent_experts_count')"
                      class="md:col-span-3 xl:col-span-2"
                      type="number"
                      min="0"
                    ></app-text-input>
                    <app-text-input
                      name="old_contracting_experts_count"
                      :label="$t('old_contracting_experts_count')"
                      class="md:col-span-3 xl:col-span-2"
                      type="number"
                      min="0"
                    ></app-text-input>
                    <app-text-input
                      name="old_below_expert_count"
                      :label="$t('old_below_expert_count')"
                      class="col-span-2"
                      type="number"
                      min="0"
                    ></app-text-input>

                    <div class="flex col-span-4">
                      <app-file-input
                        name="files"
                        :label="$t('files')"
                        class="w-full"
                      ></app-file-input>
                    </div>
                    <app-text-input
                      name="description"
                      area
                      :label="$t('description')"
                      class="sm:col-span-6"
                    ></app-text-input>
                    <app-button
                      type="submit"
                      :loading="loading"
                      class="btn btn-block sm:col-span-6 bg-indigo-800 hover:bg-indigo-600 text-white hover:text-base mt-2"
                      >{{ $t("submit") }}</app-button
                    >
                  </div>
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
                  <button
                    class="btn btn-error btn-sm"
                    @click="removeItem(index)"
                  >
                    حذف
                  </button>
                </div>
              </div>

              <button class="btn btn-primary" @click="addItem">+ افزودن</button>
              <button class="btn btn-circle btn-primary">
                <Icon name="heroicons:plus" />
              </button>
            </div>
          </Form>
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
import {
  useGetProvincesService,
  useGetRegionDirectoratesService,
} from "~/composables/regions/useRegion.service";
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
interface Province {
  id: number
  title: string
}
const provinces = ref<Province[]>([]);
const getProvince = useGetProvincesService();
const getRegionDirectorates = useGetRegionDirectoratesService();
const { data, pending, error } = await useAsyncData(
  "create-region",
  async () => {
    const [provinces, regionDirectorate] = await Promise.all([
      getProvince(),
      getRegionDirectorates(),
    ]);
    return { provinces, regionDirectorate };
  },
  { server: false },
);
// watch(
//   data,
//   (value) => {
//     if (value) {
//       provinces.value = value.provinces;
//       // .map((item) => ({
//       // title: item.title,
//       // value: item.id,
//       // }))
//       console.log("provinces", value.provinces);
//     }
//   },
//   { immediate: true },
// );
</script>

<style scoped>
/* .tabs-lift .tab[type="radio"] {
  appearance: none !important;
  -webkit-appearance: none !important;
  background-image: none !important;
} */
</style>
