import { useEditDirectorateService } from "~/composables/directorates/useDirectorate.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import dayjs from 'dayjs';
export const useEditDirectorate = (id:number,fileIdsForDelete:number[]) => {
  
  const loading = ref<boolean>(false);
  
  const editDirectorate = useEditDirectorateService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    console.log("values are",values);
    loading.value = true;
    
    editDirectorate({...values, fileIdsForDelete}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "اداره کل موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          navigateTo("/admin/directorates")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
