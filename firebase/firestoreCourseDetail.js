import { firestore, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { collection, query, where, getDocs,getDoc, addDoc, updateDoc, runTransaction, doc, setDoc, deleteDoc } from "firebase/firestore";
//import * as FileSystem from 'expo-file-system';
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

const getMyReviews = async (userID) => {
  try {
    // Query all course documents
    const coursesCollectionRef = collection(firestore, "courses");
    const courseQuerySnapshot = await getDocs(coursesCollectionRef);

    // Array to store all reviews
    let allReviews = [];

    for (const courseDoc of courseQuerySnapshot.docs) {
      // Query the reviews subcollection for the current course and filter by userID
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      const reviewsQuerySnapshot = await getDocs(
        query(reviewsCollectionRef, where("userID", "==", userID))
      );

      // Extract data from the query snapshot and push it to the array
      const reviewsData = reviewsQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      allReviews.push(...reviewsData);
    }

    return allReviews;

  } catch (e) {
    console.error("Error getting allforums: ", e);
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


const createReviews = async (userID, Author, CourseID,Description) => {
  try {
    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    
    if (!courseQuerySnapshot.empty) {
      await runTransaction(firestore, async (transaction) => {
        const courseDoc = courseQuerySnapshot.docs[0];
        const courseDocSnapshot = await transaction.get(courseDoc.ref);
        const courseData = courseDocSnapshot.data();

        const updatedCourseData = {
          ...courseData,
          reviewcounts: (courseData.reviewcounts || 0) + 1, // Increment reviewcounts
        };
        transaction.update(courseDoc.ref, updatedCourseData);
  

        
        const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
        await addDoc(reviewsCollectionRef, {
          userID:userID,
          Author:Author,
          CourseID,
          Description,
          commentcounts:0,
          likeCount: 0,
        });
      })
    } 
    

  } catch (e) {
    console.error("Error creating reviews: ", e);
    return [];
  }
};

const Createcomment = async (userID, Author,IDCourse, IDReview, comment) => {
  try {

    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      
      const reviewDocRef = doc(reviewsCollectionRef, IDReview);

      
      if (! reviewDocRef.empty) {
        await runTransaction(firestore, async (transaction) => {
          const reviewDocSnapshot = await transaction.get(reviewDocRef);
  
          const reviewData = reviewDocSnapshot.data();
          const updatedreviewData = {
            ...reviewData,
            commentcounts: (reviewData.commentcounts || 0) + 1, // Increment commentcounts
          };
          transaction.update(reviewDocRef, updatedreviewData); 

          const commentCollectionRef = collection(reviewDocRef, "comments");
          await addDoc(commentCollectionRef, {
            Author:Author,
            userID:userID,
            comment,
            likeCount: 0,
          });
        })
      } else {
        console.log("No matching reviews found.");
      }
      
    } 

  } catch (e) {
    console.error("Error creating comments: ", e);
    return [];
  }
};

const likeReview = async (IDCourse, IDReview) => {
  try {
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      
      const reviewDocRef = doc(reviewsCollectionRef, IDReview);

      
      if (! reviewDocRef.empty) {
        await runTransaction(firestore, async (transaction) => {
          const reviewDocSnapshot = await transaction.get(reviewDocRef);
  
          const reviewData = reviewDocSnapshot.data();
          const updatedreviewData = {
            ...reviewData,
            likeCount: (reviewData.likeCount || 0) + 1, // Increment commentcounts
          };
          transaction.update(reviewDocRef, updatedreviewData);       
        })
      } else {
        console.log("No matching reviews found.");
      }
      
    } 

  } catch (e) {
    console.error("Error creating comments: ", e);
    return [];
  }
};

const unlikeReview = async (IDCourse, IDReview) => {
  try {
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
      
      const reviewDocRef = doc(reviewsCollectionRef, IDReview);

      
      if (! reviewDocRef.empty) {
        await runTransaction(firestore, async (transaction) => {
          const reviewDocSnapshot = await transaction.get(reviewDocRef);
  
          const reviewData = reviewDocSnapshot.data();
          const updatedreviewData = {
            ...reviewData,
            likeCount: (reviewData.likeCount || 0) - 1, // Increment commentcounts
          };
          transaction.update(reviewDocRef, updatedreviewData);       
        })
      } else {
        console.log("No matching reviews found.");
      }
      
    } 

  } catch (e) {
    console.error("Error creating comments: ", e);
    return [];
  }
};

const favReview = async (uid, IDCourse, IDPost)=>{
  const docRef = doc(firestore, "users", uid, "favouriteReview"
);
  const reviewRef = doc(collection(docRef,IDPost));
  // Get the snapshot of the document
  await addDoc(docRef, {IDPost})
  const reviewSnapshot = await getDoc(reviewRef);

  // Check if the document exists
  if (reviewSnapshot.exists()) {

    await deleteDoc(reviewRef);
    await unlikeReview(IDCourse, IDPost)

  } else {
    // Document does not exist

    
    await setDoc(reviewRef, {IDPost})
    await likeReview(IDCourse, IDPost)
  
  } 
}

const getfavReview = async (uid)=>{
  try {
    console.log(uid)
    const querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview"));
    console.log(querySnapshot.docs)
    //const favouriteReviews = querySnapshot.docs.map(doc => doc.data());
    //console.log(uid)
    //return favouriteReviews;
  } catch (error) {
    console.error("Error fetching favourite reviews for user:", error);
    return [];
  }
};


/* -------------------------  Reviews -------------------------- */







/* -------------------------  sheets -------------------------- */
const uploadsheet = async (Filename, userID, Author, CourseID, Description, name) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const sheetsCollectionRef = collection(courseDoc.ref, "sheets");
      const docRef = await addDoc(sheetsCollectionRef, {
        Author:Author,
        userID:userID,
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
const uploadexam = async (Filename, userID, Author, CourseID, Description, name) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', CourseID));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const sheetsCollectionRef = collection(courseDoc.ref, "exams");
      const docRef = await addDoc(sheetsCollectionRef, {
        Author:Author,
        userID:userID,
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

export { getAllReviews, getMyReviews, createReviews, Createcomment, uploadsheet, getAllSheets, getAllExams, uploadexam, getAllComment,uploadExamToStorage, uploadSheetToStorage, downloadExam, favReview, getfavReview};