import React, { useState, useEffect} from "react";
import { View, Text, StyleSheet,Button,TouchableHighlight, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../assets/styles/styles_coursedetail.js';
import { TouchableOpacity,Image,FlatList} from 'react-native';
import {icons} from '../../assets/styles/icon.js';
import { useIsFocused } from '@react-navigation/native';

import {
  getAllReviews,
  getAllSheets,
  getAllExams,
  downloadExam,
} from "../../firebase/firestoreCourseDetail.js";


const Reviews = ({ course,reviews}) => {
  const navigation = useNavigation();
  const extractedReviews = reviews.map((review) => ({
    reviewID: review.id,
    Author: review.data.Author,
    CourseID: review.data.CourseID,
    Description: review.data.Description,
    likeCount: review.data.likeCount,
  }));
  

  return(
    <View >
      {/* <Text style={styles.title}>reviews {course.title}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{course.description}</Text>
      </View> */}
      <View style={{ flexDirection: 'row',marginTop:10, marginLeft:40,marginRight:40}}>
        <TouchableOpacity onPress={() => navigation.navigate("createReview", { course})} style={{width:'50%'}} >
          <View>
            <Image 
              source={require("../../assets/icons/postIcon.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50%'}}>
        <View>
            <Image 
              source={require("../../assets/icons/filter.png")}
              style={{marginTop:5,alignSelf:'flex-end'}}
            />
          </View>
        </TouchableOpacity>
        {/* <Button
          title="Review"
          onPress={() => navigation.navigate("createReview", { course})}

        /> */}
      </View>
      
      <FlatList style={styles.container}
        data={extractedReviews}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({item})=>{ 
          
          return(
// <<<<<<< HEAD
            <View style={styles.postbox} >
                <TouchableOpacity onPress={() => { navigation.navigate('ReviewDetail',{item});}} style={{width:'100%'}}>
                  <View style={{flexDirection:'row'}}>
                    <Image source={require("../../assets/icons/profileBlue.png")}/>
                    <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{item.Author}</Text>
                  </View>
                  <Text style={styles.label}>{item.Description}</Text>
                </TouchableOpacity>
                  <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
                      <Image source={require("../../assets/icons/minilike.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{item.likeCount} Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
                      <Image source={require("../../assets/icons/minicomment.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
                    </TouchableOpacity>
                  </View>  
            </View>
            )
        }}
      />
    </View>
  );
}

const Sheets = ( props ) => {
  const course = props.course
  const sheets = props.sheets
  const navigation = useNavigation();
  return(
    <View >
      {/* <Text style={styles.title}>sheets{course.title}</Text> */}
      <View style={{ flexDirection: 'row',marginTop:20, marginLeft:40,marginRight:40}}>
      <TouchableOpacity onPress={() => navigation.navigate("uploadsheet", { course})} style={{width:'50%'}}>
          <View>
            <Image 
              source={require("../../assets/icons/uploadfile.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50%'}}>
        <View>
            <Image 
              source={require("../../assets/icons/filter.png")}
              style={{marginTop:0,alignSelf:'flex-end'}}
            />
          </View>
        </TouchableOpacity>
        {/* <Button
          title="upload"
          onPress={() => navigation.navigate("uploadsheet", { course})}
        /> */}
      </View>
      <FlatList style={styles.container}
        data={sheets}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({item})=>{ 
          //console.log(sheetfile)
          return(
            <View style={[styles.filebox , {flexDirection:'row',justifyContent:'center'}]}>
              <TouchableOpacity onPress={() => { navigation.navigate('FileDetail', {item});}} style={{ flexDirection: 'row',width:'80%'}}>
                <Image source={require('../../assets/icons/file.png')} style={{marginTop:10}}/>
                <View >
                    <Text style={{fontSize: 18,marginTop: 5,marginLeft:20,color: '#0C2D57'}}>{item.Filename}</Text>
                </View>
              </TouchableOpacity>
              <View style={{width:'20%'}}>
                <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
                    <Image source={require('../../assets/icons/dowsload.png')}/> 
                </TouchableOpacity>
              </View>
            </View>
            )
        }}
      />
    </View>
  )
}

const Exam = ( props ) => {
  const course = props.course
  const exams = props.exams
  const navigation = useNavigation();
  return(
    <View style={{flex:1}}>
      {/* <Text style={styles.title}>exam {course.title}</Text> */}
      {/* <View style={{ flexDirection: 'row',marginTop:10, marginLeft:10}}>
        <Button
          title="upload"
          onPress={() => navigation.navigate("uploadexam", { course})}
        />
      </View> */}
      <View style={{ flexDirection: 'row',marginTop:20, marginLeft:40,marginRight:40}}>
      <TouchableOpacity  onPress={() => navigation.navigate("uploadexam", { course})} style={{width:'50%'}}>
          <View>
            <Image 
              source={require("../../assets/icons/uploadfile.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50%'}}>
        <View>
            <Image 
              source={require("../../assets/icons/filter.png")}
              style={{marginTop:0,alignSelf:'flex-end'}}
            />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList style={styles.container}
        data={exams}
        numColumns={1}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({item})=>{

          return(
            <View style={[styles.filebox , {flexDirection:'row',justifyContent:'center'}]}>
              <TouchableOpacity onPress={() => { navigation.navigate('FileDetail', {item});}} style={{ flexDirection: 'row',width:'80%'}}>
                <Image source={require('../../assets/icons/file.png')} style={{marginTop:10}}/>
                <View >
                    <Text style={{fontSize: 18,marginTop: 5,marginLeft:20,color: '#0C2D57'}}>{item.Filename}</Text>
                </View>
              </TouchableOpacity>
              <View style={{width:'20%'}}>
                <TouchableOpacity  onPress={() => downloadExam(item.nameinstorage)}> 
                    <Image source={require('../../assets/icons/dowsload.png')}/> 
                </TouchableOpacity>
              </View>
            </View>
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

const fetchSheets = async (courseID) => {
  try {
    const sheet = await getAllSheets(courseID);
    return sheet;
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return [];
  }
};

const fetchExams = async (courseID) => {
  try {
    const sheet = await getAllExams(courseID);
    return sheet;
  } catch (error) {
    console.error("Error fetching sheets:", error);
    return [];
  }
};

const CourseDetailScreen = ({ route }) => {
  // Extract the course details from the route params
  const { course } = route.params;
  // Now you can access the course object
  const isFocused = useIsFocused();
  const [reviews, setreviews] = useState([]);
  const [sheets, setsheets] = useState([]);
  const [exams, setexams] = useState([]);
  
  useEffect(() => {
    const fetchAndUpdateState = async () => {
      const reviewsData = await fetchReviews(course.courseID);
      const sheetsData = await fetchSheets(course.courseID);
      const examsData = await fetchExams(course.courseID);
      setreviews(reviewsData);
      setsheets(sheetsData);
      setexams(examsData);
    };
    if (isFocused) {
      fetchAndUpdateState();
    }
  },[isFocused]);

  if(route.name == "reviews"){
    return (
      <Reviews course={course} reviews={reviews}/>
    );
  }else if (route.name == "sheets"){
    return (
      <Sheets course={course} sheets={sheets} />
    );
  }else{
    return (
      <Exam course={course} exams={exams}/>
    );
  }

};

export default CourseDetailScreen;
export { fetchReviews };

