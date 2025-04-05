
import { defineStore } from "pinia";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";
import { useDatabaseStore } from "./database";

// Definimos la store de usuario con Pinia
export const useUserStore = defineStore("userStore", {
  // Estado global del usuario
  state: () => ({
    userData: null,      // Almacena la información del usuario autenticado
    loading: false,      // Indica si hay una operación en proceso
    loadingSession: false, // Indica si la sesión se está cargando
  }),

  // Getters: Métodos computados que devuelven valores basados en el estado
  getters: {
    mayuscula(state) {
      // Devuelve el nombre del usuario en mayúsculas (si está autenticado)
      return state.userData?.name?.toUpperCase() || "";
    },
  },

  // Acciones: Métodos que modifican el estado y ejecutan lógica de negocio
  actions: {
    /**
     * Registra un nuevo usuario con email y contraseña en Firebase Authentication.
     * @param {string} email - Correo electrónico del usuario.
     * @param {string} password - Contraseña del usuario.
     */
    async registerUser(email, password) {
      this.loading = true; // Indica que el proceso ha comenzado
      try {
        // Crea un nuevo usuario en Firebase
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        // Guarda los datos del usuario en el estado
        this.userData = {
          email: user.email,
          name: user.email, // Usa el email como nombre por defecto
          uid: user.uid,
          emailVerified: user.emailVerified, // Indica si el email está verificado
        };

        // Redirige al usuario a la página de inicio
        router.push("/home");
      } catch (error) {
        console.log(error.code);
      } finally {
        this.loading = false; // Finaliza la carga
      }
    },

    /**
     * Inicia sesión con email y contraseña en Firebase Authentication.
     * @param {string} email - Correo electrónico del usuario.
     * @param {string} password - Contraseña del usuario.
     */
    async loginUser(email, password) {
      this.loading = true;
      try {
        // Inicia sesión con Firebase Authentication
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        // Guarda los datos del usuario autenticado
        this.userData = { email: user.email };
        console.log("Usuario autenticado:", this.userData);
        this.loading = false;
        // Redirige a la página de inicio
        router.push("/home");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Cierra la sesión del usuario y reinicia los datos almacenados.
     */
    async logoutUser() {
      // Reinicia la store de la base de datos al cerrar sesión
      const dataBaseStore = useDatabaseStore();
      dataBaseStore.$reset();

      try {
        // Cierra sesión en Firebase
        await signOut(auth);
        this.userData = null; // Borra los datos del usuario
        router.push("/login"); // Redirige a la página de login
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },

    /**
     * Verifica si hay un usuario autenticado en Firebase.
     * @returns {Promise} Promesa que se resuelve con los datos del usuario o null si no hay sesión.
     */
    currentUser() {
      return new Promise((resolve, reject) => {
        // Escucha cambios en el estado de autenticación
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // Si el usuario está autenticado, guarda sus datos
            this.userData = {
              email: user.email,
              uid: user.uid,
            };
          } else {
            // Si no hay sesión, borra los datos y reinicia la base de datos
            this.userData = null;
            const dataBaseStore = useDatabaseStore();
            dataBaseStore.$reset();
          }

          // Resuelve la promesa con el usuario autenticado o null
          resolve(user);
          console.log("Usuario actual:", user);
        },
        (error) => {
          reject(error);
        });

        // Se ejecuta inmediatamente para cancelar la suscripción a cambios de autenticación
        
      });
    },
  },
});
