import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {TextInput, Button, Modal } from 'react-native';
import { styles } from '../../assets/styles/styles_coursedetail.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAllForums, 
  favPost,
  unfavPost,
  getfavPost,
  getFavPostIdListByUserUID,
} from "../../firebase/firestoreForums.js";


function Forum( {post} ){
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.field.likeCount);
  const navigation = useNavigation();

  const like= async (postID) => {
    const userID = await AsyncStorage.getItem('UID')
    await favPost(userID, postID)
    console.log("liked! post: ", postID)
    setIsLiked(true);

    const like = likeCount + 1;
    setLikeCount(like);
  }; 

  const unlike = async (postID) => {
    const userID = await AsyncStorage.getItem('UID')
    await unfavPost(userID, postID)
    
    console.log("unliked! post: ", postID)
    setIsLiked(false);
    const like = likeCount - 1;
    setLikeCount(like);
  }; 

  const handleLikeButtonPress = async (postID) => {
    if(!isLiked){
      await like(postID);
    }else{
      await unlike(postID);
    }
  }
  
  return(
    <View
      style={styles.postbox} >
      <TouchableOpacity onPress={() => { navigation.navigate('PostDetail',{post});}} style={{width:'100%'}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require("../../assets/icons/profileBlue.png")}/>
          <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{post.field.author}</Text>
        </View>
        <Text style={styles.label}>{post.field.Description}</Text>
      </TouchableOpacity>
      <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
        <TouchableOpacity 
          onPress={() => { handleLikeButtonPress(post.id)}}
          style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>

          {isLiked ? <Image source={require("../../assets/icons/minilike.png")} /> : <Text>ยังไม่กด</Text>}
          
          <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{likeCount} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => { navigation.navigate('PostDetail',{post});}} style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
          <Image source={require("../../assets/icons/minicomment.png")}/>
          <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{post.field.commentcounts} Comments</Text>
        </TouchableOpacity>
      </View>  
    </View>
  )
}

export default function Forums() {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const forumsData = await getAllForums();
      const userUID = await AsyncStorage.getItem("UID") 
      const favPostIDList = await getFavPostIdListByUserUID(userUID)
      // console.log(favPostIDList)

      // Mark each forum isLiked?
      forumsData.forEach(
        (forum) => {
          forum.isLiked = favPostIDList.includes(forum.id)
        }
      )
      // forumsData.forEach((forum) => console.log(forum))

      setData(forumsData);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  

  
  const handleTextInputPress = () => {

    navigation.navigate('createForum');
  };

  return (
    <View>
      <View style={{ flexDirection: 'row',justifyContent: 'center',marginTop:20,marginBottom:20,backgroundColor:'#EFECEC'}}>
        <TextInput
          style={{ paddingLeft:10,backgroundColor: "#FFF8E3", padding: 5, width: '70%',borderWidth:1,borderTopLeftRadius:15,borderBottomLeftRadius:15 }}
          placeholder="Post"
          
          onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
        />
        
        <Button title="Post" onPress={handleTextInputPress} color={'#0C2D57'} />
        
      </View>
      <FlatList
        // style={{flexGrow:1}}
        contentContainerStyle={{paddingBottom:100}}
        data={data}
        renderItem={({ item }) => <Forum post={item} />}
        onEndReachedThreshold={0.3}
      />
      
    </View>
  );
};
