
import { useChangePasswordService } from "./useChangePassword.service";
import {ToastEnum} from "~~/types"
export const useChangePassword = (token)=>{
    const loading = ref(false)
    const error = ref("");
    
    const {showToast} = useToast()
    const {changePassword} = useChangePasswordService();
    const submit = (values, { setErrors, resetForm })=>{
        loading.value = true;
        error.value = "";
        values.token = token
        changePassword(values, {setErrors, toastError: true}).then((response)=>{
            if(response !== undefined){
                showToast({message: "تغییر پسورد با موفقیت انجام شد.", type: ToastEnum.success})
                resetForm()
            }
        }).finally(()=>{
            loading.value = false
        })

    }
    return {submit, loading, error}
}