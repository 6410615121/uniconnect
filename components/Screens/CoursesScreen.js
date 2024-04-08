import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList , Button} from "react-native";
import { useNavigation } from "@react-navigation/native";
import coursesData from "../../test.json"; // Import the JSON data directly for testing fetch json from api
import { styles } from "../../assets/styles/styles_course.js";

// firestore
import { getAllCourses, testCreateCourse } from "../../firebase/firestoreCourses.js";

const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  const fetchCourses = async () => {
    try {
      const courses = await getAllCourses(); 
      setCourses(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // fetching
  useEffect(() => {
    fetchCourses(); // Call the fetchCourses function when component mounts
  }, []);


  const handleCoursePress = (course) => {
    // Navigate to the CourseDetailScreen and pass the course object as a parameter
    navigation.navigate("CourseDetail", { course });
  };

  const handleTestCreateCourse = () =>{
    testCreateCourse();
    fetchCourses();
  }

  return (
    <View style={{flex:1, alignItems:"center"}}>
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
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.description}>
                  Description: {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TestButton handleTestCreateCourse={handleTestCreateCourse} />

    </View>
  );
};

const TestButton = ({handleTestCreateCourse}) => {
  return (
    <Button
     title="test create course"
     onPress={handleTestCreateCourse}
    />
  );
}

export default Courses;
