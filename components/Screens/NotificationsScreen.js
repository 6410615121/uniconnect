import { View, Text, TouchableOpacity,FlatList, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';;
import {
  getnotify
} from "../../firebase/firebasenotify.js";


export default function NotificationsScreen() {
  //const list = new Array(20).fill({text:"Notification Text", date:"26-4-2024", hasBeenClicked:false, category:"reply"});
  const isFocused = useIsFocused();
  const [list, setData] = useState([]);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      const userID = await AsyncStorage.getItem('UID')
      
      const Data = await getnotify(userID);
      setData(Data);
    } catch (error) {
      console.error("Error fetching notify:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
  <View 
    // style={{ alignItems: "center"}}
  >
    <FlatList
      style={{width:'100%', backgroundColor:'#F2F2F2'}}
      // contentContainerStyle={}
      data={list}
      renderItem={({item}) => 
        
        <Notification item={item} />
      }
     />
  </View>
);
}

const Notification = ({item}) => {
  
  return (
    <View style={{alignItems:'center'}}>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFF8E3",
          width: "100%",
          height: "auto",
          minHeight: 50,
          padding: 20,
          // marginBottom:3,
          borderWidth:0.2
        }}
      >
        <View style={{flexDirection:"row", justifyContent:'space-between'}}>
          <View style={{flexDirection:"row",gap:20}}>
            {
              item.category === "reply" && (
                <Image
                source={require("../../assets/icons/lets-icons--chat-alt-fill.png")} // path to image
                style={{width:40,height:40, alignSelf:'center'}}
                />
              )
            }

            <View>
              <Text style={{ fontSize: 20 ,fontWeight:'bold', color:'#00294D'}}>{item.from}</Text>
              <Text style={{ fontSize: 20 ,fontWeight:'bold', color:'#00294D'}}>{item.Description}</Text>
              <Text style={{ fontSize: 20 ,fontWeight:'bold', color:'#00294D'}}>{item.date}</Text>
            </View>
          </View>

          {!item.hasBeenClicked ? <Dot></Dot>: null}
          
        </View>

      </TouchableOpacity>
    </View>
  );
};

const Dot = () => <View style={{backgroundColor:'blue', width:15, height:15, borderRadius:10, alignSelf:'center'}}></View>
