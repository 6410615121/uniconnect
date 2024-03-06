import React from "react";
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


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

function Feeds(){
  return( 
    <View style={{backgroundColor:'gray',width: '80%', height: 300, alignSelf: 'center', marginBottom:30}}>
      <Text></Text>
    </View>
  );
}


export default function HomeScreen() {
  return(
    <View style={{flex: 1, flexDirection: "column", justifyContent: "space-between", padding: '1%'}}>
      <View>
        <Text>News</Text>
        <CarouselNews />
      </View>
      
      <View>
        <Text>Popular</Text>
        <Feeds/>
      </View>
    </View>
  );
}

