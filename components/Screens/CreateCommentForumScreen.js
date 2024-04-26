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
      <View style={{backgroundColor:'#EFECEC',flexDirection:'column',height:'100%'}}>
        <View style={{height:'80%'}}>
          <TextInput
            multiline
            numberOfLines={10}
            style={{ padding: 10, width: "100%",color:'#0C2D57'}}
            placeholder="Enter comment"
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
        </View>
        <View style={{height:'20%'}}>
          <View style={{ flexDirection: 'column',backgroundColor:'#FFB0B0',width:'90%',alignSelf:'center'}}>
              <Button title="Comment" onPress={comment} color={'#FFB0B0'} />
          </View>
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
  
export default CreateCommentForumScreen;