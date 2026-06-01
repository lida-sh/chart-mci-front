import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { useUserValidation, useEditUserValidation } from "./useUser.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
export const useGetUsersService = () => {
  const fetchData = useFetchApi();
  return () =>
    fetchData("/admin/users", {}, { toastError: true, setToken: true });
};
export const useCreateUserService = () => {
  const fetchData = useFetchApi();
  const { schema } = useUserValidation();
  return (
    {
      first_name,
      last_name,
      national_code,
      email,
      password,
      role,
      permissions,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) =>
    fetchData("admin/users", {
      method: "POST",
      body: {
        first_name,
        last_name,
        national_code,
        email,
        password,
        role,
        permissions,
      },
    }, {setToken:true, ...customConfig});
};
export const useEditUserService = (id:number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditUserValidation();
  return (
    {
      first_name,
      last_name,
      national_code,
      email,
      password,
      role,
      permissions,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) =>{
    const formdata = serialize({
      first_name,
      last_name,
      national_code,
      email,
      password,
      role,
      permissions,
    });
    formdata.append("_method", "PUT");
    return fetchData(`admin/users/${id}`, {
      method: "POST",
      body: formdata,
    }, {setToken:true, ...customConfig});
  }
    
};
export const useGetUserByIdService = () => {
  const fetchData = useFetchApi();
  return (id: string, customConfig: FetchCustomConfig={}) => fetchData(`/admin/users/${id}`,{},{toastError:true, setToken:true, ...customConfig}).then((res)=>{
    console.log("user",  res)
    return res
  });
};
