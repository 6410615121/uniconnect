import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc, query, where, setDoc } from "firebase/firestore";

const favCourse = async (uid, courseid)=>{
    const docRef = doc(firestore, "users", uid, "favouriteCourse", courseid);
    try {
       await setDoc(docRef, {
            // courseID: courseid
        })
        console.log("Favorited course successfully!");
        return true;
    }
    catch (error) {
        console.error("Error add fav: ", error)
        return false;
    } 
}

export { favCourse }

// favCourse("E7l7Pjj1W6Rls4dg5jV2PxNJ8bh1", "CN202");
