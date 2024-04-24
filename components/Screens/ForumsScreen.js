import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {TextInput, Button, Modal } from 'react-native';

import {
  getAllForums, 
} from "../../firebase/firestoreForums.js";


function Forum( {post} ){
  console.log(post)
  const navigation = useNavigation();
  const post_data = post.field
  
  return(
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail',{post})}>
      <View style={{backgroundColor:'#D6D6D6', marginBottom: 10}}>
        <Text>{post_data.author}</Text>
        <Text>{post_data.Description}</Text>
        <Text>{post_data.likeCount}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Forums() {

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

    fetchData();
  }, []);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const handleTextInputPress = () => {
    setIsPopupOpen(true);
    navigation.navigate('createForum');
    fetchData();
  };

  return (
    <View>
      <View style={{ flexDirection: 'row',justifyContent: 'center',marginTop:10,marginBottom:20}}>
        <TextInput
          style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
          placeholder="Post"
          
          onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
        />
        
        <Button title="Post" onPress={handleTextInputPress} />
        
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Forum post={item} />}
        onEndReachedThreshold={0.3}
      />
      
    </View>
  );
};
