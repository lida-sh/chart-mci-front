import DatePicker from "vue3-persian-datetime-picker";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.vueApp.component("date-picker", DatePicker);
  }
});