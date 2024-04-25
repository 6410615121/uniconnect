import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList} from 'react-native';
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import {
  Createcomment, 
  getAllCommentForum,
} from "../../firebase/firestoreForums.js";

const fetchComments = async (IDPost) => {
  try {
    const comment = await getAllCommentForum(IDPost);
    return comment;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

const PostDetailScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const {post} = route.params;
  
  post_data = post.field;
  const [comment, setcomment] = useState("");
  const [comobject, setcomobject] = useState([]);
  useEffect(() => {
    const fetchAndUpdateState = async () => {
      const commentdata = await fetchComments(post.id);
      setcomobject(commentdata);
    };
    if (isFocused) {
    fetchAndUpdateState();
    }
  },[isFocused]);
  const navigation = useNavigation();
  
  const handleTextInputPress = () => {
    
    navigation.navigate('ForumReview',(post.id));
    
  };
  
  return(
      <View style={styles.container}>
        <View style={styles.postbox}>
          <Text>{post_data.author}</Text>
          <Text>{post_data.Description}</Text>
          <Text>{post_data.likeCount}</Text>
        </View>
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


export default PostDetailScreen;