import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const initialData = [{
  author: 'author1',
  title: 'title1',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cumsan nunc non efficitur gravida. Sed mattis",
  like: "10", //number of like
  comment: ["comment1","comment2","comment3"] //comment (maybe change it to idcomment for each comment)
}];

function Forum( {post} ){
  const navigation = useNavigation();
  
  //console.log(post)
  return(
    <TouchableOpacity onPress={() => navigation.navigate('PostDetail',{post})}>
      <View style={{backgroundColor:'#D6D6D6', marginBottom: 10}}>
        <Text>author: {post.author}</Text>
        <Text>title : {post.title}</Text>
        <Text>Description: {post.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default function Forums() {
  const [data, setData] = useState(initialData);

  const fetchMoreData = () => {
    const newData = [
      ...data,
      {
        author: `author${data.length + 2}`,
        title: `title${data.length + 2}`,
        description: `description${data.length + 2}`,
        like: "10", 
        comment: ["comment1","comment2","comment3"] 
      }
    ];
    setData(newData);
  };


  return (
    <View>
      <FlatList 
        data = {data}
        renderItem= {({item})=> <Forum post={item} />}
        keyExtractor= {(item, index) => index.toString()}
        onEndReached= {fetchMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}