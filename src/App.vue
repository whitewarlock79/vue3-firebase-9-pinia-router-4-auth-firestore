<template>
  <div>
    <h1>App-Vite-Vue</h1>
  </div>
  <nav class="nav" v-if="!userStore.loadingSession">
    <router-link to="/home" v-if="userStore.userData">Home</router-link> |
    <router-link to="/login" v-if="!userStore.userData">Login</router-link> | 
    <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
    <button @click="userStore.logoutUser()" v-if="userStore.userData">Logout</button>
  </nav>
  <div v-else>
      loading session...
  </div>
  <RouterView></RouterView>
</template>

<script setup>
import { useUserStore } from './stores/user';
const userStore = useUserStore();
</script>
