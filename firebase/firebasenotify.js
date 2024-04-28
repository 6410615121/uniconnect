import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDoc, getDocs, doc, query, where, runTransaction, setDoc, deleteDoc } from "firebase/firestore";


const notifyPost = async (IDPost,context,from )=>{
  
    try {

      const forumDocRef = doc(firestore, "forums", IDPost);

      const Postsnapshot= await getDoc(forumDocRef);
      const to = Postsnapshot.data().userID
      
      const docRef = collection(firestore, "users", to, "notification");
      const fromRef = doc(firestore, "users", from);
      const docSnapshot = await getDoc(fromRef);
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
    };
    
      const datetime = new Date().toLocaleString('en-US', options);

      if (to != from){
        await addDoc(docRef, {
          from:docSnapshot.data().name,
          Description:context,
          hasBeenClicked:false, 
          category:"reply",
          type:"post",
          date: datetime ,
          IDPost:IDPost,
        })
      }
    }catch(error){
      console.error("error : ", error)
    }
}

const notifyReview = async (courseID,reviewID,context,from )=>{
  
  try {

    const reviewDocRef = doc(firestore, "courses", courseID,"reviews",reviewID);

    const Reviewsnapshot= await getDoc(reviewDocRef);
    const to = Reviewsnapshot.data().userID
    
    //get name 
    const docRef = collection(firestore, "users", to, "notification");
    
    const fromRef = doc(firestore, "users", from);
    const docSnapshot = await getDoc(fromRef);

    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
  };
  
    const datetime = new Date().toLocaleString('en-US', options);

    if (to != from){
      await addDoc(docRef, {
        from:docSnapshot.data().name,
        Description:context,
        hasBeenClicked:false, 
        category:"reply",
        type:"review",
        date: datetime,
        courseID:courseID,
        reviewID:reviewID
      })
    }
  }catch(error){
    console.error("error : ", error)
  }
}



const getnotify = async (UserID )=>{
  
  try {

    
    const querySnapshot = await getDocs(collection(firestore, "users", UserID, "notification"));

    const notifyData = querySnapshot.docs.map((doc) => doc.data());
    
    return notifyData;
    
  }catch(error){
    console.error("error : ", error)
  }
}


export {notifyPost, notifyReview, getnotify} 