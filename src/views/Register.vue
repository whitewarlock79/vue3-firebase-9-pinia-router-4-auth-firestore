<template>
     <div>
          <h1>Register</h1>
          <form @submit.prevent="handleSubmit">
               <label for="email">email:</label>
               <input type="email" id="email" name="email" v-model="email">
               <label for="password">Password:</label>
               <input type="password" id="password" name="password" v-model.trim="password">
               <button :disabled="userStore.loading" type="submit">Crear Usuario</button>
          </form>
     </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';    
//import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');

const loading = ref(false);

const userStore = useUserStore();
//const router = useRouter();

const handleSubmit = async () => {

     if (email.value.trim() === '' || password.value.trim() === '') {

          return alert('email y password son requeridos');
     }

     const userStore = useUserStore();
     await userStore.registerUser(email.value, password.value); 

     //router.push('/login');



     
}
</script>
