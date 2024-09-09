import { auth } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function useAuthenticationMethods() {
  async function signup(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  async function singinWithEmail(
    email: string,
    password: string,
    onSuccess: (uid: string) => void,
    onError: (error: string) => void,
  ) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        onSuccess(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        onError(error);
        console.log(errorCode, errorMessage);
      });
  }

  async function logout() {
    signOut(auth)
      .then(() => {
        console.log("logout");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //TODO: add oauth methods (Google)

  return { signup, singinWithEmail, logout };
}