import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { useFetchApi } from "../api/useFetchApi";
import { ProcedureDetailsClientDto } from "../procetures/procedure.dto";

export const useGetProcedureClientBySlugService = () => {
  const fetchData = useFetchApi<ProcedureDetailsClientDto, ProcedureDetailsClientDto>(ProcedureDetailsClientDto);
  return (slug: string, customConfig: FetchCustomConfig) => fetchData(`/procedures-details/${slug}`, {}, { toastError: true, ...customConfig});
};