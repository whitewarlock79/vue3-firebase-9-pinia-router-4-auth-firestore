<template>
  <div class="container">
    <!-- Título principal de la aplicación -->
    <h1 class="app-title">App-Vite-Vue</h1>

    <!-- Barra de navegación (se muestra solo si la sesión ya cargó) -->
    <nav class="nav" v-if="!userStore.loadingSession">
      <!-- Enlace a "Home" (solo si el usuario está autenticado) -->
      <router-link to="/home" v-if="userStore.userData">Home</router-link>

      <!-- Enlaces a "Login" y "Register" (solo si el usuario NO está autenticado) -->
      <router-link to="/login" v-if="!userStore.userData">Login</router-link>  
      <router-link to="/register" v-if="!userStore.userData">Register</router-link>  

      <!-- Botón para cerrar sesión (visible solo si el usuario está autenticado) -->
      <button class="btn-logout" @click="userStore.logoutUser()" v-if="userStore.userData">
        Logout
      </button>
    </nav>

    <!-- Mensaje de carga mientras se obtiene la sesión -->
    <div class="loading-session" v-else>
      Loading session...
    </div>

    <!-- Contenedor de las rutas dinámicas de la aplicación -->
    <RouterView />
  </div>
</template>

<script setup>
// Importamos la store de usuario desde Pinia
import { useUserStore } from './stores/user';

// Inicializamos la store para acceder a los datos del usuario
const userStore = useUserStore();
</script>

<style scoped>
/* Estilo general del contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: 'Arial', sans-serif;
  margin-top: 20px;
}

/* Título principal */
.app-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Barra de navegación */
.nav {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

/* Enlaces de navegación */
.nav a {
  text-decoration: none;
  color: #3498db;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.nav a:hover {
  color: #2980b9;
}

/* Botón de logout */
.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

.btn-logout:hover {
  background-color: #c0392b;
}

/* Estilo para el mensaje de carga */
.loading-session {
  font-size: 1.2rem;
  color: #7f8c8d;
}
</style>
