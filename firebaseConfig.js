import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDm8YFGadGQpnlZX_8b7rnrYHRUUzCFFLk",
  authDomain: "uniconnect-project.firebaseapp.com",
  databaseURL: "https://uniconnect-project.firebaseio.com",
  projectId: "uniconnect-project",
  storageBucket: "uniconnect-project.appspot.com",
  messagingSenderId: "89215099916",
  appId: "1:89215099916:android:5308cc442480faf9d7ba29",
  measurementId: "G-measurement-id",
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get Firestore instance
const firestore = getFirestore(firebaseApp);

const addUser = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { firebaseApp, firestore, addUser };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
