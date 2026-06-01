import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { useArchitectureValidation, useEditArchitectureValidation } from "./useArchitecture.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import { ArchitectureBaseDto, ArchitectureDto, ArchitectureTreeStructDto, ArchitectureDtoPagination } from "./architecture.dto";

export const useCreateArchitectureService = () => {
  const fetchData = useFetchApi();
  const { schema } = useArchitectureValidation();

  return (
    { title, code, type, files, description }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/admin/architectures",
      {
        method: "POST",
        body: serialize({
          title,
          code,
          type,
          description,
          files
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditArchitectureService = (id:number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditArchitectureValidation();

  return (
    { title, code, type, files, description, fileIdsForDelete }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      code,
      type,
      description,
      files
    });
    fileIdsForDelete.forEach(element => {
      formdata.append('fileIdsForDelete[]', element)
    });
    formdata.append('_method', 'PUT');
    return fetchData(
      `/admin/architectures/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetArchitecturesService = ()=>{
  const fetchData = useFetchApi<ArchitectureDtoPagination,ArchitectureDtoPagination>(ArchitectureDtoPagination);
  return (customConfig: FetchCustomConfig = {})=>fetchData("/admin/get-architectures", {}, {setToken:true, toastError: true, ...customConfig})

}
export const useGetBaseArchitecturesService = ()=>{
  const fetchData = useFetchApi<ArchitectureBaseDto[], ArchitectureBaseDto>(ArchitectureBaseDto);
  return (customConfig: FetchCustomConfig = {})=>fetchData("/admin/architectures", {}, {setToken:true, toastError: true, ...customConfig})
}
export const useGetArchitectureByIdService = ()=>{
  const fetchData = useFetchApi<ArchitectureDto, ArchitectureDto>(ArchitectureDto);
  return (id:string, customConfig: FetchCustomConfig = {})=>fetchData(`/admin/architectures/${id}`, {}, {setToken:true, toastError: true, ...customConfig})

}

export const useGetArchitectureBySlugService = () => {
  const fetchData = useFetchApi<ArchitectureDto, ArchitectureDto>(ArchitectureDto);
  return (slug: string, customConfig: FetchCustomConfig={}) => fetchData(`/admin/architectures-details/${slug}`, {}, {setToken:true, ...customConfig}).then((res)=>{
   console.log("test1", res) 
   return res
  });
};
export const useArchitectureStructureService=()=>{
   const fetchData = useFetchApi<ArchitectureTreeStructDto, ArchitectureTreeStructDto>(ArchitectureTreeStructDto);
   return (slug:string, customConfig: FetchCustomConfig = {})=>fetchData(`/architectures/${slug}`, {}, {toastError: true, ...customConfig})
}
export const useDeleteArchitectureService = () =>{
  const fetchData = useFetchApi();
  return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/architectures/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
}