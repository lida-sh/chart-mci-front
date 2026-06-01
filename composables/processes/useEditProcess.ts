import { useEditProcessService } from "~/composables/processes/useProcess.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import dayjs from 'dayjs';
export const useEditProcess = (id:number,fileIdsForDelete:number[]) => {
  
  const loading = ref<boolean>(false);
  console.log("loading are",loading.value);
  const editProcess = useEditProcessService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    console.log("values are",values);
    loading.value = true;
    console.log("loading", loading.value);
    editProcess({...values, notification_date:dayjs(values.notification_date).format('YYYY-MM-DD'), fileIdsForDelete}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "فرایند موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          navigateTo("/admin/processes")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
