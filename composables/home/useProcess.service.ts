import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { useFetchApi } from "../api/useFetchApi";
import { DirectorateDetailsClientDto } from "../directorates/directorate.dto";


export const useGetDirectorateClientBySlugService = () => {
  const fetchData = useFetchApi<DirectorateDetailsClientDto, DirectorateDetailsClientDto>(DirectorateDetailsClientDto);
  return (slug: string, customConfig: FetchCustomConfig) => fetchData(`/processes-details/${slug}`, {}, { toastError: true, ...customConfig});
};