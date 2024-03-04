import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import coursesData from '../../test.json'; // Import the JSON data directly for testing fetch json from api
import {styles} from '../../style/styles_course.js'

const Courses = () => {
  return (
    <View style={styles.container}>
      {coursesData.course.map(course => (
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

const handleCoursePress = (course) => {
  // show if it work
  console.log('Course pressed:', course);
};

export default Courses;

