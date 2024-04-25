import { View, Text, StyleSheet, Button ,Image} from 'react-native';
import { useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from "react";
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";
import { FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Createcomment,
  getAllComment
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

    const navigation = useNavigation();
    useEffect(() => {
      const fetchAndUpdateState = async () => {
        const commentdata = await fetchComments(item.CourseID, item.reviewID);
        setcomobject(commentdata);
      };
      fetchAndUpdateState();
      
    },[]);
    //console.log(comobject);



    const handleTextInputPress = () => {
      
      navigation.navigate('CommentReview',{item});
      
    };


    return(
      <View style={styles.container}>

        <View style={styles.postbox}>
          <View style={{flexDirection:'row'}}>
            <Image source={require("../../assets/icons/profileBlue.png")} />
            <Text style={{fontSize: 18,marginTop: 5,marginLeft:50,marginRight: 50, color: '#0C2D57',}}>author</Text>
          </View>
          <Text>{item.Description}</Text>
          <Text>{item.likeCount}</Text>
        </View>

        {/* creating comment */}
        <View style={{ flexDirection: 'row', marginTop:10}}>
          <TextInput
            style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200}}
            placeholder="comments"
            onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
          />
          <Button
            title="comment"
            onPress={handleTextInputPress}/>    
        </View>
      
        {/* comment post */}
        <FlatList 
          
          data={comobject}
          numColumns={1}
          renderItem={({item})=>{ 
            return(
              <View style={styles.commentbox}>
                <Text style={styles.label}>{item.Author}</Text>  
                <Text style={styles.label}>{item.comment}</Text>  
              </View>
            )
        }}
        />
        
      </View>
    );
}


export default ReviewDetailScreen;