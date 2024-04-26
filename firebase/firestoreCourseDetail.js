import { firestore, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { collection, query, where, getDocs, addDoc, updateDoc, runTransaction } from "firebase/firestore";
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';

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
      const reviewsData = reviewsQuerySnapshot.docs.map((doc) => {return {id:doc.id,data:doc.data()}});
      allReviews = reviewsData;
      
    } 

    return allReviews;

  } catch (e) {
    console.error("Error getting all reviews: ", e);
    return [];
  }
};

const getAllComment = async (IDCourse,reviewID) => {
  try{
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);
    let allComments = [];
    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const commentCollectionRef = collection(courseDoc.ref, "reviews",reviewID,'comments')
      const commentsQuerySnapshot = await getDocs(commentCollectionRef);
      const commentsData = commentsQuerySnapshot.docs.map((doc) => doc.data());
      allComments = commentsData;

    } 

    return allComments;

  } catch (e) {
    console.error("Error getting all comments: ", e);
    return [];
  }
};


const createReviews = async (CourseID,Description) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    
    if (!courseQuerySnapshot.empty) {

      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      await addDoc(reviewsCollectionRef, {
        Author:"Nawaphoom Nachai",
        CourseID,
        Description,
        likeCount: 0,
      });

    } 
    

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
      const commentCollectionRef = collection(courseDoc.ref, "reviews",IDReview,'comments')

      if (!commentCollectionRef.empty) {
        await addDoc(commentCollectionRef, {
          Author:"Nawaphoom Nachai",
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
const uploadsheet = async (Filename, CourseID, Description, name) => {
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
        nameinstorage:name
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

const uploadSheetToStorage = async (uri, filename) => {
  
  const response = await fetch(uri);
  
  const blob = await response.blob();
  const storageRef = ref(storage, `sheets/${filename}`);
  

  try {
    await uploadBytes(storageRef, blob);
    console.log('Document uploaded to Firebase Storage successfully');
  } catch (error) {
    console.log('Error uploading document to Firebase Storage:', error);
  }
};


/* -------------------------  sheets -------------------------- */


/* -------------------------  exams -------------------------- */
const uploadexam = async (Filename, CourseID, Description, name) => {
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
        nameinstorage:name,
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

const uploadExamToStorage = async (uri, filename) => {
  
  const response = await fetch(uri);
  
  const blob = await response.blob();
  const storageRef = ref(storage, `exams/${filename}`);
  

  try {
    await uploadBytes(storageRef, blob);
    console.log('Document uploaded to Firebase Storage successfully');
  } catch (error) {
    console.log('Error uploading document to Firebase Storage:', error);
  }
};


const downloadExam = async (filename) => {
  try {
    const storageRef = ref(storage, `exams/${filename}`);
    const url = await getDownloadURL(storageRef);


    await Linking.openURL(url);
    /* const callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      this.setState({
        downloadProgress: progress,
      });
    }; */
    /* console.log(FileSystem.documentDirectory)
    const downloadResumable = FileSystem.createDownloadResumable(
      url, // URL of the file to download
      FileSystem.documentDirectory + filename,
      
    ); */

    // Download the file
    /* const { uri } = await downloadResumable.downloadAsync(); */

    //console.log('Downloaded file URI:', uri);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}; 

/* -------------------------  exams -------------------------- */

export { getAllReviews, createReviews, Createcomment, uploadsheet, getAllSheets, getAllExams, uploadexam, getAllComment,uploadExamToStorage, uploadSheetToStorage, downloadExam};