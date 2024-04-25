import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { FlatList} from 'react-native';


import {
    createReviews,
  
  } from "../../firebase/firestoreCourseDetail.js";

const CreateReviewScreen = ({ route }) => {

    const { course} = route.params;
    const [description, setDescription] = useState("description");
    const navigation = useNavigation();
  
    const Post = async () => {
      await createReviews(course.courseID, description); //test
      
      navigation.goBack();

    };
  
    return (
      <View style={{backgroundColor:'#EFECEC',flexDirection:'column',height:'100%'}}>
        <View style={{height:'80%'}}>
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
              <Button title="Post" onPress={Post} color={'#FFB0B0'} />
          </View>
        </View>
      </View>
    );
  };
  
export default CreateReviewScreen;