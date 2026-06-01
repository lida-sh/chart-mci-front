import type { InferType } from "yup";
import { useChangePasswordValidation } from "./useChangePassword.validation";
import { useFetchApi } from "~/composables/api/useFetchApi";
import type { FetchCustomConfig } from "~/composables/api/FetchCustomConfig";


export const useChangePasswordService = () => {
  const fetchData = useFetchApi();
  const { schema } = useChangePasswordValidation();
  type RESET_PASSWORD = InferType<typeof schema>
  interface RESET_PASSWORD_VALUES extends RESET_PASSWORD {
    token: string
  }
  const changePassword = (
    body: RESET_PASSWORD_VALUES,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/reset-password",
      {
        method: "POST",
        body
      },
      customConfig
    )
  };
  return { changePassword };
};
