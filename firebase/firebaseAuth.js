import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp, firestore } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore"; 

const auth = getAuth(firebaseApp);
// const auth = initializeAuth(firebaseApp, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });


const register = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Create a user document in Firestore
    await createUserDoc(user.uid, name, email);

    return true;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Registration error:", errorCode, errorMessage);

    return false;
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Sign-in error:", errorCode, errorMessage);
    
    return null;
  }
};

const createUserDoc = async (userId, name, email) => {
  try {
    await setDoc(doc(firestore, "users", userId), {
      name: name,
      email: email
    });
    console.log("User document created successfully");
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

const getUserFromUserID = async (userId) => {
  try {
    const userRef = doc(firestore, "users", userId);
    const userSnapshot = await getDoc(userRef);
    
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData;
    } else {
      console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};


export { register, signIn, getUserFromUserID };
