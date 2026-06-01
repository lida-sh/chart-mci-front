import { string, object } from "yup";
export const useForgetPasswordValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    email: string().required().label($t("email")),
  });
  return {schema}
};
