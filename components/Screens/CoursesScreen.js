import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import coursesData from '../../test.json'; // Import the JSON data directly for testing fetch json from api
import { styles } from '../../assets/styles/styles_course.js';

const Courses = (props) => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  const handleCoursePress = (course) => {
    // Navigate to the CourseDetailScreen and pass the course object as a parameter
    navigation.navigate('CourseDetail', { course });
  };

  return (
    <View >
      <FlatList style={styles.container}
        data={coursesData.course}
        numColumns={2}
        renderItem={({item})=>{
          return(
            <TouchableOpacity key={item.id} onPress={() => handleCoursePress(item)}>
              <View style={styles.course}>
                <Text style={styles.title}>Title: {item.title}</Text>
                <Text style={styles.description}>Description: {item.description}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

export default Courses;
