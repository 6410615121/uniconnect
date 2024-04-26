import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref} from "firebase/storage";

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
const storage = ref(getStorage(firebaseApp));


export { firebaseApp, firestore, storage };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
