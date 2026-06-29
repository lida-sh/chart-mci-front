import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { useFetchApi } from "../api/useFetchApi";
import { SubProcessDetailsClientDto } from "../departments/department.dto";

export const useGetSubProcessClientBySlugService = () => {
  const fetchData = useFetchApi<SubProcessDetailsClientDto, SubProcessDetailsClientDto>(SubProcessDetailsClientDto);
  return (slug: string, customConfig: FetchCustomConfig) => fetchData(`/sub-processes-details/${slug}`, {}, { toastError: true, ...customConfig});
};