import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { Alert } from 'react-native';

import {
    Createcomment, 
  } from "../../firebase/firestoreForums.js";


const CreateCommentForumScreen = ({ route }) => {

    IDPost = route.params;
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
    
    const comment = async () => {
      
      await Createcomment(IDPost, description)
      
      navigation.goBack();
      
    }; 
  
    return (
      <View>
        <View style={{ flexDirection: 'row',justifyContent: 'flex-end',marginRight:20,marginTop:10}}>
            <Button title="comment" onPress={comment} />
        </View>
        

        <TextInput
          style={{ padding: 5, width: "100%" ,height:"50%"}}
          placeholder="Enter comment"
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
  
        
      </View>
    );
  };
  
export default CreateCommentForumScreen;