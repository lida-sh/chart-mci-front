import { useFetchApi } from "../api/useFetchApi";
import { ArchitectureBaseDto } from "../architectures/architecture.dto";
import {
  ProcessBaseDto,
  ProcessClientDtoPagination,
} from "../processes/process.dto";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import {
  useAdvancedSearchValidation,
  useSearchValidation,
} from "./home.validation";
import type { InferType } from "yup";
import { SubProcessClientDtoPagination } from "../sub-processes/subProcess.dto";
import { ProcedureClientDtoPagination } from "../procetures/procedure.dto";
import { resultSearchDtoPagination } from "./search.dto";

export const useGetBaseArchitecturesService = () => {
  const fetchData = useFetchApi<ArchitectureBaseDto[], ArchitectureBaseDto>(
    ArchitectureBaseDto
  );
  return () => fetchData("/architectures", {}, { toastError: true });
};
export const useGetBaseProcessesService = () => {
  const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(
    ProcessBaseDto
  );
  return (architectureId: number, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      `architectures/${architectureId}/processes`,
      {},
      { toastError: true, ...customConfig }
    );
};
export const useAdvancedSearchService = () => {
  const { schema } = useAdvancedSearchValidation();
  const fetchData = useFetchApi();
  return (
    {
      architecture_id,
      docType,
      process_id,
      wordSearch,
      itemSearch,
      page,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) =>
    fetchData(
      "/advanced-search",
      {
        params: {
          architecture_id,
          docType,
          process_id,
          wordSearch,
          itemSearch,
          page,
        },
      },
      { toastError: true, ...customConfig }
    );
};
export const useGetOcrResultsService = () => {
  const fetchData = useFetchApi();
  return (searchId, keyword, dir, type, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      "/get-ocr-results",
      { params: { searchId, keyword, dir, type } },
      { toastError: true, ...customConfig }
    );
};
export const useSearchService = () => {
  const { schema } = useSearchValidation();
  const fetchData = useFetchApi<
    resultSearchDtoPagination,
    resultSearchDtoPagination
  >(resultSearchDtoPagination);
  return (
    { search }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) =>
    fetchData(
      "/search",
      { params: { search } },
      { toastError: true, ...customConfig }
    );
};
export const useGetProceduresService = () => {
  const fetchData = useFetchApi<
    ProcedureClientDtoPagination,
    ProcedureClientDtoPagination
  >(ProcedureClientDtoPagination);
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData("/procedures", { params }, { toastError: true, ...customConfig });
};
export const useGetProcessesService = () => {
  const fetchData = useFetchApi<
    ProcessClientDtoPagination,
    ProcessClientDtoPagination
  >(ProcessClientDtoPagination);
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData("/processes", { params }, { toastError: true, ...customConfig });
};
export const useGetSubProcessesService = () => {
  const fetchData = useFetchApi<
    SubProcessClientDtoPagination,
    SubProcessClientDtoPagination
  >(SubProcessClientDtoPagination);
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData(
      "/sub-processes",
      { params },
      { toastError: true, ...customConfig }
    );
};
