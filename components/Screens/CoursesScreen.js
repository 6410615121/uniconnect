import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Button } from "react-native";
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

const Stack = createStackNavigator();

// export default
const Courses = (props) => {
  // const [courses, setCourses] = useState([]);
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  // // fetching
  // const fetchCourses = async () => {
  //   try {
  //     const courses = await getAllCourses();
  //     setCourses(courses);
  //   } catch (error) {
  //     console.error("Error fetching courses:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchCourses(); // Call the fetchCourses function when component mounts
  // }, []);


  const handleCoursePress = (course) => {
    // Navigate to the CourseDetailScreen and pass the course object as a parameter
    navigation.navigate("CourseDetail", { course });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="main" options={{ headerShown: false }}>
        {(screenProps) => (
          <MainScreen
            {...screenProps}
            // courses={courses}
            handleCoursePress={handleCoursePress}
            // setCourses={setCourses}
            // course={courses}
            // fetchCourses={fetchCourses}
            // allCourses={courses}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="createCourseScreen"
        options={{ headerTitle: "Course Creation" }}
      >
        {(screenProps) => (
          <CreateCourseScreen {...screenProps}/>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

// Create Course Screen
const CreateCourseScreen = ({ route }) => {
  const [courseID, setCourseID] = useState("courseID");
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("description");

  const { fetchCourses } = route.params;

  const navigation = useNavigation();

  const handleSubmitPress = async () => {
    await createCourse(courseID, title, description);
    await fetchCourses();
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

// Main section in CourseScreen
const MainScreen = ({handleCoursePress}) => {
  const [searchText, setSearchText] = useState("");
  const [courses, setCourses] = useState([]);

  const navigation = useNavigation();

  // fetching
  const fetchCourses = async () => {
    try {
      const courses = await getAllCourses();
      setCourses(courses);
      console.log("fetched!")
      //console.log(courses)
      console.log(courses.length)

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
    
    useEffect(() => {
      fetchCourses(); // Call the fetchCourses function when component mounts
    }, []);

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

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flexDirection: 'row'}}>
        <TextInput
          style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 , marginEnd: 5}}
          placeholder="search by id"
          onChangeText={(text) => setSearchText(text)}
        />


        <Button title="search" onPress={handleSearchSubmit}/>
        {/* check later isAdmin? */}
        <Button
          title="create"
          onPress={() => navigation.navigate("createCourseScreen", {fetchCourses})}
        />
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
              <View style={styles.course}>
                <Text style={styles.title}>id: {item.courseID}</Text>
                <Text style={styles.title}>Title: {item.title}</Text>
                {/* <Text style={styles.description}>
                  Description: {item.description}
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        }}
      />

    </View>
  );
};

// const TestButton = ({handleTestCreateCourse}) => {
//   return (
//     <Button
//      title="test create course"
//      onPress={handleTestCreateCourse}
//     />
//   );
// }

export default Courses;
