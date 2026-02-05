<script setup>
import userService from '@/services/userService';
import { reactive } from 'vue';

const state = reactive({
    signup: {
        uid: '',
        upw: '',
        nm: '',
        gender: 2
    },
    checkPw:''
})

const doSignUp = async() => {
    if(state.signup.upw !== state.checkPw){
        alert('check your pw')
        return;
    }
    const result = await userService.signUp(state.signup);
}
</script>

<template>
<h3>Sign Up</h3>

<div><label>ID: <input type="text" v-model="state.signup.uid"></label></div>
<div><label>PW: <input type="password" v-model="state.signup.upw"></label></div>
<div><label>check PW: <input type="password" v-model="state.checkPw"></label></div>
<div><label>name: <input type="text" v-model="state.signup.nm"></label></div>

<div>
    gender: 
    <label>female<input type="radio" value="2" v-model="state.signup.gender"></label>
    <label>male<input type="radio" value="1" v-model="state.signup.gender"></label>
</div>
<div><button @click="doSignUp">sign-up</button></div>
</template>
<style scoped>

</style>