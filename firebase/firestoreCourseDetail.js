import { firestore } from "./firebaseConfig";
import { collection, query, where, getDocs, addDoc  } from "firebase/firestore";



const getAllReviews = async (IDCourse) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    // Array to store all reviews
    let allReviews = [];

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
       // Query all documents from the "reviews" subcollection for the course
      const reviewsQuerySnapshot = await getDocs(reviewsCollectionRef);

      // Extract data from the query snapshot and push it to the array
      const reviewsData = reviewsQuerySnapshot.docs.map((doc) => doc.data());
      allReviews = reviewsData;
      
    } 

    return allReviews;

  } catch (e) {
    console.error("Error getting all reviews: ", e);
    return [];
  }
};


const createReviews = async (IDCourse,Description) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);



    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      const docRef = await addDoc(reviewsCollectionRef, {
        IDCourse,
        Description,
        likeCount: 0,
      });
      
    } 

  } catch (e) {
    console.error("Error creating reviews: ", e);
    return [];
  }
};



export { getAllReviews, createReviews};