import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { Alert } from 'react-native';


import {
    uploadexam,
  
  } from "../../firebase/firestoreCourseDetail.js";

const UploadexamScreen = ({ route }) => {

    const { course } = route.params;
    const [Filename, setFilename] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
  
    const Post = async () => {
      if (!Filename.trim()) {
        Alert.alert('Filename cannot be empty');
        return;
      }else{
        await uploadexam(Filename,course.courseID, description)
      
        navigation.goBack();
      }
    }; 
  
    return (
      <View style={{backgroundColor:'#EFECEC',flexDirection:'column',height:'100%'}}>
        <View style={{height:'10%'}}>
          <TextInput
            style={{backgroundColor: "#FFF8E3", padding: 5,width:'80%',alignSelf:'center',marginTop:10,borderRadius:15}}
            placeholder="Enter Filename"
            onChangeText={(text) => {
              setFilename(text);
            }}
          />
        </View>
        <View style={{height:'70%'}}>
          <TextInput
            
            multiline
            numberOfLines={10}
            style={{ padding: 10, width: "100%",color:'#0C2D57'}}
            placeholder="Enter Description"
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
        <View style={{height:'20%'}}>
          <View style={{ flexDirection: 'column',backgroundColor:'#FFB0B0',width:'90%',alignSelf:'center'}}>
              <Button title="Upload" onPress={Post} color={'#FFB0B0'} />
          </View>
        </View>
  
        
      </View>
      // <View>
      //   <View style={{ flexDirection: 'row',justifyContent: 'flex-end',marginRight:20,marginTop:10}}>
      //       <Button title="Upload" onPress={Post} />
      //   </View>
      //   <TextInput
      //     style={{backgroundColor: "#C7C7C7", padding: 5, width: "100%" ,}}
          
      //     placeholder="Enter Filename"
      //     onChangeText={(text) => {
      //       setFilename(text);
      //     }}
      //   />

      //   <TextInput
      //     style={{ padding: 5, width: "100%" ,height:"50%"}}
      //     placeholder="Enter Description"
      //     onChangeText={(text) => {
      //       setDescription(text);
      //     }}
      //   />
  
        
      // </View>
    );
  };
  
export default UploadexamScreen;