import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { firebaseApp, firestore } from "./firebaseConfig";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore"; 

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

const signIn = async (email, password) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    return true;
  }catch(error){
    const errorCode = error.code;
    const errorMessage = error.message
    
    return false;
  }
};

const createUserDoc = async (name, email) => {
	const docRef = await addDoc(collection(firestore, "users"), {
		name: name,
		email: email
	});
}

export { register, signIn };
