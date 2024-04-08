import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const getAllCourses = async () => {
  try {
    // console.log(firestore);
    
    const courseDocs = await getDocs(collection(firestore, "courses"));
    const coursesData = courseDocs.docs.map((doc) => doc.data());
    return coursesData;

    // courseDocs.forEach((doc) => {
    //   console.log(`${doc.id} => `, doc.data());
    // });
  } catch (e) {
    console.error("Error getting allcourses: ", e);
  }
};

const testCreateCourse = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "courses"), {
      // id: "testID",
      title: "test title 001",
      description: "test description 555",
      exams: ["exam1.pdf", "exam2.pdf"],
      sheets: ["sheet1.pdf", "sheet2.pdf"]
    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export { getAllCourses, testCreateCourse };
