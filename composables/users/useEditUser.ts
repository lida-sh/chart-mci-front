import { useEditProcessService } from "~/composables/processes/useProcess.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import { useEditUserService } from "./useUser.service";

export const useEditUser = (id:number) => {
  const loading = ref<boolean>(false);
  const editUser = useEditUserService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    loading.value = true;
    console.log("values",values)
    editUser({...values}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "سند موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          return navigateTo("/admin/users")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
