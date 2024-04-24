import React from "react";
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, TouchableOpacity} from 'react-native';
import { styles } from '../../assets/styles/styles_home.js';

function CarouselNews(){
  const width = Dimensions.get('window').width*0.8;

  return (
      <View>
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

function Feeds(){
  const data = new Array(50).fill("popular");//test
  return( 
    <View>
        <FlatList 
          data = {data}
          renderItem= {({item}) => {return(
            <TouchableOpacity>
              <Text>
                {item}
              </Text>
            </TouchableOpacity>
          )}}
        />
    </View>
  );
}


export default function HomeScreen() {
  return(
    <View style={{flexDirection: "column", height:'100%', backgroundColor:'gray', justifyContent:'space-evenly', alignItems:'center'}}>
      <View style={{backgroundColor: 'blue'}}>
        <Text>News</Text>
        <CarouselNews />
      </View>
      
      <View style={{backgroundColor:'red', height:'50%',width:'80%', overflow:'hidden'}}>
        <Text>Popular</Text>
        <Feeds/>
      </View>
    </View>
  );
}
