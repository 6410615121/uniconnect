import React from 'react';
import { View, Text } from 'react-native';

const CourseDetailScreen = ({ route }) => {
  // Extract the course details from the route params
  const { course } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Course Detail</Text>
      <Text>Title: {course.title}</Text>
      <Text>Description: {course.description}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default CourseDetailScreen;
