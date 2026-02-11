<script setup>
import userService from '@/services/userService';
import { useAuthenticationStore } from '@/stores/authentication';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authentication = useAuthenticationStore();

const state = reactive({
    modeshowPW: false,
    signin:{
        uid:'',
        upw:''
    }
})

const viewPW = () => {
    state.modeshowPW = !state.modeshowPW;
}

const signIn = async() => {
    const result = await userService.signIn(state.signin);
    console.log('result: ', result);
    authentication.signIn(result.resultData);
    router.push('/');
}
</script>

<template>
<h3>Log In</h3>
<div><input type="text" placeholder="id" v-model="state.signin.uid"></div>
<div><input :type="state.modeshowPW ? 'text' : 'password'" placeholder="pw" v-model="state.signin.upw">
    <button @click="viewPW">👀</button></div>
<div><button @click="signIn">login</button></div>
</template>

<style scoped>

</style>