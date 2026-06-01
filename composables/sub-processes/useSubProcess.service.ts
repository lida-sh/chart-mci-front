import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import {
  useSubProcessValidation,
  useEditSubProcessValidation,
} from "./useSubProcess.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import {
  SubProcessBaseDto,
  SubProcessDto,
  SubProcessDtoPagination,
} from "./subProcess.dto";

export const useCreateSubProcessService = () => {
  const fetchData = useFetchApi();
  const { schema } = useSubProcessValidation();

  return (
    {
      title,
      code,
      architecture_id,
      process_id,
      status,
      notification_date,
      files,
      description,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/sub-processes",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          process_id,
          title,
          code,
          status,
          notification_date,
          description,
          files,
        }),
      },
      { setToken: true, ...customConfig }
    );
  };
};
export const useEditSubProcessService = (id: number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditSubProcessValidation();

  return (
    {
      title,
      code,
      status,
      notification_date,
      architecture_id,
      process_id,
      files,
      description,
      fileIdsForDelete,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      code,
      status,
      notification_date,
      architecture_id,
      process_id,
      description,
      files,
    });
    fileIdsForDelete.forEach((element) => {
      formdata.append("fileIdsForDelete[]", element);
    });
    formdata.append("_method", "PUT");
    return fetchData(
      `/admin/sub-processes/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      { setToken: true, ...customConfig }
    );
  };
};
export const useGetSubProcessesService = () => {
  const fetchData = useFetchApi<
    SubProcessDtoPagination,
    SubProcessDtoPagination
  >(SubProcessDtoPagination);
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      "/admin/sub-processes",
      { params },
      { setToken: true, toastError: true, ...customConfig }
    );
};
// export const useGetBaseProcessesService = () => {
//   const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(
//     ProcessBaseDto
//   );
//   return (architectureId: number, customConfig: FetchCustomConfig = {}) =>
//     fetchData(`/architectures/${architectureId}/processes`, {}, customConfig);
// };
export const useGetSubProcessByIdService = () => {
  const fetchData = useFetchApi<SubProcessDto, SubProcessDto>(SubProcessDto);
  return (id: string, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      `/admin/sub-processes/${id}`,
      {},
      { toastError: true, setToken: true, ...customConfig }
    );
};
export const useGetSubProcessBySlugService = () => {
  const fetchData = useFetchApi<SubProcessDto, SubProcessDto>(SubProcessDto);
  return (slug: string, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      `/admin/sub-processes-details/${slug}`,
      {},
      { setToken: true, toastError: true, ...customConfig }
    );
};
export const useDeleteSubProcessService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/sub-processes/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}
