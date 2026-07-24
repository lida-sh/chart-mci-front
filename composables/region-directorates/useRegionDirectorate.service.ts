import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import {
  useRegionDirectorateValidation,
  useEditRegionDirectorateValidation,
} from "./useRegionDirectorate.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
// import {
//   ArchitectureBaseDto,
//   ArchitectureDto,
//   TopChartDto,
//   ArchitectureTreeStructBaseDto,
//   ArchitectureTreeStructDto,
//   ArchitectureDtoPagination,
//   ArchitectureDetailsDtoPagination,
// } from "./architecture.dto";

export const useCreateRegionDirectorateService = () => {
  const fetchData = useFetchApi();
  const { schema } = useRegionDirectorateValidation();

  return (
    { title, status, files, description }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {},
  ) => {
    return fetchData(
      "/admin/region-directorates",
      {
        method: "POST",
        body: serialize({
          title,
          status,
          description,
          files,
        }),
      },
      { setToken: true, ...customConfig },
    );
  };
};
export const useEditRegionDirectorateService = (id: number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditRegionDirectorateValidation();

  return (
    {
      title,
      status,
      description,
      files,
      fileIdsForDelete,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {},
  ) => {
    const formdata = serialize({
      title,
      status,
      description,
      files,
    });
    fileIdsForDelete.forEach((element) => {
      formdata.append("fileIdsForDelete[]", element);
    });
    formdata.append("_method", "PUT");
    return fetchData(
      `/admin/architectures/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      { setToken: true, ...customConfig },
    );
  };
};
//گرفتن معماری ها
// export const useGetArchitecturesService = ()=>{
//   const fetchData = useFetchApi<ArchitectureDetailsDtoPagination,ArchitectureDetailsDtoPagination>(ArchitectureDetailsDtoPagination);
//   return (params, customConfig: FetchCustomConfig = {})=>fetchData("/admin/get-architectures", {params}, {setToken:true, toastError: true, ...customConfig})

// }
// export const useGetBaseArchitecturesService = ()=>{
//   const fetchData = useFetchApi<ArchitectureBaseDto[], ArchitectureBaseDto>(ArchitectureBaseDto);
//   return (customConfig: FetchCustomConfig = {})=>fetchData("/admin/architectures", {}, {setToken:true, toastError: true, ...customConfig})
// }
// export const useGetArchitectureByIdService = ()=>{
//   const fetchData = useFetchApi<ArchitectureDto, ArchitectureDto>(ArchitectureDto);
//   return (id:string, customConfig: FetchCustomConfig = {})=>fetchData(`/admin/architectures/${id}`, {}, {setToken:true, toastError: true, ...customConfig})

// }

// export const useGetArchitectureBySlugService = () => {
//   const fetchData = useFetchApi<ArchitectureDto, ArchitectureDto>(ArchitectureDto);
//   return (slug: string, customConfig: FetchCustomConfig={}) => fetchData(`/admin/architectures-details/${slug}`, {}, {setToken:true, ...customConfig}).then((res)=>{
//    console.log("test1", res)
//    return res
//   });
// };
// export const useArchitectureStructureService=()=>{
//    const fetchData = useFetchApi<ArchitectureTreeStructDto, ArchitectureTreeStructDto>(ArchitectureTreeStructDto);
//    return (slug:string, customConfig: FetchCustomConfig = {})=>fetchData(`/architectures/${slug}`, {}, {toastError: true, ...customConfig})
// }
// export const useDeleteArchitectureService = () =>{
//   const fetchData = useFetchApi();
//   return (id: number, customConfig: FetchCustomConfig={}) => fetchData(`/admin/architectures/${id}`, {method: 'Delete'}, {toastError:true, setToken:true, ...customConfig})
// }
// export const useTopChartStructureService = () =>{
//   const fetchData = useFetchApi<TopChartDto, TopChartDto>(TopChartDto);
//   return (customConfig: FetchCustomConfig={}) => fetchData("top-chart", {}, {toastError:true, ...customConfig})
// }
