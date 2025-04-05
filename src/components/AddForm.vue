<script setup>
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore();

const formState = reactive({
     url: '',
});

const onFinish = async(value) => {
     const error = await databaseStore.addUrl(formState.url);
     if (error) {
          return message.error('Error al agregar la URL: ' + error);
          
     }
     else {
          formState.url = '';
          return message.success('URL agregada correctamente!');
     }    
     console.log('Form submitted: Todo correcto' + value);
};   

</script>

<template>
     <a-form
          name="addform"
          autocomplete="off"
          layout="vertical"
          :model="formState"
          @finish="onFinish"
          >

          <a-form-item label="Ingrese una URL" 
          name="url" 
          :rules="[{ required: true, 
                    whiteSpace: true,
                    pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
                    message: 'Ingrese una URL valida', 
                    },
                    ]"
                    >
               <a-input v-model:value="formState.url" placeholder="Enter URL" />
          </a-form-item>
          <a-form-item>
               <a-button type="primary" html-Type="submit" :loading="databaseStore.loading"
               :disabled="databaseStore.loading">
                    Agregar URL 

               </a-button>
          </a-form-item>
     
     </a-form>
          
     
</template>


