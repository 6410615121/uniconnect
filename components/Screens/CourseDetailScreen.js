import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../style/styles_coursedetail.js';

const Reviews = ({ course }) => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>reviews {course.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{course.description}</Text>
      </View>
    </View>
  );
}

const Sheets = ({ course }) => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>sheets {course.title}</Text>
      {course.sheets.map((sheetfile,index) => (
        <View style={styles.filebox}>
          <Text key={`${course.id}_${index}`} style={styles.label}>{sheetfile}:</Text>
        </View>
      ))}
    </View>
  );
}

const Exam = ({ course }) => {
  console.log(course);
  return(
    <View style={styles.container}>
      <Text style={styles.title}>exam {course.title}</Text>
      {course.exam.map((examfile,index) => (
        <View style={styles.filebox}>
          <Text key={`${course.id}_${index}`} style={styles.label}>{examfile}:</Text>
        </View>
      ))}
    </View>
  );
}

const CourseDetailScreen = ({ route }) => {
  // Extract the course details from the route params
  const { course } = route.params;
  // Now you can access the course object
  
  if(route.name == "reviews"){
    return (
      <Reviews course={course} />
    );
  }else if (route.name == "sheets"){
    return (
      <Sheets course={course} />
    );
  }else{
    return (
      <Exam course={course} />
    );
  }

};


export default CourseDetailScreen;
