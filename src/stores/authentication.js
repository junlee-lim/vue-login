import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAuthenticationStore = defineStore('authentication', ()=>{
    const state = reactive({
        signedUser:{
            signedUserid:0,
            nm:''
        },
        isSigned: false
    })

    const signIn = signedUser => {
        state.isSigned = true;
        state.signedUser = signedUser
    }

    return{state, signIn}
}, {persist: true});