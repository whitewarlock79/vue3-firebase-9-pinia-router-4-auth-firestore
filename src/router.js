import { createRouter, createWebHistory } from "vue-router";
import {useUserStore} from "./stores/user";

import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";


  const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
      next();
      return;
    }else{
      next("/login");
    }
    userStore.loadingSession = false;
  //   if (userStore.userData) {
  //     next();  // Si el usuario está autenticado, continúa
  //   } else {  // Si no, redirige a la página de login
  //     next("/login");
  //   }
};
 
const routes = [
  { path: "/", redirect: "/home" , beforeEnter: requireAuth},
  { path: "/Home", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;