import  React,{ useState, useEffect }from "react";
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, TouchableOpacity} from 'react-native';
import { styles } from '../../assets/styles/styles_home.js';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import {
  getAllForums, 
} from "../../firebase/firestoreForums.js";


function CarouselNews(){
  const width = Dimensions.get('window').width*0.8;

  return (
      <View style={{alignItems: 'center'}}>
          <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={[...new Array(6).keys()]}
              scrollAnimationDuration={1000}
              renderItem={({ index }) => (
                  <View
                      style={{
                          flex: 1,
                          borderWidth: 1,
                          justifyContent: 'center',
                      }}
                  >
                      <Text style={{ textAlign: 'center', fontSize: 30 }}>
                          {index}
                      </Text>
                  </View>
              )}
          />
      </View>
  );
}

function Feeds({feeds}){
  
  const extractedFeeds = feeds.map((feed) => ({
    reviewID: feed.id,
    author: feed.field.author,
    Description: feed.field.Description,
    likeCount: feed.field.likeCount,
  }));
  const navigation = useNavigation();

  return( 
    <View style={styles.container}>
      <View>
      <FlatList 
        data = {extractedFeeds}
        renderItem= {({item}) => {

          return(
          <TouchableOpacity style ={styles.popularpostbox} 
          onPress={() => navigation.navigate('PostDetail',{post:{field:{author:item.author,Description:item.Description,likeCount:item.likeCount},id:item.reviewID}})}>
              <Text>{item.author}</Text>
              <Text>{item.Description}</Text>
              <Text>like {item.likeCount}</Text>
          </TouchableOpacity>
        )}}
      />
      </View>
    </View>
  );
}


export default function HomeScreen() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const fetchData = async () => {
    try {
      const forumsData = await getAllForums();
      setData(forumsData);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };
  useEffect(() => {
    if (isFocused){
      fetchData();
    }
  }, [isFocused]);
  
  return(
    <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", padding: '1%'}}>
      <View>
        <Text>News</Text>
        <CarouselNews />
      </View>
      
      <View>
        <Text>Popular</Text>
        <Feeds feeds={data}/>
      </View>
    </View>
  );
}
