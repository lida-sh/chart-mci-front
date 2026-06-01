import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { useFetchApi } from "../api/useFetchApi";
import { ProcessDetailsClientDto } from "../processes/process.dto";


export const useGetProcessClientBySlugService = () => {
  const fetchData = useFetchApi<ProcessDetailsClientDto, ProcessDetailsClientDto>(ProcessDetailsClientDto);
  return (slug: string, customConfig: FetchCustomConfig) => fetchData(`/processes-details/${slug}`, {}, { toastError: true, ...customConfig});
};