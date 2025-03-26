import { defineStore } from "pinia";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loading: false,
    loadingSession: false,
  }),
  getters: {
    mayuscula(state) {
      return state.userData.name.toUpperCase();
    },
  },
  actions: {
    async registerUser(email, password) {
      this.loading = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          name: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
        };
        router.push("/home");
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async loginUser(email, password) {
      this.loading = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email };
        console.log(this.userData);
        router.push("/home");
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            this.userData = {
              email: user.email,
              uid: user.uid,
            };
          } else {
            this.userData = null;
          }
          resolve(user);
          console.log(user);
        },
        (e) => {
          reject(e);
        }
      );
        unsubscribe();
      });
    },
  },
});
