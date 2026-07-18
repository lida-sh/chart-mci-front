import { useFetchApi } from "../api/useFetchApi";
export const useGetProvincesService = ()=>{
    const fetchData = useFetchApi();
    return () =>
      fetchData("get-provinces", {}, {setToken: true, toastError: true });

}
export const useGetRegionDirectoratesService = ()=>{
    const fetchData = useFetchApi();
    return () => fetchData("", {}, { setToken: true, toastError: true });
};