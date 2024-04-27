import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDoc, getDocs, doc, query, where, runTransaction, setDoc, deleteDoc } from "firebase/firestore";
import {
  notify
} from "./firebasenotify.js";


const getAllForums = async () => {
  try {
    // console.log(firestore);
    
    const forumsDocs = await getDocs(collection(firestore, "forums"));
    //console.log(courseDocs.docs);
    const forumsData = forumsDocs.docs.map((doc) => { return {id:doc.id,field:doc.data()}});
    // console.log(coursesData);
    return forumsData;

    // courseDocs.forEach((doc) => {
    //   console.log(`${doc.id} => `, doc.data());
    // });
  } catch (e) {
    console.error("Error getting allforums: ", e);
  }
};

const getMyForums = async (userID) => {
  try {
 
    
    const forumsDocs = await getDocs(query(collection(firestore, "forums"),where("userID", '==', userID)));
    const forumsData = forumsDocs.docs.map((doc) => { return {id:doc.id,field:doc.data()}});
   
    return forumsData;

  } catch (e) {
    console.error("Error getting allforums: ", e);
  }
};


const createPost = async (userID, Author, description) => {
  try {
    const docRef = await addDoc(collection(firestore, "forums"), {
      userID:userID,
      author:Author, //test data
      Description:description, //test data
      commentcounts:0,
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

const likePost = async (IDPost) => {
  try {

    const forumDocRef  = doc(firestore, 'forums', IDPost);
    
    if (!forumDocRef.empty) {
      await runTransaction(firestore, async (transaction) => {
        
        const forumDocSnapshot = await transaction.get(forumDocRef);
        const forumData = forumDocSnapshot.data();

        
        const updatedPostData = {
          ...forumData,
          likeCount: (forumData.likeCount || 0) + 1, // Increment likeCount
        };
        transaction.update(forumDocRef, updatedPostData); 

      })
    } 

  } catch (e) {
    console.error("Error Increment likeCount: ", e);
    return [];
  }
};
const unlikePost = async (IDPost) => {
  try {

    const forumDocRef  = doc(firestore, 'forums', IDPost);
    
    if (!forumDocRef.empty) {
      await runTransaction(firestore, async (transaction) => {
        
        const forumDocSnapshot = await transaction.get(forumDocRef);
        const forumData = forumDocSnapshot.data();

        
        const updatedPostData = {
          ...forumData,
          likeCount: (forumData.likeCount || 0) - 1, // Decrement likeCount
        };
        transaction.update(forumDocRef, updatedPostData); 

      })
    } 

  } catch (e) {
    console.error("Error Decrement likeCount: ", e);
    return [];
  }
};

const favPost = async (uid, IDPost)=>{
  try {
    const docRef = doc(firestore, "users", uid, "favouritePost", IDPost);

    await setDoc(docRef, {})
    await likePost(IDPost)
    await notify(IDPost,"Like you Post",uid)
  }catch(error){
    console.error("error : ", error)
  }
}

const unfavPost = async (uid, IDPost)=>{
  try {
    const docRef = doc(firestore, "users", uid, "favouritePost", IDPost);

    await deleteDoc(docRef)
    await unlikePost(IDPost)
  }catch(error){
    console.error("error : ", error)
  } 
}


const getfavPost= async (uid)=>{
  try {
    
    const querySnapshot = await getDocs(collection(firestore, "users", uid, "favouritePost"));
    
    const forumDataList = [];
    
    for (const docquery of querySnapshot.docs) {
        
        const forumDocRef = doc(firestore, "forums", docquery.id);
        const forumDocSnapshot = await getDoc(forumDocRef);
        forumDataList.push({id:forumDocSnapshot.id,field:forumDocSnapshot.data()});
    } 
    
    
    return forumDataList;
  } catch (error) {
    console.error("Error fetching favourite reviews for user:", error);
    return [];
  }
};



const Createcomment = async (userID, Author, IDPost, comment) => {
  try {

    const forumDocRef  = doc(firestore, 'forums', IDPost);
    
    if (!forumDocRef.empty) {
      await runTransaction(firestore, async (transaction) => {
        
        const forumDocSnapshot = await transaction.get(forumDocRef);
        const forumData = forumDocSnapshot.data();

        
        const updatedPostData = {
          ...forumData,
          commentcounts: (forumData.commentcounts || 0) + 1, // Increment commentcounts
        };
        transaction.update(forumDocRef, updatedPostData); 


         const commentsCollectionRef = collection(forumDocRef, 'comments');
        await addDoc(commentsCollectionRef, {
          Author:Author,
          userID:userID,
          comment,
          likeCount: 0,
        }); 
      })

    } 

  } catch (e) {
    console.error("Error creating comments: ", e);
    return [];
  }
};

const getAllCommentForum = async (IDPost) => {
  try {
    
    let allComments = [];
    const commentsCollectionRef = collection(firestore, 'forums', IDPost, 'comments');
    const commentsDOC = await getDocs(commentsCollectionRef);

    if (!commentsDOC.empty) {
      const commentsData = commentsDOC.docs.map((doc) => doc.data());
      allComments = commentsData;
    }

    return allComments;

  } catch (e) {
    console.error("Error getting all comments: ", e);
    return [];
  }
};

export { getAllForums, createPost, getAllCommentForum,Createcomment, getMyForums, favPost, unfavPost, getfavPost};
