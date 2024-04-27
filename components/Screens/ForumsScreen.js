import { View, Text, FlatList, TouchableOpacity,Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {TextInput, Button, Modal } from 'react-native';
import { styles } from '../../assets/styles/styles_coursedetail.js';

import {
  getAllForums, 
} from "../../firebase/firestoreForums.js";


function Forum( {post} ){
  
  const navigation = useNavigation();
  const post_data = post.field
  
  return(
    <View
      style={styles.postbox} >
      <TouchableOpacity onPress={() => { navigation.navigate('PostDetail',{post});}} style={{width:'100%'}}>
        <View style={{flexDirection:'row'}}>
          <Image source={require("../../assets/icons/profileBlue.png")}/>
          <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{post_data.author}</Text>
        </View>
        <Text style={styles.label}>{post_data.Description}</Text>
      </TouchableOpacity>
      <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
        <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
          <Image source={require("../../assets/icons/minilike.png")}/>
          <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{post_data.likeCount} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
          <Image source={require("../../assets/icons/minicomment.png")}/>
          <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
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
