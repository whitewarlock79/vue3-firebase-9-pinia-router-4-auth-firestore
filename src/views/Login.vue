<template>
     <div>
          <h1>Login</h1>
          <form @submit.prevent="handleSubmit">
               <label for="email">email:</label>
               <input type="email" id="email" name="email" v-model="email">
               <label for="password">Password:</label>
               <input type="password" id="password" name="password" v-model.trim="password">
               <button :disabled="userStore.loadingUser" type="submit">Acceso</button>
          </form>
     </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';    
/* import { useRouter } from 'vue-router'; */

const email = ref('');
const password = ref('');

const userStore = useUserStore();
/* const router = useRouter(); */

const handleSubmit = async () => {

     if (email.value.trim() === '' || password.value.trim() === '') {

          return alert('email y password son requeridos');
     }

     const user = await userStore.loginUser(email.value, password.value); 
  
     /*router.push('/');*/



     
}
</script>
