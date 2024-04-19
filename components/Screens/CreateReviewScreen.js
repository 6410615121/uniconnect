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
      <View>
        <View style={{ flexDirection: 'row',justifyContent: 'flex-end',marginRight:20,marginTop:10}}>
            <Button title="Post" onPress={Post} />
        </View>
        
        <TextInput
          style={{ padding: 5, width: "100%" ,height:"50%"}}
          placeholder="Enter Description"
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
  
        
      </View>
    );
  };
  
export default CreateReviewScreen;