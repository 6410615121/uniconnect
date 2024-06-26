import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { Alert } from 'react-native';
import { getDocumentAsync } from 'expo-document-picker';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {
    uploadexam,
    uploadExamToStorage
  } from "../../firebase/firestoreCourseDetail.js";

const UploadexamScreen = ({ route }) => {

    const { course } = route.params;
    const [Filename, setFilename] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigation();

    let result = [];

    const pickDocument = async () => {

      try {
        
        result = await getDocumentAsync({
          type: '*/*', // You can specify the MIME type of the documents you want to allow
        });
        
      } catch (error) {
        console.log('Error picking document:', error);
      }
    };
  
    const Post = async () => {
      if (!Filename.trim()) {
        Alert.alert('Filename cannot be empty');
        return;
      }
      if (result.length === 0){
        Alert.alert('select file');
        return;
      }
      else{
        
        if (! result.canceled ) {
          await uploadExamToStorage(result.assets[0].uri, result.assets[0].name)
        }
        const author = await AsyncStorage.getItem('name')
        const userID = await AsyncStorage.getItem('UID')
        await uploadexam(Filename,userID, author, course.courseID, description, result.assets[0].name)

        navigation.goBack();
      }
    }; 
  
    return (
      <View style={{backgroundColor:'#EFECEC',flexDirection:'column',height:'100%'}}>
        <View style={{height:'10%'}}>
          <TextInput
            style={{backgroundColor: "#FFF8E3", padding: 5,width:'80%',alignSelf:'center',marginTop:10,borderRadius:15}}
            maxLength={15}
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
          <View style={{ flexDirection: 'column',width:'90%',alignSelf:'center'}}>
            <View style={{marginBottom:10}}>
              <Button title="Select File" onPress={pickDocument} color={'#FFB0B0'} />
            </View>
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