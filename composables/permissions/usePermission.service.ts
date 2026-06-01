import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { usePermissionValidation } from "./usePernission.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { PermissionDto } from "~/composables/permissions/permission.dto";
export const useCreatePermissionService = () => {
  const fetchData = useFetchApi();
  const { schema } = usePermissionValidation();
  return (
    { permission_display_name, permission_name }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) =>
    fetchData(
      "/admin/permissions",
      { method: "post", body: { permission_display_name, permission_name } },
      { setToken: true, ...customConfig }
    );
};
export const useGetPermissionsService = () => {
  const fetchData = useFetchApi<PermissionDto[], PermissionDto>(PermissionDto);
  return (customConfig: FetchCustomConfig = {}) =>
    fetchData("admin/permissions", {}, { setToken: true,toastError: true, ...customConfig });
};
