import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc } from "firebase/firestore";

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

const createPost = async (description) => {
  try {
    const docRef = await addDoc(collection(firestore, "forums"), {
      
      author:"nawaphoom Nachai", //test data
      Description:description, //test data
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
const Createcomment = async (IDPost, comment) => {
  try {

    const commentsCollectionRef = collection(firestore, 'forums', IDPost, 'comments');
    

    if (!commentsCollectionRef.empty) {

      await addDoc(commentsCollectionRef, {
        Author:"Nawaphoom Nachai",
        comment,
        likeCount: 0,
      });
      

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

export { getAllForums, createPost, getAllCommentForum,Createcomment };
