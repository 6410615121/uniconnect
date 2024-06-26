import  React,{ useState, useEffect }from "react";
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { FlatList, TouchableOpacity, Image} from 'react-native';
import { styles } from '../../assets/styles/styles_home.js';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

import {
  getAllForums, 
} from "../../firebase/firestoreForums.js";


function CarouselNews(){
  const paths = [
    "https://tu.ac.th/uploads/news-tu/banner/banner64/bg64-03.jpg",
    "https://tu.ac.th/uploads/news-tu/news/2567/apr/67-396.jpg",
    "https://tu.ac.th/uploads/news-tu/banner/banner64/bg64-04.jpg"
  ];
  const width = Dimensions.get('window').width*0.8;

  return (
      <View style={{borderRadius: 20}}>
          <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={paths}
              scrollAnimationDuration={1000}
              renderItem={({item}) => {
                // console.log(item)
                // var image = require(item)
                return (
                  <View
                    style={{
                        flex: 1,
                        borderRadius: 20,
                        justifyContent: 'center',
                        backgroundColor: '#FFF8E3', //test color
                        // backgroundColor:'red'
                    }}
                  >
                    <Image source={{uri: item}} style={{width: width, height: width / 2}} />
                </View>
                )
              }}
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
    commentcounts:feed.field.commentcounts,
  }));
  const navigation = useNavigation();

  return( 
    
    <View>
      <FlatList 
        data = {extractedFeeds}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem= {({item}) => {return(
          <TouchableOpacity
          onPress={() => navigation.navigate('PostDetail',{post:{field:{author:item.author,Description:item.Description,likeCount:item.likeCount},id:item.reviewID}})}>
            <View style={{flexDirection:'row', padding:10, backgroundColor:"#EFECEC", alignSelf:'center', justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require("../../assets/icons/Vector.png")} style={{marginRight:10, height:42, width:42}}/>
              <View style={{flexDirection:"column", flex:1, backgroundColor:'#FFF8E3', marginLeft:"0.1%", padding:10, borderRadius: 15, width:"80%",borderWidth:1}} >
                <Text style={{fontSize:18,color:'#0C2D57',fontWeight:'bold'}}>{item.author}</Text>
                <Text style={{fontSize:18,color:'#0C2D57'}}>{item.Description}</Text>
                <Text></Text>
                <Text style={{fontSize:12, color:'#FC6736'}}>     {item.likeCount} Likes                              {item.commentcounts} Comments</Text>
              </View> 
              <Text style={{backgroundColor:"#EFECEC"}}></Text>
{/* 
              <Text style={{backgroundColor:'#FFF8E3', marginLeft:"0.1%", padding:10, borderRadius: 15, width:"80%"}} >
                {item.Description}
              </Text>

              <Text style={{backgroundColor:'#FFF8E3', marginLeft:"0.1%", padding:10, borderRadius: 15, width:"80%"}} >
                like {item.likeCount}
              </Text> */}
            </View>
          </TouchableOpacity>
        )}}
      />
      
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
    <View style={{flexDirection: "column", height:'100%', backgroundColor:'#EFECEC', justifyContent:'space-evenly' , alignItems:'center'}}>
      <View style={{backgroundColor:"#EFECEC"}}>
        <Text style={{fontWeight:"bold", fontSize:24, padding:"3%", marginLeft:"3%",color:'#0C2D57'}}>News</Text>
        <CarouselNews />
      </View>
      
      <View style={{backgroundColor:'#EFECEC', height:'50%',width:'80%', overflow:'hidden'}}>
        <Text style={{fontWeight:"bold", fontSize:24, padding:"3%", marginLeft:"3%",color:'#0C2D57'}}>Trending</Text>
        <Feeds feeds={data}/>
      </View>
    </View>
  );
}
