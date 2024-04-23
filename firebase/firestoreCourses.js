import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const getAllCourses = async () => {
  try {
    // console.log(firestore);
    
    const courseDocs = await getDocs(collection(firestore, "courses"));
    //console.log(courseDocs.docs);
    const coursesData = courseDocs.docs.map((doc) => doc.data());
    // console.log(coursesData);
    return coursesData;

    // courseDocs.forEach((doc) => {
    //   console.log(`${doc.id} => `, doc.data());
    // });
  } catch (e) {
    console.error("Error getting allcourses: ", e);
  }
};

const createCourse = async (courseID, title, description) => {
  const Colors = [
    '#FF8C8C', // Red
    '#EBB757', // Orange
    '#7ECF7E', // Green
    '#9A9AD6', // Blue
    '#BC9FD1', // Indigo
  ];

  const randomColor = Colors[Math.floor(Math.random() * Colors.length)];

  try {
    const docRef = await addDoc(collection(firestore, "courses"), {
      courseID,
      title,
      description,
      reviewcounts:0,
      likeCount: 0,
      color: randomColor

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

const testCreateCourse = async () => {
  try {
    const docRef = await addDoc(collection(firestore, "courses"), {
      // id: "testID",
      title: "test title 001",
      description: "test description 555",
      exams: ["exam1.pdf", "exam2.pdf"],
      sheets: ["sheet1.pdf", "sheet2.pdf"]
    });
  
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export { getAllCourses, testCreateCourse, createCourse };
