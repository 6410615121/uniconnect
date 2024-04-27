import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  TouchableHighlight,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import coursesData from "../../test.json"; // Import the JSON data directly for testing fetch json from api
import { styles } from "../../assets/styles/styles_course.js";
import { createStackNavigator } from "@react-navigation/stack";

// firestore
import {
  getAllCourses,
  testCreateCourse,
  createCourse,
} from "../../firebase/firestoreCourses.js";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { favCourse, getFavCourseIDList, isUserFavThisCourse, unfavCourse } from "../../firebase/firebaseFavCourse.js";

const Stack = createStackNavigator();

/* ---------------------------- export default --------------------------- */
const Courses = (props) => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  const handleCoursePress = (course) => {
    // Navigate to the CourseDetailScreen and pass the course object as a parameter
    navigation.navigate("CourseDetail", { course });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="main" options={{ headerShown: false }}>
        {(screenProps) => (
          <MainScreen {...screenProps} handleCoursePress={handleCoursePress} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="createCourseScreen"
        options={{ headerTitle: "Course Creation" }}
      >
        {(screenProps) => <CreateCourseScreen {...screenProps} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
/* -------------------------------------------------------------------------- */

/* -------------------------  Create Course Screen -------------------------- */
const CreateCourseScreen = ({ route }) => {
  const [courseID, setCourseID] = useState("courseID");
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("description");

  // const { fetchCourses } = route.params;

  const navigation = useNavigation();

  const handleSubmitPress = async () => {
    await createCourse(courseID, title, description);
    // await fetchCourses();
    navigation.goBack();
  };

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Course ID"
        onChangeText={(text) => {
          setCourseID(text);
        }}
      />

      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Course Title"
        onChangeText={(text) => {
          setTitle(text);
        }}
      />

      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Description"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <Button title="submit" onPress={handleSubmitPress} />
    </View>
  );
};
/* -------------------------------------------------------------------------- */

/* ---------------------- Main section in CourseScreen ---------------------- */
const MainScreen = ({ handleCoursePress }) => {
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);
  const [userUID, setUserUID] = useState(null);

  // fetch userUID
  useEffect(() => {
    const fetchUserUID = async () => {
      try {
        const uid = await AsyncStorage.getItem("UID")
        if (!uid){
          console.error("No userUID")
        }else{
          // console.log("get userUID: ", uid)
          setUserUID(uid)
        }
      }catch(error){
        console.error("Error fetching userUID: ", error)
      }
    }

    fetchUserUID();
  }, []);

  const navigation = useNavigation();

  // fetching courses
  const fetchCourses = async () => {
    try {
      const courses = await getAllCourses();
      const favCourseIDList = await getFavCourseIDList(userUID);
      // console.log(favCourseIDList)

      courses.forEach((course) => {
        course.isFav = favCourseIDList.includes(course.courseID);
      });
      setCourses(courses);

      // console.log("fetched!");
      // console.log(courses)
      // console.log(courses.length)
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Call the fetchCourses function when component mounts
  }, []);

  // refresh when main become focus again
  useEffect(() => {
    const refresh = navigation.addListener("focus", () => {
      fetchCourses();
    });

    return refresh;
  }, [navigation]);

  // handle when pressing search submit button
  const handleSearchSubmit = async () => {
    if (searchText.trim().length > 0) {
      try {
        const fetchedCourses = await getAllCourses(); // Fetch courses

        const filteredCourses = fetchedCourses.filter((course) =>
          course.courseID.includes(searchText)
        );

        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching and filtering courses:", error);
      }
    } else {
      try {
        const fetchedCourses = await getAllCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  };

  const handleCourseFavPress = async (courseID) => {
    try{
      let result;
      const isFav = await isUserFavThisCourse(userUID, courseID);
      
      if(!isFav){
        result = await favCourse(userUID, courseID);
      }else{
        result = await unfavCourse(userUID, courseID);
      }
      // console.log("fav result: ", result)
      fetchCourses();
    }
    catch(error){
      console.error("Error Fav course: ", error)
    }
  
    // try {
    //   const result = await favCourse(userUID, courseID);
    //   // console.log("Favorited course result:", result);
    // } catch (error) {
    //   // console.error("Error favoriting course:", error);
    // }
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#EFECEC",
          width: "100%",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        <TextInput
          style={{
            backgroundColor: "#FFF8E3",
            padding: 8,
            paddingLeft: 15,
            width: 250,
            borderWidth: 1,
            borderRadius: 15,
          }}
          placeholder="search by id"
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          onPress={handleSearchSubmit}
          style={{ justifyContent: "center" }}
        >
          <Image source={require("../../assets/icons/search.png")} />
        </TouchableOpacity>
        <TouchableOpacity style={{ justifyContent: "center" }}>
          <Image source={require("../../assets/icons/bigHeart.png")} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("createCourseScreen")}
          style={{ justifyContent: "center" }}
        >
          <Image
            style={{ height: 32, marginBottom: 2 }}
            source={require("../../assets/icons/add_FILL0_wght400_GRAD0_opsz24.png")}
          />
        </TouchableOpacity>

        {/* <Button title="search" onPress={handleSearchSubmit} />
        check later isAdmin? */}
        {/* <Button
          title="create"
          onPress={() => navigation.navigate("createCourseScreen")}
        /> */}
      </View>

      <FlatList
        style={styles.container}
        data={courses}
        contentContainerStyle={{ paddingBottom: 40 }}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCoursePress(item)}
            >
              <View style={styles.course_container}>
                <View
                  style={[
                    styles.course_header,
                    { backgroundColor: item.color },
                    // { backgroundColor: "#BC9FD1" }
                  ]}
                >
                  <Text style={styles.courseID}>{item.courseID}</Text>
                </View>

                <View style={styles.course_text_box}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>

                {/* Heart icon inside TouchableOpacity */}
                <TouchableOpacity
                  onPress={() => handleCourseFavPress(item.courseID)}
                  style={{ position: "absolute", top: 0, right: 5 }}
                >
                  {item.isFav? <Text>Faved!</Text>: <Image source={require("../../assets/icons/bigHeart.png")} />}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
/* -------------------------------------------------------------------------- */

export default Courses;
