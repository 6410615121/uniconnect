import { View, Text, StyleSheet, Button,Image,ScrollView,TouchableOpacity} from 'react-native';
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
          <View style={{flexDirection:'column'}}>
            <View style={{height:'80%'}}>
              <View style={{flexDirection:'row'}}>
                <Image source={require("../../assets/icons/profileBlue.png")} />
                <Text style={{fontSize: 18,fontWeight:'bold',marginTop: 5,marginLeft:10, color: '#0C2D57',}}>{post_data.Author}</Text>
              </View>
              <ScrollView style={{height:'40%'}}>
                <View><Text style={{fontSize:15, color:'#0C2D57',marginLeft:50,marginRight:50}}>{post_data.Description}</Text></View>
              </ScrollView>
            </View>
            <View style={{height:'20%'}}>
              <Text style={{fontSize:10, color:'#FC6736',textAlign:'right',marginRight:30}}>{post_data.likeCount} Likes</Text>
            </View>
          </View>
        </View>

        {/* creating comment */}
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity>
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
      // <View style={styles.container}>
      //   <View style={styles.postbox}>
      //     <Text>{post_data.author}</Text>
      //     <Text>{post_data.Description}</Text>
      //     <Text>{post_data.likeCount}</Text>
      //   </View>
      //    <View style={{ flexDirection: 'row', marginTop:10}}>
      //     <TextInput
      //       style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200}}
      //       placeholder="comments"
      //       onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
      //     />
      //     <Button
      //       title="comment"
      //       onPress={handleTextInputPress}/>    
      //   </View> 

      //   {/* comment post */}
      //   <FlatList 
          
      //     data={comobject}
      //     numColumns={1}
          
      //     renderItem={({item})=>{ 
      //       return(
      //         <View style={styles.commentbox}>
      //           <Text style={styles.label}>{item.Author}</Text>  
      //           <Text style={styles.label}>{item.comment}</Text>  
      //         </View>
      //       )
      //   }}
      //   />
      
      // </View>
    );
  }


export default PostDetailScreen;