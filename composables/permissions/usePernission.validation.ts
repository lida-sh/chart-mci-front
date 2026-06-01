import { object, string } from "yup";

export const usePermissionValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    permission_display_name: string().required().label($t("permission_display_name")),
    permission_name: string().required().label($t("permission_name")),
  });
  return { schema };
};
