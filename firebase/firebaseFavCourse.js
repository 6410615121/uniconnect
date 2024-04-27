import { firestore } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc, query, where, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { getAllCourses } from "./firestoreCourses";

const favCourse = async (uid, courseid)=>{
    const docRef = doc(firestore, "users", uid, "favouriteCourse", courseid);
    try {
       await setDoc(docRef, {
            // courseID: courseid
        })
        console.log("Favorited course successfully!");
        return true;
    }
    catch (error) {
        console.error("Error add fav: ", error)
        return false;
    } 
}

const getFavCourseIDList = async (uid) => {
    try{
        const FavCourses = await getDocs(collection(firestore, "users", uid, "favouriteCourse"))
        const courseIDList = FavCourses.docs.map((doc) => doc.id)
        return courseIDList;
    }
    catch(error){
        console.error("Error fetching fav courses: ", error)
        return null;
    }
    
}

const isUserFavThisCourse = async (uid, courseid) => {
    try {
        const courseIDList = await getFavCourseIDList(uid);
        return courseIDList.includes(courseid);
    } catch (error) {
        console.error("Error checking if user fav this course: ", error);
        return false;
    }
}

const unfavCourse = async (uid, courseid) => {
    const docRef = doc(firestore, "users", uid, "favouriteCourse", courseid);
    try {
        await deleteDoc(docRef);
        console.log("Unfavorited course successfully!");
        return true;
    } catch (error) {
        console.error("Error removing fav: ", error);
        return false;
    }
}

const getFavCourse = async (uid) => {
    try{
        const courses = await getAllCourses()
        const favCourseIDList = await getFavCourseIDList();

        const favCourses = courses.filter((course) => favCourseIDList.includes(course.courseID))
        return favCourses;
    }catch(error){
        console.error("error getfavCourse: ", error)
        return [];
    } 
}


export { favCourse, getFavCourseIDList, isUserFavThisCourse, unfavCourse }

// favCourse("E7l7Pjj1W6Rls4dg5jV2PxNJ8bh1", "CN202");
