import { firestore } from './firebaseConfig';
import { addDoc, collection } from "firebase/firestore"; 

const addUser = async () => {
    try {
        const docRef = await addDoc(collection(firestore, "users"), {
          first: "Alan",
          middle: "Mathison",
          last: "Turing",
          born: 1912
        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export {addUser};
