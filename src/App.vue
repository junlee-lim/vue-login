<script setup>
import userService from './services/userService';
import { useAuthenticationStore } from './stores/authentication';

const authentication = useAuthenticationStore();

const doSingOut = async() => {
  const result = await userService.signOut();
  if(result.resultData === 1){
    authentication.signOut();
  }else{
    alert('logout failed');
  }
}

</script>

<template>
  <header>
    <div>
      <template v-if="authentication.state.isSigned">
        <span>{{ authentication.state.signedUser.nm }} welcome.</span>
      </template>
      <router-link to="/">home </router-link>
      <router-link to="/board/list">list </router-link>
      <span v-if="authentication.state.isSigned">
        <router-link to="/board/write">Write </router-link>
        <a href="" @click.prevent="doSingOut">Logout </a>
      </span>
      <span v-else>
        <router-link to="/signup">Sign Up </router-link>
        <router-link to="/signin">Sign In </router-link>
      </span>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
