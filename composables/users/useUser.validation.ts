import { array, object, string } from "yup";

export const useUserValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    first_name: string().required().label($t("first_name")),
    last_name: string().required().label($t("last_name")),
    national_code: string().required().label($t("national_code")),
    email: string().required().label($t("email")),
    password: string().required().label($t("pasword")),
    role: string().required().label($t("role")),
    permissions: array().nullable().label($t("permissions"))
  });
  return { schema };
};
export const useEditUserValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    first_name: string().required().label($t("first_name")),
    last_name: string().required().label($t("last_name")),
    national_code: string().required().label($t("national_code")),
    email: string().required().label($t("email")),
    password: string().required().label($t("pasword")),
    role: string().required().label($t("role")),
    permissions: array().nullable().label($t("permissions"))
  });
  return { schema };
};

