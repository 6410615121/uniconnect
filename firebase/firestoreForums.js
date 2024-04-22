import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const getAllForums = async () => {
  try {
    // console.log(firestore);
    
    const forumsDocs = await getDocs(collection(firestore, "forums"));
    //console.log(courseDocs.docs);
    const forumsData = forumsDocs.docs.map((doc) => doc.data());
    // console.log(coursesData);
    return forumsData;

    // courseDocs.forEach((doc) => {
    //   console.log(`${doc.id} => `, doc.data());
    // });
  } catch (e) {
    console.error("Error getting allforums: ", e);
  }
};

const createPost = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "forums"), {
      PostID:"0", //test data
      title:"test", //test data
      author:"nawaphoom Nachai", //test data
      Description:"test", //test data
      likeCount: 0,
    });
    console.log("Document written with ID: ", docRef.id);

    // create subcollection reviews (store object reviews when create course)
    /* addDoc(collection(docRef, "reviews"),{
      courseID, //Fk 
      //Author,
      description,
      likeCount: 0,
    }); */
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export { getAllForums, createPost };
