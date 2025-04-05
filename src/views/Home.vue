<template>
     <div class="container">
          <!-- Título de la página -->
          <h1>Home</h1>

          <!-- Mostramos el email del usuario autenticado si está disponible -->
          <h2>{{ userStore.userData?.email }}</h2>

          <add-form></add-form>
          <!-- Botón para cerrar sesión -->

          <!-- Panel de carga con animación -->
          <div v-if="databaseStore.loadingDoc" class="loading-panel">
               <div class="spinner"></div>
               <p>Cargando datos...</p>
          </div>
          <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
               <a-card v-for="item in databaseStore.documents" :key="item.id" :title="item.short">
                    <template #extra>
                         <a-space>
                              <a-popconfirm title="Are you sure delete this task?" ok-text="Si" cancel-text="No"
                                   @confirm="confirm(item.id)"
                                   @cancel="cancel">
                                   <a-button type="primary">Eliminar</a-button>
                              </a-popconfirm>
                              <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                         </a-space>
                    </template>
                    <p>{{ item.name }}</p>
               </a-card>

          </a-space>




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
import { message } from 'ant-design-vue';

// Inicializamos las stores para acceder a sus datos y funciones
const userStore = useUserStore();
const databaseStore = useDatabaseStore();
const router = useRouter();

// Llamamos a la función que obtiene los documentos del usuario autenticado
databaseStore.getUrls();

const url = ref('');

const handleSubmit = () => {
     //Validar URL

     // Añadir la URL a la base de datos
     databaseStore.addUrl(url.value);

};

const confirm = async (value) => {
     message.success('Confirmado');

     await databaseStore.deleteUrl(value);
     console.log('Confirmado');
};
const cancel = () => {
     message.error('Cancelado');
     console.log('Cancelado');
}

</script>
