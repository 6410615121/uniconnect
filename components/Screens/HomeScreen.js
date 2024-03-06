import React from "react";
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';



export default function HomeScreen() {
  const width = Dimensions.get('window').width*0.8;

  return (
      <View style={{ flex: 1 , alignItems: 'center'}}>
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
