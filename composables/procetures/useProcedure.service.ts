import type { InferType } from "yup";
import { format } from 'date-fns-jalali';
import { useFetchApi } from "../api/useFetchApi";
import {
  useProceturesValidation,
  useEditProcetureValidation,
} from "./useProcetures.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import {
  ProcedureDtoPagination,
  ProcedureBaseDto,
  ProcedureDto,
} from "./procedure.dto";

export const useCreateProcetureService = () => {
  const fetchData = useFetchApi();
  const { schema } = useProceturesValidation();

  return (
    {
      title,
      code,
      architecture_id,
      process_id,
      status,
      notification_date,
      docType,
      files,
      description,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/procedures",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          process_id,
          title,
          code,
          status,
          notification_date,
          docType,
          description,
          files,
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditProcetureService = (id: number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditProcetureValidation();

  return (
    {
      title,
      code,
      status,
      docType,
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
      docType,
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
      `/admin/procedures/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetProceduresService = () => {
  const fetchData = useFetchApi<ProcedureDtoPagination, ProcedureDtoPagination>(
    ProcedureDtoPagination
  );
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData("/admin/procedures", { params }, {setToken:true, toastError:true, ...customConfig});
};
// export const useGetBaseProcessesService = () => {
//   const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(
//     ProcessBaseDto
//   );
//   return (architectureId: number, customConfig: FetchCustomConfig = {}) =>
//     fetchData(`/architectures/${architectureId}/processes`, {}, customConfig);
// };
export const useGetProcedureByIdService = () => {
  const fetchData = useFetchApi<ProcedureDto, ProcedureDto>(ProcedureDto);
  return (id: string, customConfig: FetchCustomConfig={}) => fetchData(`/admin/procedures/${id}`,{},{toastError:true, setToken:true, ...customConfig})
};
export const useGetProcedureBySlugService = () => {
  const fetchData = useFetchApi<ProcedureDto, ProcedureDto>(ProcedureDto);
  return (slug: string, customConfig: FetchCustomConfig={}) => fetchData(`/admin/procedures-details/${slug}`, {}, {setToken:true, ...customConfig});
};
export const useDeleteProcedureService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/procedures/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}
