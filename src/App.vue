<script setup>
import { useAuthenticationStore } from './stores/authentication';

const authentication = useAuthenticationStore();
</script>

<template>
  <header>
    <span v-if="authentication.state.isSigned">
      {{ authentication.state.signedUser.nm }} welcome.
    </span>
    <router-link to="/signup" v-if="!authentication.state.isSigned">Sign Up</router-link>
    <router-link to="/signin" v-if="!authentication.state.isSigned">Sign In</router-link>
    <router-link to="/board/write" v-if="authentication.state.isSigned">Write</router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
