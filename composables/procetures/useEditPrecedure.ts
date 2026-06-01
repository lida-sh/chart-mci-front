import { useEditProcessService } from "~/composables/processes/useProcess.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import { useEditProcetureService } from "./useProcedure.service";
import dayjs from 'dayjs';
export const useEditProceture = (id:number,fileIdsForDelete:number[]) => {
  const loading = ref<boolean>(false);
  const editProceture = useEditProcetureService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    
    loading.value = true;
    editProceture({...values, notification_date:dayjs(values.notification_date).format('YYYY-MM-DD'), fileIdsForDelete}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "سند موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          return navigateTo("/admin/procedures")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
