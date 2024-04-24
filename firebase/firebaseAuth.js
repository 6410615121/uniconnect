import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebaseConfig";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const auth = getAuth(firebaseApp);
// const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Registration error:", errorCode, errorMessage);

    return false;
  }
};

const signIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export { register, signIn };
