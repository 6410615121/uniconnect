import { View, Text, StyleSheet, Button,Image,ScrollView,TouchableOpacity} from 'react-native';
import { FlatList} from 'react-native';
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Createcomment, 
  getAllCommentForum,
  favPost,
  unfavPost,
  delPost,
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

  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post_data.likeCount);

  useEffect(() => {
    const fetchAndUpdateState = async () => {
      const commentdata = await fetchComments(post.id);
      const userID = await AsyncStorage.getItem('UID')
      setid(userID);
      setcomobject(commentdata);
    };
    if (isFocused) {
    fetchAndUpdateState();
    }
  },[isFocused]);
  const navigation = useNavigation();
  const [id, setid] = useState("");
  const handleTextInputPress = () => {
    
    navigation.navigate('ForumReview',(post.id));
    
  };

  const like= async (postID) => {
    const userID = await AsyncStorage.getItem('UID')
    await favPost(userID, postID)
    setIsLiked(true);
    post.isLiked = true;

    const like = likeCount + 1;
    setLikeCount(like)
    post.field.likeCount = like
    console.log("like called on: ", postID)
  }; 

  const unlike= async (postID) => {
    const userID = await AsyncStorage.getItem('UID')
    await unfavPost(userID, postID)
    setIsLiked(false);
    post.isLiked = false;

    const like = likeCount - 1;
    post.field.likeCount = like
    setLikeCount(like)

    console.log("unlike called on: ", postID)
  }; 

  const handleLikeButtonPress = async (postID) =>{
    if(isLiked){
      await unlike(postID)
    }else{
      await like(postID)
    }
  }

  return(
    // <View style={{flexDirection:'row'}}>
    //   <View style={{width:'80%',flexDirection:'row'}}>
    //    <Image source={require("../../assets/icons/profileBlue.png")}/>
    //    <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{item.data.Author}</Text>
    //   </View>
    //   <View style={{width:'20%'}}><Text style={{textAlign:'center',color:'#FC6736',padding:10,backgroundColor:'#0C2D57',borderRadius:10}}>{item.data.CourseID}</Text></View>
    //   /View>

    <View style={styles.container}>
        <View style={styles.postbox}>
          <View style={{flexDirection:'column'}}>
            <View style={{height:'80%'}}>
              <View style={{flexDirection:'row'}}>
                <View style={{flexDirection:'row',width:'80%'}}>
                  <Image source={require("../../assets/icons/profileBlue.png")} />
                  <Text style={{fontSize: 18,fontWeight:'bold',marginTop: 5,marginLeft:10, color: '#0C2D57',}}>{post_data.author}</Text>
                </View>
                <View style={{width:'20%'}}>
                  {id === post_data.userID ? (
                  <TouchableOpacity onPress={() => { delPost(post.id); navigation.goBack(); }}>
                    <Text style={{textAlign:'center',color:'white',padding:5,backgroundColor:'red'}}>DELECT</Text>
                  </TouchableOpacity>
                ) : null}
                </View>
              </View>
              <ScrollView style={{height:'40%'}}>
                <View><Text style={{fontSize:15, color:'#0C2D57',marginLeft:50,marginRight:50}}>{post_data.Description}</Text></View>
              </ScrollView>
            </View>
            <View style={{height:'20%'}}>
              <Text style={{fontSize:10, color:'#FC6736',textAlign:'right',marginRight:30}}>{likeCount} Likes {post_data.commentcounts} Comments</Text>
            </View>
          </View>
        </View>

        {/* creating comment */}
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => { handleLikeButtonPress(post.id)}}>
            {isLiked? <Image source={require('../../assets/icons/like.png')} style={{height:30,width:30,marginRight:10}}/>: <Image style={{height:30,width:30,marginRight:10}} source={require("../../assets/icons/unlike.png")} />  }

            
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