import type { InferType } from "yup";
import { useForgetPasswordValidation } from "./useForgetPassword.validation";
import { useFetchApi } from "~/composables/api/useFetchApi";
import type { FetchCustomConfig } from "~/composables/api/FetchCustomConfig";
import { CLIENT_ID, CLIENT_SECRET } from "~/composables/api/api.config";

export const useForgetPasswordService = () => {
  const fetchData = useFetchApi();
  const { schema } = useForgetPasswordValidation();
  const forgetPassword = (
    { email }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/forget-password",
      {
        method: "POST",
        body: {
          email
        },
      },
      customConfig
    )
  };
  return { forgetPassword };
};
