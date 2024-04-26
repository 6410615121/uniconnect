import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { styles } from '../../assets/styles//styles_post.js';
import { FlatList} from 'react-native';


import {

    createPost
} from "../../firebase/firestoreForums.js";

const CreateForumScreen = ({ route }) => {

    
    const [description, setDescription] = useState("description");
    const navigation = useNavigation();
  
    const Post = async () => {
      await createPost(description); //test
      
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
      // <View>
      //   <View style={{ flexDirection: 'row',justifyContent: 'flex-end',marginRight:20,marginTop:10}}>
      //       <Button title="Post" onPress={Post} />
      //   </View>
        
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
  
export default CreateForumScreen;