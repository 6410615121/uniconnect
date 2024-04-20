import { firestore } from "./firebaseConfig";
import { collection, query, where, getDocs, addDoc, updateDoc, runTransaction } from "firebase/firestore";



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


const createReviews = async (CourseID,Description) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    await runTransaction(firestore, async (transaction) => {
      if (!courseQuerySnapshot.empty) {
        let reviewID = courseQuerySnapshot.docs.map(doc => doc.data())[0].reviewcounts + 1;
        transaction.update(courseQuerySnapshot.docs[0].ref, { reviewcounts: reviewID });

      
        const courseDoc = courseQuerySnapshot.docs[0];
        const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
        const docRef = await addDoc(reviewsCollectionRef, {
          CourseID,
          reviewID,
          Description,
          likeCount: 0,
        });

      } 
    });

  } catch (e) {
    console.error("Error creating reviews: ", e);
    return [];
  }
};

const Createcomment = async (IDCourse, IDReview, comment) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = query(collection(courseDoc.ref, "reviews"), where("reviewID", '==', IDReview));
      const reviewQuerySnapshot = await getDocs(reviewsCollectionRef);

      if (!reviewQuerySnapshot.empty) {
        const reviewDoc = reviewQuerySnapshot.docs[0];
        const commentCollectionRef = collection(reviewDoc.ref, "comments");
        const docRef = await addDoc(commentCollectionRef, {
          IDReview,
          comment,
          likeCount: 0,
        });
      } else {
        console.log("No matching reviews found.");
      }
      
    } 

  } catch (e) {
    console.error("Error creating comments: ", e);
    return [];
  }
};



export { getAllReviews, createReviews, Createcomment};