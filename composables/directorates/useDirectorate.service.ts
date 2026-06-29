import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { useDirectorateValidation, useEditDirectorateValidation } from "./useDirectorate.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import { DirectorateBaseDto, DirectorateDto, DirectorateDtoPagination } from "./directorate.dto";

export const useCreateDirectorateService = () => {
  const fetchData = useFetchApi();
  const { schema } = useDirectorateValidation();

  return (
    { title, architecture_id, status, occupied, office_manager_count, files, description }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/directorates",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          title,
          occupied,
          status,
          office_manager_count,
          description,
          files
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditDirectorateService = (id:number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditDirectorateValidation();
  
  return (
    { title, occupied, status, office_manager_count, architecture_id, files, description, fileIdsForDelete }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      occupied,
      status,
      office_manager_count,
      architecture_id,
      description,
      files
    });
    fileIdsForDelete.forEach(element => {
      formdata.append('fileIdsForDelete[]', element)
    });
    formdata.append('_method', 'PUT');
    return fetchData(
      `/admin/directorates/${id}`,
      {
        method: "POST",
        body: formdata
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetDirectoratesService = ()=>{
  const fetchData = useFetchApi<DirectorateDtoPagination,DirectorateDtoPagination>(DirectorateDtoPagination);
  return (params,customConfig: FetchCustomConfig = {})=>fetchData("/admin/directorates", {params}, {setToken:true, toastError:true, ...customConfig})
}
export const useGetBaseDirectoratesService = ()=>{
  const fetchData = useFetchApi<DirectorateBaseDto[], DirectorateBaseDto>(DirectorateBaseDto);
  return (architectureId:number, customConfig: FetchCustomConfig = {})=>fetchData(`/admin/architectures/${architectureId}/directorates`, {}, {setToken:true, ...customConfig})
}
export const useGetDirectorateByIdService = ()=>{
  const fetchData = useFetchApi<DirectorateDto, DirectorateDto>(DirectorateDto);
  return (id:string, customConfig: FetchCustomConfig={})=>fetchData(`/admin/directorates/${id}`, {}, {setToken:true, ...customConfig})
}
export const useGetDirectorateBySlugService = ()=>{
  const fetchData = useFetchApi<DirectorateDto, DirectorateDto>(DirectorateDto);
  return (slug:string, customConfig: FetchCustomConfig)=>fetchData(`/admin/directorates-details/${slug}`, {}, {setToken:true, ...customConfig})
    
}
export const useDeleteDirectorateService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/directorates/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}
