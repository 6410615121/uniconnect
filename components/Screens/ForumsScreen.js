import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react';

const initialData = [{
  author: 'author1',
  title: 'title1',
  description: 'description1'
}];

function Forum({ item }){
  return(
    <View style={{backgroundColor:'#D6D6D6', marginBottom: 10}}>
      <Text>author: {item.author}</Text>
      <Text>title : {item.title}</Text>
      <Text>Description: {item.description}</Text>
    </View>
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
        description: `description${data.length + 2}`
      }
    ];
    setData(newData);
  };


  return (
    <View>
      <FlatList 
        data = {data}
        renderItem= {({item})=> <Forum item={item} />}
        keyExtractor= {(item, index) => index.toString()}
        onEndReached= {fetchMoreData}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}