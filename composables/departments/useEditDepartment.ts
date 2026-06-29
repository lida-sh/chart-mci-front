import { useEditDirectorateService } from "~/composables/directorates/useDirectorate.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import { useEditDepartmentService } from "./useDepartment.service";
import dayjs from 'dayjs';
export const useEditDepartment = (id:number,fileIdsForDelete:number[]) => {
  const loading = ref<boolean>(false);
  const editDepartment = useEditDepartmentService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    // console.log("values are",values);
    loading.value = true;
    editDepartment({...values, notification_date: dayjs(values.notification_date).format('YYYY-MM-DD'), fileIdsForDelete}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "اداره موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          return navigateTo("/admin/departments")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
