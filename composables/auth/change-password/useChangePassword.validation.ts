import { string, object, ref } from "yup";
export const useChangePasswordValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    password: string().required().label($t("newPassword")),
    password_confirmation: string().required().oneOf([ref("password")], $t("passwordsMustMatch")).label($t("confirmNewPassword")),
  });
  return {schema}
};
