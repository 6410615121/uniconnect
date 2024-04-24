import { firestore } from "./firebaseConfig";
import { collection, query, where, getDocs, addDoc, updateDoc, runTransaction } from "firebase/firestore";


/* -------------------------  Reviews -------------------------- */
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


/* -------------------------  Reviews -------------------------- */







/* -------------------------  sheets -------------------------- */
const uploadsheet = async (Filename, CourseID, Description) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const sheetsCollectionRef = collection(courseDoc.ref, "sheets");
      const docRef = await addDoc(sheetsCollectionRef, {
        Filename,
        CourseID,
        Description,
        
      });
      
    } 

  } catch (e) {
    console.error("Error uploading sheets: ", e);
    return [];
  }
};

const getAllSheets = async (IDCourse) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    // Array to store all reviews
    let allSheets = [];

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const sheetsCollectionRef = collection(courseDoc.ref, "sheets");
       // Query all documents from the "reviews" subcollection for the course
      const sheetsQuerySnapshot = await getDocs(sheetsCollectionRef);

      // Extract data from the query snapshot and push it to the array
      const sheetsData = sheetsQuerySnapshot.docs.map((doc) => doc.data());
      allSheets = sheetsData;
      
    } 

    return allSheets;

  } catch (e) {
    console.error("Error getting all sheets: ", e);
    return [];
  }
};
/* -------------------------  sheets -------------------------- */


/* -------------------------  exams -------------------------- */
const uploadexam = async (Filename, CourseID, Description) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const sheetsCollectionRef = collection(courseDoc.ref, "exams");
      const docRef = await addDoc(sheetsCollectionRef, {
        Filename,
        CourseID,
        Description,
        
      });
      
    } 

  } catch (e) {
    console.error("Error uploading sheets: ", e);
    return [];
  }
};

const getAllExams = async (IDCourse) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    // Array to store all reviews
    let allExams = [];

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const examsCollectionRef = collection(courseDoc.ref, "exams");
       // Query all documents from the "reviews" subcollection for the course
      const examsQuerySnapshot = await getDocs(examsCollectionRef);

      // Extract data from the query snapshot and push it to the array
      const examsData = examsQuerySnapshot.docs.map((doc) => doc.data());
      allExams = examsData;
      
    } 

    return allExams;

  } catch (e) {
    console.error("Error getting all sheets: ", e);
    return [];
  }
};
/* -------------------------  exams -------------------------- */

export { getAllReviews, createReviews, Createcomment, uploadsheet, getAllSheets, getAllExams, uploadexam};