import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAuthenticationStore = defineStore('authentication', ()=>{
    const state = reactive({
        signedUser:{
            signedUserId:0,
            nm:''
        },
        isSigned: false
    })

    const signOut = () => {
        state.isSigned = false;
        state.signedUser = null;
    }

    const signIn = signedUser => {
        state.isSigned = true;
        state.signedUser = signedUser
    }

    return{state, signIn, signOut}
}, {persist: true});