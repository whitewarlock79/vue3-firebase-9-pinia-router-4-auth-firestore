import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from "./stores/user";

import Home from "./views/Home.vue";
import Editar from "./views/Editar.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";


const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  
  console.log("Ejecutando requireAuth para la ruta:", to.path);

  try {
      const user = await userStore.currentUser();
      console.log("Usuario autenticado:", user);

      if (user) {
          console.log("Acceso permitido a:", to.path);
          next();  
      } else {
          console.log("Usuario no autenticado, redirigiendo a login.");
          next("/login");  
      }
  } catch (error) {
      console.error("Error en la autenticación:", error);
      next("/login");  
  } finally {
      userStore.loadingSession = false;
  }
};
const routes = [
  { path: "/", redirect: "/home" , beforeEnter: requireAuth, },
  { path: "/Home", component: Home, name: "home", name: "home" },
  { path: "/editar/:id", component: Editar, beforeEnter: requireAuth, name: "editar" },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register,  name: "register"  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;