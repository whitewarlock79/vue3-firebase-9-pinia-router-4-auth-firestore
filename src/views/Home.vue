<template>
     <div class="container">
          <!-- Título de la página -->
          <h1>Home</h1>

          <!-- Mostramos el email del usuario autenticado si está disponible -->
          <h2>{{ userStore.userData?.email }}</h2>

          <!-- Panel de carga con animación -->
          <div v-if="databaseStore.loadingDoc" class="loading-panel">
               <div class="spinner"></div>
               <p>Cargando datos...</p>
          </div>

          <!-- Lista de documentos obtenidos de la base de datos -->
          <ul v-else class="document-list">
               <li v-for="item in databaseStore.documents" :key="item.id" class="document-item">
                    <strong>{{ item.name }}</strong> <br>
                    ID: {{ item.id }} <br>
                    URL Corta: {{ item.short }}
                    <button @click=databaseStore.deleteUrl(item.id)>Borrar</button> 
                    <button @click="router.push(`/editar/${item.id}`)">Editar</button> 
               </li>
               
          </ul>

          <form @submit.prevent="handleSubmit">
               <div class="form-group">
                    <label for="url" class="col-sm-2 control-label">URL Corta:</label>
                    <div class="col-sm-10">
                         <input type="text" class="form-control" id="url" v-model="url" placeholder="Ingrese URL corta">
                         <button class="btn btn-primary">Ingrese URL</button>    
                    </div>
               </div>
          </form>

     

     </div>
</template>

<script setup>
// Importamos las stores de Pinia para manejar estados globales
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database'; 
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

// Inicializamos las stores para acceder a sus datos y funciones
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

// Llamamos a la función que obtiene los documentos del usuario autenticado
databaseStore.getUrls();

const url = ref('');

const handleSubmit = ()=> { 
     //Validar URL

     // Añadir la URL a la base de datos
     databaseStore.addUrl(url.value);
     
};    

const handleDelete = (url) => {
     // Eliminar la URL de la base de datos
     databaseStore.deleteUrl(url.value);
}



</script>

<style scoped>
/* Estilos generales */
.container {
     max-width: 600px;
     margin: auto;
     text-align: center;
     font-family: Arial, sans-serif;
}

/* Estilos para la lista de documentos */
.document-list {
     list-style: none;
     padding: 0;
}

.document-item {
     background: #f9f9f9;
     padding: 10px;
     margin: 10px 0;
     border-radius: 8px;
     box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Panel de carga */
.loading-panel {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     height: 150px;
     background: rgba(0, 0, 0, 0.05);
     border-radius: 10px;
     padding: 20px;
}

/* Animación de carga */
.spinner {
     width: 40px;
     height: 40px;
     border: 4px solid #ccc;
     border-top: 4px solid #007bff;
     border-radius: 50%;
     animation: spin 1s linear infinite;
     margin-bottom: 10px;
}

@keyframes spin {
     0% { background-color: red; }    /* Inicio: Rojo */
     50% { background-color: yellow; } /* A la mitad: Amarillo */
     100% { background-color: green; } /* Final: Verde */
}
</style>
