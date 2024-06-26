import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref} from "firebase/storage";

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDm8YFGadGQpnlZX_8b7rnrYHRUUzCFFLk",
//   authDomain: "uniconnect-project.firebaseapp.com",
//   databaseURL: "https://uniconnect-project.firebaseio.com",
//   projectId: "uniconnect-project",
//   storageBucket: "uniconnect-project.appspot.com",
//   messagingSenderId: "89215099916",
//   appId: "1:89215099916:android:5308cc442480faf9d7ba29",
//   measurementId: "G-measurement-id",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBmiH8-ECJWmcaFj-oROYUjwOfDR7f8pxI",
//   authDomain: "com.company.myapp",
//   databaseURL: "https://uniconnect-project.firebaseio.com",
//   projectId: "uniconnect-daf98",
//   storageBucket: "uniconnect-daf98.appspot.com",
//   messagingSenderId: "698512847181",
//   appId: "1:698512847181:android:b4392a7fc4c8b64f71c704",
//   measurementId: "G-measurement-id",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCSFyw9ukghjZjid0eM8eQqwXDaFN8zVzc",
  authDomain: "myapp.myapp.com",
  databaseURL: "https://uniconnect-daf98.firebaseio.com",
  projectId: "uniconnect2-56d48",
  storageBucket: "uniconnect2-56d48.appspot.com",
  messagingSenderId: "164004171615",
  appId: "1:164004171615:android:97289dde1b38961fe2f0ea",
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
