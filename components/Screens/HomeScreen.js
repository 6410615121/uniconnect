import React from "react";
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, TouchableOpacity, Image} from 'react-native';
import { styles } from '../../assets/styles/styles_home.js';

function CarouselNews(){
  const width = Dimensions.get('window').width*0.8;

  return (
      <View style={{borderRadius: 20}}>
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
                          borderRadius: 20,
                          justifyContent: 'center',
                          backgroundColor: '#FFF8E3', //test color
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
  const data = new Array(50).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed");//test
  return( 
    <View>
        <FlatList 
          data = {data}
          renderItem= {({item}) => {return(
            <TouchableOpacity>
              <View style={{flexDirection:'row', padding:10, backgroundColor:"#EFECEC", alignSelf:'center', justifyContent: 'center', alignItems: 'center',borderBottomWidth:2, borderBlockColor:"#0C2D57"}}>
                <Image source={require("../../assets/icons/Vector.png")} style={{marginRight:10, height:42, width:42}}/>
                <Text style={{backgroundColor:'#FFF8E3', marginLeft:"0.1%", padding:10, borderRadius: 15, width:"80%"}} >
                  {item}
                </Text>
              </View>
              
            </TouchableOpacity>
          )}}
        />
    </View>
  );
}


export default function HomeScreen() {
  return(
    <View style={{flexDirection: "column", height:'100%', backgroundColor:'#EFECEC', justifyContent:'space-evenly' , alignItems:'center'}}>
      <View style={{backgroundColor:"#EFECEC"}}>
        <Text style={{fontWeight:"bold", fontSize:24, padding:"3%", marginLeft:"3%"}}>News</Text>
        <CarouselNews />
      </View>
      
      <View style={{backgroundColor:'#EFECEC', height:'50%',width:'80%', overflow:'hidden'}}>
        <Text style={{fontWeight:"bold", fontSize:24, padding:"3%", marginLeft:"3%"}}>Trending</Text>
        <Feeds/>
      </View>
    </View>
  );
}
