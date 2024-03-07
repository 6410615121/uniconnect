import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import coursesData from '../../test.json'; // Import the JSON data directly for testing fetch json from api
import { styles } from '../../style/styles_course.js';

const Courses = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  const handleCoursePress = (course) => {
    // Navigate to the CourseDetailScreen and pass the course object as a parameter
    navigation.navigate('CourseDetail', { course });
  };

  return (
    <View style={styles.container}>
      {coursesData.course.map((course) => (
        <TouchableOpacity key={course.id} onPress={() => handleCoursePress(course)}>
          <View style={styles.course}>
            <Text style={styles.title}>Title: {course.title}</Text>
            <Text style={styles.description}>Description: {course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Courses;
