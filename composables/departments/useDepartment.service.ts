import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import {
  useDepartmentValidation,
  useEditDepartmentValidation,
} from "./useDepartment.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import {
  DepartmentBaseDto,
  DepartmentDto,
  DepartmentDtoPagination,
} from "./department.dto";

export const useCreateDepartmentService = () => {
  const fetchData = useFetchApi();
  const { schema } = useDepartmentValidation();

  return (
    {
      title,
      architecture_id,
      directorate_id,
      status,
      occupied,
      evaluated_expert_positions_count,
      old_permanent_experts_count,
      old_contracting_experts_count,
      old_below_expert_count,
      files,
      description,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/departments",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          directorate_id,
          title,
          status,
          occupied,
          evaluated_expert_positions_count,
          old_permanent_experts_count,
          old_contracting_experts_count,
          old_below_expert_count,
          description,
          files,
        }),
      },
      { setToken: true, ...customConfig }
    );
  };
};
export const useEditDepartmentService = (id: number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditDepartmentValidation();

  return (
    {
      title,
      status,
      architecture_id,
      directorate_id,
      occupied,
      evaluated_expert_positions_count,
      old_permanent_experts_count,
      old_contracting_experts_count,
      old_below_expert_count,
      files,
      description,
      fileIdsForDelete,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      architecture_id,
      directorate_id,
      title,
      status,
      occupied,
      evaluated_expert_positions_count,
      old_permanent_experts_count,
      old_contracting_experts_count,
      old_below_expert_count,
      description,
      files,
    });
    fileIdsForDelete.forEach((element) => {
      formdata.append("fileIdsForDelete[]", element);
    });
    formdata.append("_method", "PUT");
    return fetchData(
      `/admin/departments/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      { setToken: true, ...customConfig }
    );
  };
};
export const useGetDepartmentsService = () => {
  const fetchData = useFetchApi<
    DepartmentDtoPagination,
    DepartmentDtoPagination
  >(DepartmentDtoPagination);
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      "/admin/departments",
      { params },
      { setToken: true, toastError: true, ...customConfig }
    );
};
export const useGetDepartmentByIdService = () => {
  const fetchData = useFetchApi<DepartmentDto, DepartmentDto>(DepartmentDto);
  return (id: string, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      `/admin/departments/${id}`,
      {},
      { toastError: true, setToken: true, ...customConfig }
    );
};
export const useGetDepartmentBySlugService = () => {
  const fetchData = useFetchApi<DepartmentDto, DepartmentDto>(DepartmentDto);
  return (slug: string, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      `/admin/departments-details/${slug}`,
      {},
      { setToken: true, toastError: true, ...customConfig }
    );
};
export const useDeleteDepartmentService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/departments/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}
