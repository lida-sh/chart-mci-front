import { useAuthStore } from "~/composables/auth/Auth.store"
import { isAuthRoute } from "~/helpers/authHelpers";

export default defineNuxtRouteMiddleware((to,from)=>{
     if (process.server) {
        return 
     }
    
//     const { setLoading } = useState();
//   setLoading(true);
    if(process.client){
        const authStore = useAuthStore();
        const hasAccess = authStore.isLoggedIn || !isAuthRoute(to.path)
        if(!hasAccess){
             
             return navigateTo("/auth");
             
             
        }
    }
})