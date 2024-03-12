import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style/styles_coursedetail.js';
import { TouchableOpacity,Image,FlatList} from 'react-native';
import {icons} from '../../style/icon.js'

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
          return(
              <TouchableOpacity style={styles.filebox} onPress={() => { navigation.navigate('FileDetail');  console.log("test download sucessfully")}}>
                <Text style={styles.label}>{sheetfile.item}</Text>  
                <View >
                  <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
                  <Image source={require('../../icon/download-icon.png')} 
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
          //console.log(examfile)
          //console.log(examfile.item)
          return(
              <TouchableOpacity style={styles.filebox} onPress={() => {navigation.navigate('FileDetail'); console.log("pop up detail file")}}>
                <Text style={styles.label}>{examfile.item}</Text>
                <View >
                  <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
                    <Image source={require('../../icon/download-icon.png')} 
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

/*{course((examfile,index) => (
  <TouchableOpacity key={`${course.id}_${index}`} style={styles.filebox} onPress={() => {console.log("test download sucessfully")}}>
  <View >
    <Text  style={styles.label}>{examfile}</Text>
    <TouchableOpacity  onPress={() => {console.log("test download sucessfully")}}> 
    <Text>download</Text>
  </TouchableOpacity>
  </View>
</TouchableOpacity>
)
}*/
