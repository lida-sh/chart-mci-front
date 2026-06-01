import { useAuthStore } from "../Auth.store";
import { useForgetPasswordService } from "./useForgetPassword.service";
import {ToastEnum} from "~~/types"
export const useForgetPassword = ()=>{
    const loading = ref(false)
    const error = ref("");
    
    const {showToast} = useToast()
    const {forgetPassword} = useForgetPasswordService();
    const submit = (values, { setErrors, resetForm })=>{
        loading.value = true;
        error.value = "";
        forgetPassword(values, {setErrors, toastError: true}).then((response)=>{
            if(response !== undefined){
                showToast({message: "ایمیل بازنشانی با موفقیت ارسال شد.", type: ToastEnum.success})
                resetForm()
            }
        }).finally(()=>{
            loading.value = false
        })

    }
    return {submit, loading, error}
}