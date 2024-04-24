import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {TextInput, Button, Modal } from 'react-native';

import {
  getAllForums, 
  createPost
} from "../../firebase/firestoreForums.js";

const initialData = [{
  author: 'author1',
  title: 'title1',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cumsan nunc non efficitur gravida. Sed mattis",
  like: "10", //number of like
}];

function Forum( {post} ){
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail',{post})}>
      <View style={{backgroundColor:'#D6D6D6', marginBottom: 10}}>
        <Text>author: {post.author}</Text>
        <Text>title : {post.title}</Text>
        <Text>Description: {post.Description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Forums() {

  const [data, setData] = useState([]);
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
  const [post, setpost] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleTextInputPress = () => {
    setIsPopupOpen(true);
  };

  return (
    <View>
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 10 }}>
        <TextInput
          style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
          placeholder="Post"
          onChangeText={(text) => {
            setpost(text);
          }}
          onFocus={handleTextInputPress} // Open popup when TextInput is focused
          onTouchStart={handleTextInputPress} // Open popup when TextInput is pressed
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Forum post={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.2}
      />
      <Modal
        visible={isPopupOpen}
        transparent={true}
        animationType="slide"
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{  padding: 20, borderRadius: 10 }}>
            {/* Add your popup screen content */}
            <Button title="test post" onPress={() => {setIsPopupOpen(false);createPost();fetchData();}} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
