<template>
     <div>
          <h1>Editar id:route.params</h1>
          <a-form name="editform" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
               <a-form-item label="Ingrese una URL" name="url" :rules="[{
                    required: true,
                    whiteSpace: true,
                    pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
                    message: 'Ingrese una URL valida',
               },
               ]">
                    <a-input v-model:value="formState.url" placeholder="Enter URL" />
               </a-form-item>
               <a-form-item>
                    <a-button type="primary" html-Type="submit" :loading="databaseStore.loading"
                         :disabled="databaseStore.loading">
                         Editar URL
                    </a-button>
                    
               </a-form-item>
               <a-form-item>
                    <a-button type="primary"  html-type="button" @click="BackHome"
                     :loading="databaseStore.loading"
                                              :disabled="databaseStore.loading">
                         Volver
                    </a-button>
               </a-form-item>

          </a-form>
     </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { useDatabaseStore } from "../stores/database"
import { message } from 'ant-design-vue';
import router from "../router";


const databaseStore = useDatabaseStore()

const formState = reactive({
     url: '',
})


const route = useRoute()
console.log(route.params.id)

const onFinish = async(value) => {
     const error = await databaseStore.updateUrl(route.params.id, formState.url);
     if (error) {
          return message .error('Error al editar la URL: ' + error);
     }
     else {
          formState.url = '';
          return message.success('URL editada correctamente!');
     }    
     console.log('Form submitted: Todo correcto' + value);
};

const BackHome = () => {
     router.push('/')
}

onMounted(async () => {
     // Fetch data from the API using the id from the route
     formState.url = await databaseStore.leerUrl(route.params.id)

}
)


</script>
