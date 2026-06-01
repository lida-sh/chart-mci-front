import { object, string, array, boolean } from "yup";

export const useRoleValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    role_name: string().required().label($t("role_name")),
    role_display_name: string().required().label($t("role_display_name")),
    permissions: array().required('لطفا حداقل یک مجوز انتخاب کنید.')
    // permissions: array().of(string()).min(1, 'لطفا حداقل یک مجوز انتخاب کنید.')
  });
  return { schema };
};
