import { useFetchApi } from "../api/useFetchApi";
export const useGetProvincesService = () => {
  const fetchData = useFetchApi();
  return () =>
    fetchData("admin/get-provinces", {}, { setToken: true, toastError: true });
};
export const useGetRegionDirectoratesService = () => {
  const fetchData = useFetchApi();
  return () =>
    fetchData(
      "admin/get-region-directorates",
      {},
      { setToken: true, toastError: true },
    );
};
