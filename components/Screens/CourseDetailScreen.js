import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/styles_coursedetail.js';
import { TouchableOpacity,Image,FlatList} from 'react-native';
import {icons} from '../../assets/styles/icon.js';


import {
  getAllReviews,

} from "../../firebase/firestoreCourseDetail.js";


const Reviews = ({ course,reviews}) => {
  const navigation = useNavigation();
  return(
    <View >
      {/* <Text style={styles.title}>reviews {course.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{course.description}</Text>
      </View> */}
      <View style={{ flexDirection: 'row'}}>
        <Button
          title="Review"
          onPress={() => navigation.navigate("createReview", { course})}
        />
      </View>
      
      <FlatList style={styles.container}
        data={reviews}
        numColumns={1}
        renderItem={({item})=>{ 
          
          return(
              <TouchableOpacity style={styles.filebox} onPress={() => { navigation.navigate('ReviewDetail',{item});}}>
                <Text style={styles.label}>{item.Description}</Text>  
            </TouchableOpacity>
            )
        }}
      />
    </View>
  );
}

const Sheets = ( props ) => {
  const course = props.course
  const navigation = useNavigation();
  return(
    <View >
      <Text style={styles.title}>sheets{course.title}</Text>
      <FlatList style={styles.container}
        data={props.course.sheets}
        numColumns={1}
        renderItem={(sheetfile)=>{ 
          //console.log(sheetfile)
          return(
            <TouchableOpacity style={styles.filebox} onPress={() => { navigation.navigate('FileDetail');  console.log("test download sucessfully")}}>
                <Text style={styles.label}>{sheetfile.item}</Text>  
                <View style={{ flexDirection: 'row',justifyContent: 'flex-end'}}>
                  <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
                  <Image source={require('../../assets/icons/download-icon.png')} 
                      style={icons.download_icon}
                    /> 
                  </TouchableOpacity>
                </View>
            </TouchableOpacity>
            )
        }}
      />
    </View>
  )
}

const Exam = ( props ) => {
  const course = props.course
  const navigation = useNavigation();
  return(
    <View style={{flex:1}}>
      <Text style={styles.title}>exam {course.title}</Text>
      <FlatList style={styles.container}
        data={props.course.exams}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={(examfile)=>{

          return(
              <TouchableOpacity style={styles.filebox} onPress={() => {navigation.navigate('FileDetail'); console.log("pop up detail file")}}>
                <Text style={styles.label}>{examfile.item}</Text>
                <View style={{ flexDirection: 'row',justifyContent: 'flex-end'}}>
                  <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
                    <Image source={require('../../assets/icons/download-icon.png')} 
                      style={icons.download_icon}
                    /> 
                  </TouchableOpacity>
                </View>
            </TouchableOpacity>
            )
        }}
        
      />
    </View>
  );
}

const fetchReviews = async (courseID) => {
  try {
    const review = await getAllReviews(courseID);
    return review;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

const CourseDetailScreen = ({ route }) => {
  // Extract the course details from the route params
  const { course } = route.params;
  // Now you can access the course object
  const [reviews, setreviews] = useState([]);
  
  useEffect(() => {
    const fetchReviewsAndUpdateState = async () => {
      const reviewsData = await fetchReviews(course.courseID);
      setreviews(reviewsData);
    };
    fetchReviewsAndUpdateState();
  },);

  if(route.name == "reviews"){
    return (
      <Reviews course={course} reviews={reviews}/>
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
export { fetchReviews };

