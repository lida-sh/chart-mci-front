import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { useProcessValidation, useEditProcessValidation } from "./useProcess.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import { ProcessBaseDto, ProcessDto, ProcessDtoPagination } from "./process.dto";

export const useCreateProcessService = () => {
  const fetchData = useFetchApi();
  const { schema } = useProcessValidation();

  return (
    { title, code, architecture_id, status, files, description, notification_date }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/processes",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          title,
          code,
          status,
          notification_date,
          description,
          files
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditProcessService = (id:number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditProcessValidation();
  
  return (
    { title, code, architecture_id, notification_date, files, description, fileIdsForDelete }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      code,
      architecture_id,
      description,
      notification_date,
      files
    });
    fileIdsForDelete.forEach(element => {
      formdata.append('fileIdsForDelete[]', element)
    });
    formdata.append('_method', 'PUT');
    return fetchData(
      `/admin/processes/${id}`,
      {
        method: "POST",
        body: formdata
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetProcessesService = ()=>{
  const fetchData = useFetchApi<ProcessDtoPagination,ProcessDtoPagination>(ProcessDtoPagination);
  return (params,customConfig: FetchCustomConfig = {})=>fetchData("/admin/processes", {params}, {setToken:true, toastError:true, ...customConfig})
}
export const useGetBaseProcessesService = ()=>{
  const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(ProcessBaseDto);
  return (architectureId:number, customConfig: FetchCustomConfig = {})=>fetchData(`/admin/architectures/${architectureId}/processes`, {}, {setToken:true, ...customConfig})
}
export const useGetProcessByIdService = ()=>{
  const fetchData = useFetchApi<ProcessDto, ProcessDto>(ProcessDto);
  return (id:string, customConfig: FetchCustomConfig={})=>fetchData(`/admin/processes/${id}`, {}, {setToken:true, ...customConfig})
}
export const useGetProcessBySlugService = ()=>{
  const fetchData = useFetchApi<ProcessDto, ProcessDto>(ProcessDto);
  return (slug:string, customConfig: FetchCustomConfig)=>fetchData(`/admin/processes-details/${slug}`, {}, {setToken:true, ...customConfig})
    
}
export const useDeleteProcessService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/processes/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}
