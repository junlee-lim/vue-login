<script setup>
import router from './router';

</script>

<template>
  <header>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/signin">Sign In</router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
