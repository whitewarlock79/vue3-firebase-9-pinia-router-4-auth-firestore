<template>
	<a-layout class="layout">
		<!-- Título principal de la aplicación -->
		<a-layout-header v-if="!userStore.loadingSession">
			<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal"
				:style="{ lineHeight: '64px' }">
				<a-menu-item v-if="userStore.userData" key="home"><router-link
						to="/home">Home</router-link></a-menu-item>
				<a-menu-item v-if="!userStore.userData" key="login"><router-link
						to="/login">Login</router-link></a-menu-item>
				<a-menu-item v-if="!userStore.userData" key="register"><router-link
						to="/register">Register</router-link></a-menu-item>
				<a-menu-item v-if="userStore.userData" @click=" userStore.logoutUser()"
					key="logout">Logout</a-menu-item>
			</a-menu>
		</a-layout-header>
		<a-layout-content  style="padding: 0 50px">
			<div class="container">
				<div class="loading-session" v-if="userStore.loadingSession">Loading session...</div>
				<RouterView />
			</div>
		</a-layout-content>

	</a-layout>

</template>

<script setup>
// Importamos la store de usuario desde Pinia
import { ref, watch } from 'vue';
import { useUserStore } from './stores/user';
import { useRoute } from 'vue-router';

// Inicializamos la store para acceder a los datos del usuario
const userStore = useUserStore();

const route = useRoute()

const selectedKeys = ref([])

watch(
	() => route.name,
	() => { selectedKeys.value = [route.name] }
);

</script>

<style>
.container {
	background-color: '#fff';
	padding: '24px';
	min-height: '100vh';}

	.text-center {
		text-align: center;
	}


	</style>