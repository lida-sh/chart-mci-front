import { useAuthStore } from "~/composables/auth/Auth.store"
import { isAuthRoute } from "~/helpers/authHelpers";

export default defineNuxtRouteMiddleware((to,from)=>{
     if (import.meta.server) {
        return 
     }
    const authStore = useAuthStore();
    const hasAccess = authStore.isLoggedIn || !isAuthRoute(to.path)
    if(!hasAccess){
        return navigateTo("/auth");      
    }
    
})