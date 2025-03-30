// Importamos las funciones necesarias de Firebase Firestore
import { addDoc, deleteDoc, collection, getDocs, query, where, doc , getDoc, updateDoc } from "firebase/firestore/lite";
// Importamos Pinia para la gestión de estados
import { defineStore } from "pinia";
// Importamos la configuración de Firebase (Base de Datos y Autenticación)
import { db, auth } from "../firebaseConfig";
import {nanoid} from "nanoid";

// Definimos una tienda en Pinia llamada "database"
export const useDatabaseStore = defineStore("database", {
  // Definimos el estado de la tienda
  state: () => ({
    documents: [], // Almacena los documentos obtenidos de Firestore
    loadingDoc: false, //
  }),
  
  // Definimos las acciones que modificarán el estado
  actions: {
    // Acción para obtener las URLs del usuario autenticado
    async getUrls() {
      
      if (this.documents.length !== 0) {
        return;  // Si ya hay documentos en el estado, no hace nada
      }
   

      try {
        // Creamos una consulta para obtener los documentos de la colección "urls"
        // donde el campo "user" sea igual al UID del usuario autenticado
        this.loadingDoc=true;

        const q = query(
          collection(db, "urls"),  // Referencia a la colección 'urls'
          //where("user", "==", auth.currentUser.uid) // Filtra por usuario actual
        );

        // Ejecutamos la consulta y obtenemos los documentos
        const querySnapshot = await getDocs(q);

        // Recorremos los documentos obtenidos y los mostramos en consola
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, doc.data()); // Mostramos el ID y los datos del documento
          this.documents.push({ 
            id: doc.id, 
            ...doc.data()
          })
        });
      } catch (error) {
        // Capturamos cualquier error y lo mostramos en consola
        console.log(error);
      } finally {
        this.loadingDoc=false;
      }

    },
    async addUrl(name) {
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6 ),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: docRef.id,
        });
        console.log("Document written w ith ID: ", docRef.id); 
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

async leerUrl(id){
  try {
    const docRef = doc(db, "urls", id);
    const docSpan = await getDoc(docRef);
    

  // Comprobamos si el documento existe
  if (!docSpan.exists()) {
    throw new Error("Document not found");
  }

  if (docSpan.data().user !== auth.currentUser.uid) {
    throw new Error("No te pertenece el documento");
  }
  return docSpan.data().name;
    console.log("Document data:", docSnap.data());
  } catch (error) {
    console.log("Error getting document:", error);
  }
  finally {
    this.loadingDoc=false;
  }

},

    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSpan = await getDoc(docRef);
        // Comprobamos si el documento existe
        if (!docSpan.exists()) {
          throw new Error("Document not found");
        }

        if (docSpan.data().user !== auth.currentUser.uid) {
          throw new Error("No te pertenece el documento");
        }
        await deleteDoc(docRef);
        // Filtramos los documentos para quedarnos con los que no coinciden con el ID eliminado
        this.documents = this.documents.filter((docSpan) => docSpan.id !== id);
        console.log("Document deleted with ID: ", id);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },

async updateUrl(id, url) {  
  try {
    const docRef = doc(db, "urls", id);
    const docSpan = await getDoc(docRef);

    // Comprobamos si el documento existe
    if (!docSpan.exists()) {
      throw new Error("Document not found");
    }
    if (docSpan.data().user!== auth.currentUser.uid) {
      throw new Error("No te pertenece el documento");
    }
    await updateDoc(docRef, {
      name: url,
    });

    console.log("Document updated with ID: ", id);
    
    this.documents = this.documents.map((doc) =>
      doc.id === id? {...doc, name: url } : doc
    router.push("/");
  );  
    
    } catch (error) {
    console.error("Error updating document: ", error);

    } finally {
    this.loadingDoc=false;
      }
    },

  },
});
