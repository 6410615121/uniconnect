import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { Alert } from 'react-native';

import {
    Createcomment,
  } from "../../firebase/firestoreCourseDetail.js";


const CreateCommentReviewScreen = ({ route }) => {

    data = route.params.item;
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
  
    const comment = async () => {
      
      await Createcomment(data.CourseID, data.reviewID, description)
      
      navigation.goBack();
      
    }; 
  
    return (
    <View style={{backgroundColor:'#EFECEC',flexDirection:'column',height:'100%'}}>
      <TextInput
        multiline
        numberOfLines={10}
        style={{ padding: 10, width: "100%",height:"80%",color:'#0C2D57'}}
        placeholder="Enter Description"
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <View style={{ flexDirection: 'column',backgroundColor:'#FFB0B0',width:'90%',alignSelf:'center'}}>
          <Button title="Comment" onPress={comment} color={'#FFB0B0'} />
      </View>
    </View>

      // <View>
      //   <View style={{ flexDirection: 'row',justifyContent: 'flex-end',marginRight:20,marginTop:10}}>
      //       <Button title="comment" onPress={comment} />
      //   </View>
        

      //   <TextInput
      //     style={{ padding: 5, width: "100%" ,height:"50%"}}
      //     placeholder="Enter comment"
      //     onChangeText={(text) => {
      //       setDescription(text);
      //     }}
      //   />
  
        
      // </View>
    );
  };
  
export default CreateCommentReviewScreen;