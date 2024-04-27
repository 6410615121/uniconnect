import { View, Text, StyleSheet, Button ,Image, TouchableOpacity} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from "react";
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";
import { FlatList, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Createcomment,
  getAllComment,
  favReview,
} from "../../firebase/firestoreCourseDetail.js";

const fetchComments = async (CourseID, reviewID) => {
  try {
    const comment = await getAllComment(CourseID, reviewID);
    return comment;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const ReviewDetailScreen = ({ route }) => {
    const { item } = route.params;
    const [comment, setcomment] = useState("");
    const [comobject, setcomobject] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    useEffect(() => {
      const fetchAndUpdateState = async () => {
        const commentdata = await fetchComments(item.CourseID, item.reviewID);
        setcomobject(commentdata);
      };
      if (isFocused) {
        fetchAndUpdateState();
        }
    },[isFocused]);
    console.log(comobject);

    const like= async (CourseID, postID) => {
      const userID = await AsyncStorage.getItem('UID')
      await favReview(userID, CourseID, postID)
      
    }; 


    const handleTextInputPress = () => {
      
      navigation.navigate('CommentReview',{item});
      
    };


    return(
      <View style={styles.container}>
        <View style={styles.postbox}>
          <View style={{flexDirection:'column'}}>
            <View style={{height:'80%'}}>
              <View style={{flexDirection:'row'}}>
                <Image source={require("../../assets/icons/profileBlue.png")} />
                <Text style={{fontSize: 18,fontWeight:'bold',marginTop: 5,marginLeft:10, color: '#0C2D57',}}>{item.Author}</Text>
              </View>
              <ScrollView style={{height:'40%'}}>
                <View><Text style={{fontSize:15, color:'#0C2D57',marginLeft:50,marginRight:50}}>{item.Description}</Text></View>
              </ScrollView>
            </View>
            <View style={{height:'20%'}}>
              <Text style={{fontSize:10, color:'#FC6736',textAlign:'right',marginRight:30}}>{item.likeCount} Likes</Text>
            </View>
          </View>
        </View>

        {/* creating comment */}
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => { like(item.CourseID, item.reviewID)}}  >   
            <Image source={require('../../assets/icons/like.png')} style={{height:30,width:30,marginRight:10}}/>
          </TouchableOpacity>
          <TextInput
            style={{paddingLeft:10, backgroundColor: "#FFF8E3", padding: 5, width:200,borderBottomLeftRadius:15,borderTopLeftRadius:15,borderWidth:1}}
            placeholder="comments"
            onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
          />
          <Button
            title="comment"
            onPress={handleTextInputPress}
            color='#0C2D57'
            
            />    
        </View>
      
        {/* comment post */}
        <FlatList 
          
          data={comobject}
          numColumns={1}
          renderItem={({item})=>{ 
            return(
              <View style={styles.commentbox}>
                <Image source={require("../../assets/icons/profileBlue.png")} />
                <View style={{flexDirection:'column'}}>
                  <Text style={{fontSize:18,marginLeft:10,fontWeight:'bold',color:'#0C2D57'}}>{item.Author}</Text>  
                  <Text style={{fontSize:15,marginLeft:10,color:'#0C2D57',marginRight:40}}>{item.comment}</Text>  
                </View>
              </View>
            )
        }}
        />
        
      </View>
    );
}


export default ReviewDetailScreen;