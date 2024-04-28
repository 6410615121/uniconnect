import { firestore, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL, connectStorageEmulator, } from "firebase/storage";
import { collection, query, where, getDocs,getDoc, addDoc, updateDoc, runTransaction, doc, setDoc, deleteDoc } from "firebase/firestore";
//import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';
import {
  notifyReview
} from "./firebasenotify.js";


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

const getReview = async (IDCourse,reviewID) => {
  try {

    // Query all course documents
    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    // Array to store reviews
    let Reviews = [];

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewDocRef = doc(courseDoc.ref, "reviews", reviewID);
      
      const reviewsQuerySnapshot = await getDoc(reviewDocRef);

      Reviews = reviewsQuerySnapshot.data();
      
    } 

    return Reviews;

  } catch (e) {
    console.error("Error getting all reviews: ", e);
    return [];
  }
};

const delReview = async (IDCourse,reviewID) => {
  try {

    const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', IDCourse));
    const courseQuerySnapshot = await getDocs(filteredCourses);

    const querySnapshot = await getDocs(collection(firestore, 'users'));

    querySnapshot.forEach(async (userDoc) => {
      const favouritePostRef = doc(userDoc.ref, 'favouriteReview',IDCourse,"IDPost",reviewID);
      const favouritePostDoc = await getDoc(favouritePostRef);
    
      if (favouritePostDoc.exists) {
        await deleteDoc(favouritePostRef);
      } 
    });

    if (!courseQuerySnapshot.empty) {
      const courseDoc = courseQuerySnapshot.docs[0];
      const reviewDocRef = doc(courseDoc.ref, "reviews", reviewID);
      deleteDoc(reviewDocRef);

    } 

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

      const reviewDocSnapshot = await getDoc(reviewDocRef);
      if (reviewDocSnapshot.exists()) {
        await runTransaction(firestore, async (transaction) => {
          const reviewData = reviewDocSnapshot.data();
          const updatedReviewData = {
            ...reviewData,
            likeCount: (reviewData.likeCount || 0) + 1,
          };
          transaction.update(reviewDocRef, updatedReviewData);
        });
      } else {
        console.log("Review document not found.");
      }
    } else {
      console.log("Course document not found.");
    }
  } catch (e) {
    console.error("Error liking review: ", e);
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

      const reviewDocSnapshot = await getDoc(reviewDocRef);
      if (reviewDocSnapshot.exists()) {
        await runTransaction(firestore, async (transaction) => {
          const reviewData = reviewDocSnapshot.data();
          const updatedReviewData = {
            ...reviewData,
            likeCount: (reviewData.likeCount || 0) - 1,
          };
          transaction.update(reviewDocRef, updatedReviewData);
        });
      } else {
        console.log("Review document not found.");
      }
    } else {
      console.log("Course document not found.");
    }
  } catch (e) {
    console.error("Error unliking review: ", e);
  }
};


const favReview = async (uid, IDCourse, IDPost)=>{
  try {
    const CoursedocRef = doc(firestore, "users", uid, "favouriteReview", IDCourse)
    await setDoc(CoursedocRef, {})

    const postDocRef = doc(CoursedocRef, "IDPost", IDPost)
    await setDoc(postDocRef, {
      [IDPost]: IDPost
    });
    await likeReview(IDCourse, IDPost)
    await notifyReview(IDCourse, IDPost,"Like your review",uid)
    
  }catch(error){
    console.error("error fav1: ", error)
  }
  
}

const unfavReview = async (uid, IDCourse, IDPost)=>{
  try {
    const CoursedocRef = doc(firestore, "users", uid, "favouriteReview", IDCourse)
    await setDoc(CoursedocRef, {})

    const postDocRef = doc(CoursedocRef, "IDPost", IDPost)
    await deleteDoc(postDocRef)
    await unlikeReview(IDCourse, IDPost)
    
  }catch(error){
    console.error("error fav2: ", error)
  }
  
}

const getfavReview = async (uid)=>{
  try {
    
    const querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview"));
    
    const favouriteReviews = querySnapshot.docs.map(doc => doc.id);
    const allSubcollectionDocs = [];
    for (const doc of querySnapshot.docs) {
        //console.log(doc.id)
        const subcollectionRef = collection(doc.ref, "IDPost");
        const subcollectionSnapshot = await getDocs(subcollectionRef);
        
        subcollectionSnapshot.forEach(async (subDoc) => {
          const filteredCourses = query(collection(firestore, "courses"), where("courseID", '==', doc.id ));
          const courseQuerySnapshot = await getDocs(filteredCourses);
          
          const courseDoc = courseQuerySnapshot.docs[0];
          const reviewsCollectionRef = collection(courseDoc.ref, "reviews");
          // Query all documents from the "reviews" subcollection for the course
          const reviewsQuerySnapshot = await getDocs(reviewsCollectionRef);
          const reviewsData = reviewsQuerySnapshot.docs.map((doc) => {return {id:doc.id,data:doc.data()}});
         
          allSubcollectionDocs.push({
            postID: reviewsData[0].id, 
            data: reviewsData[0].data 
          }); 
        });
        
    }
    

    return allSubcollectionDocs;
  } catch (error) {
    console.error("Error fetching favourite reviews for user:", error);
    return [];
  }
};

const getfavReviewFromUID = async(uid) =>{
  let ref = collection(firestore,"users",uid,"favouriteReview")
  const coursesDoc = await getDocs(ref);

  const coursesArray = coursesDoc.docs.map((doc)=>(doc.id))


  // get [{courseID:"cn202, postID:id"}]
  const favouriteReviewObjects = []
  for(course of coursesArray){
    // console.log(course)
    ref = collection(firestore,"users",uid,"favouriteReview", course, "IDPost")
    const postDocInCourse = await getDocs(ref)
    postDocInCourse.docs.forEach(
      (doc)=>{
        const obj = {
          postID:doc.id,
          courseID: course
        }
        favouriteReviewObjects.push(obj)
      }
    )
  }
  
  // get reviews
  const reviews = []
  
  for(favObj of favouriteReviewObjects){
    const courseID = favObj.courseID
    const postID = favObj.postID

    ref = doc(firestore, "courses", courseID, "reviews", postID)
    const reviewDoc = await getDoc(ref);
    const reviewDocData = reviewDoc.data()
    reviewDocData.postID = favObj.postID

    reviews.push(reviewDocData)
  }
  console.log("reviews: ", reviews)


  return reviews;

}

// const getfavReview = async (uid)=>{
//   try {
//     // console.log(uid)
//     let querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview"));
//     // console.log(querySnapshot.docs)
//     const courseIDList = querySnapshot.docs.map(doc => doc.id);
//     console.log(courseIDList)

//     for(courseID of courseIDList){
//       querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview", courseID,"IDPost"))
//       const postIDs = querySnapshot.docs.map((doc)=>doc.data())
//       console.log(postIDs)
//     }
//     // return courseIDList;
//   } catch (error) {
//     console.error("Error fetching favourite reviews for user:", error);
//     return [];
//   }
// };


const getfavReviewByCourseIDAndUID = async (uid, courseID)=>{
  try {
    // console.log(uid)
    let querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview", courseID, "IDPost"));
    // console.log(querySnapshot.docs)
    const FavcourseIDList = querySnapshot.docs.map(doc => doc.id);
    return FavcourseIDList

    // for(courseID of courseIDList){
    //   querySnapshot = await getDocs(collection(firestore, "users", uid, "favouriteReview", courseID,"IDPost"))
    //   const postIDs = querySnapshot.docs.map((doc)=>doc.data())
    //   console.log(postIDs)
    // }
    // return courseIDList;
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

export { getAllReviews, getMyReviews, createReviews, getfavReviewFromUID,
  Createcomment, uploadsheet, getAllSheets, getAllExams, 
  uploadexam, getAllComment,uploadExamToStorage, uploadSheetToStorage, 
  downloadExam, favReview, getfavReview, unfavReview, getfavReviewByCourseIDAndUID, getReview, delReview};