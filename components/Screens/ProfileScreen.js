import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState} from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";



import {
  getMyForums,
} from "../../firebase/firestoreForums.js";
import {
  getMyReviews
} from "../../firebase/firestoreCourseDetail.js";


export default function ProfileScreen({ setLoggedOut }) {
  const navigation = useNavigation();
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerTitleStyle: { color: "#FC6735", fontSize: 25 },
        headerStyle: { backgroundColor: "#002E57", shadowColor: "#002E57" },
        headerLeft: () => (
          <View>
            <CustomHeaderBackButton />
          </View>
        ),
      }}
    >
      <Stack.Screen name="ProfileScreen">
        {(props) => <ProfileMain {...props} setLoggedOut={setLoggedOut} />}
      </Stack.Screen>
      <Stack.Screen
        name="LikeScreen"
        component={LikeScreen}
        options={{ headerTitle: "Likes" }}
      />

      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{ headerTitle: "Posts" }}
      />

      <Stack.Screen
        name="MyCourseScreen"
        component={MyCourseScreen}
        options={{ headerTitle: "My Courses" }}
      />

      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{ headerTitle: "Contact Us" }}
      />
    </Stack.Navigator>
  );
}

const ProfileMain = ({ route, setLoggedOut }) => {
  const [name, setName] = useState("FirstName LastName")
  const navigation = useNavigation();

  useEffect(() => {
    const fetchName = async () => {
      try {
        const name = await AsyncStorage.getItem("name");
        setName(name);
        // console.log(name);
      } catch (error) {
        console.error("Cannot fetch name");
      }
    };
    fetchName();
  },[]);

  const handleLikesPress = () => {
    navigation.push("LikeScreen");
  };

  const handlePostsPress = () => {
    navigation.push("PostScreen");
  };

  const handleMyCoursePress = () => {
    navigation.push("MyCourseScreen");
  };

  const handleContactPress = () => {
    navigation.push("ContactScreen");
  };

  const Page = () => (
    <View style={{ backgroundColor: "#EFECEC", height: "100%", width: "100%" }}>
    <View
      style={{
        backgroundColor: "#0C2D57",
        height: "50%",
        borderBottomLeftRadius: 40,
        borderBottomEndRadius: 40,
        marginTop: 0,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Image
        source={require("../../assets/icons/profilePageicon.png")}
        style={{ alignSelf: "center", marginTop: 10 }}
      />
      <Text
        style={{
          color: "#FC6736",
          textAlign: "center",
          fontSize: 24,
          fontWeight: "bold",
          marginTop: 10,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          color: "#FFB0B0",
          textAlign: "center",
          fontSize: 12,
          fontWeight: "light",
        }}
      >
        Welcome to the UniConnect Application!
      </Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Image source={require("../../assets/icons/FBicon.png")} />
        <Text
          style={{
            color: "#FFB0B0",
            fontSize: 12,
            fontWeight: "light",
            marginLeft: 10,
          }}
        >
          xxxxxx xxxxxx
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Image source={require("../../assets/icons/Lineicon.png")} />
        <Text
          style={{
            color: "#FFB0B0",
            fontSize: 12,
            fontWeight: "light",
            marginLeft: 10,
          }}
        >
          xxxxxx xxxxxx
        </Text>
      </View>

      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <Image source={require("../../assets/icons/IGicon.png")} />
        <Text
          style={{
            color: "#FFB0B0",
            fontSize: 12,
            fontWeight: "light",
            marginLeft: 10,
          }}
        >
          xxxxxx xxxxxx
        </Text>
      </View>
    </View>

    <View style={{ marginTop: -90 }}>
      <TouchableHighlight
        style={{
          backgroundColor: "#FFF8E3",
          height: 60,
          width: "90%",
          alignSelf: "center",
          padding: 20,
          paddingTop: 15,
          borderBottomWidth: 2,
          borderTopLeftRadius: 15,
          borderTopEndRadius: 15,
        }}
        onPress={handleLikesPress}
        underlayColor="#FFDEA2"
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <Image
              source={require("../../assets/icons/likeIcon.png")}
              style={{ height: 30, width: 30 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#0C2D57",
              }}
            >
              Likes
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              source={require("../../assets/icons/cirAir.png")}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          backgroundColor: "#FFF8E3",
          height: 60,
          width: "90%",
          alignSelf: "center",
          padding: 20,
          paddingTop: 15,
          borderBottomWidth: 2,
        }}
        onPress={handlePostsPress}
        underlayColor="#FFDEA2"
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <Image
              source={require("../../assets/icons/postIcon.png")}
              style={{ height: 30, width: 30 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#0C2D57",
              }}
            >
              Posts
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              source={require("../../assets/icons/cirAir.png")}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          backgroundColor: "#FFF8E3",
          height: 60,
          width: "90%",
          alignSelf: "center",
          padding: 20,
          paddingTop: 15,
          borderBottomLeftRadius: 15,
          borderBottomEndRadius: 15,
        }}
        onPress={handleMyCoursePress}
        underlayColor="#FFDEA2"
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <Image
              source={require("../../assets/icons/courseIcon.png")}
              style={{ height: 30, width: 30 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#0C2D57",
              }}
            >
              My Courses
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              source={require("../../assets/icons/cirAir.png")}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>

    <View style={{ marginTop: 70 }}>
      <TouchableHighlight
        style={{
          backgroundColor: "#FFF8E3",
          height: 60,
          width: "90%",
          alignSelf: "center",
          padding: 20,
          paddingTop: 15,
          borderBottomWidth: 2,
          borderTopLeftRadius: 15,
          borderTopEndRadius: 15,
        }}
        onPress={handleContactPress}
        underlayColor="#FFDEA2"
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", width: "50%" }}>
            <Image
              source={require("../../assets/icons/contactUs.png")}
              style={{ height: 30, width: 30 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#0C2D57",
              }}
            >
              Contact Us
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Image
              source={require("../../assets/icons/cirAir.png")}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={{
          backgroundColor: "#FFF8E3",
          height: 60,
          width: "90%",
          alignSelf: "center",
          padding: 20,
          paddingTop: 15,
          borderBottomLeftRadius: 15,
          borderBottomEndRadius: 15,
        }}
        onPress={setLoggedOut}
        underlayColor="#FFDEA2"
      >
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <Image
            source={require("../../assets/icons/logout.png")}
            style={{ height: 30, width: 30 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              color: "#FC6736",
            }}
          >
            Logout
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  </View>
  )

  return (
    <Page />
  );



};

const CustomHeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/icons/fe_arrow-up.png")} // path to image
        style={{ width: 40, height: 40, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------- */
import { styles } from "../../assets/styles/styles_coursedetail";

const LikeScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const TopTabNavigator = createMaterialTopTabNavigator();
  
  const fetchData = async () => {
    try {
      const userID = await AsyncStorage.getItem('UID')
      //const forumsData = await getMyForums(userID);
      //setData(forumsData);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  // console.log()
  
  
  const ForumsScreen = () => {
    return (
      <View style={styles.postbox} >
                <TouchableOpacity 
                // onPress={() => { navigation.navigate("ReviewDetail", { item });}} 
                style={{width:'100%'}}>
                  <View style={{flexDirection:'row'}}>
                    <Image source={require("../../assets/icons/profileBlue.png")}/>
                    <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>Author</Text>
                  </View>
                  <Text style={styles.label}>Description</Text>
                </TouchableOpacity>
                  <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
                      <Image source={require("../../assets/icons/minilike.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
                      <Image source={require("../../assets/icons/minicomment.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
                    </TouchableOpacity>
                  </View>  
            </View>
    );
  };

  const ReviewScreen = () => {
    return (
       <View style={styles.postbox} >
                <TouchableOpacity 
                // onPress={() => { navigation.navigate("ReviewDetail", { item });}} 
                style={{width:'100%'}}>
                  <View style={{flexDirection:'row'}}>
                    <Image source={require("../../assets/icons/profileBlue.png")}/>
                    <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>Author</Text>
                  </View>
                  <Text style={styles.label}>Description</Text>
                </TouchableOpacity>
                  <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
                      <Image source={require("../../assets/icons/minilike.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
                      <Image source={require("../../assets/icons/minicomment.png")}/>
                      <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
                    </TouchableOpacity>
                  </View>  
            </View>
    );
  };

  return (
    <TopTabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor:"#FC6736",
        tabBarInactiveTintColor:"#EFECEC",
        backgroundColor: "#EFECEC",
        headerShown: true,
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#FFB0B0",
          marginTop: "5%",
          height: "7%",
          width: "90%",
          alignSelf: "center",
          borderRadius: 15,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#0C2D57",
          height: "100%",
          borderRadius: 15,
        },
      }}
    >
      <TopTabNavigator.Screen name="forums" component={ForumsScreen} />
      <TopTabNavigator.Screen name="reviews" component={ReviewScreen} />
    </TopTabNavigator.Navigator>
  );
};
/* -------------------------------------------------------------------------- */
const PostScreen = ({ route }) => {
  const TopTabNavigator = createMaterialTopTabNavigator();
  const isFocused = useIsFocused();
  const [postdata, setPost] = useState([]);
  const [reviewdata, setReview] = useState([]);
  const navigation = useNavigation();
  
  const fetchData = async () => {
    try {
      const userID = await AsyncStorage.getItem('UID')
      const forumsData = await getMyForums(userID);
      const reviewsData = await getMyReviews(userID);
      setPost(forumsData);
      setReview(reviewsData);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  //console.log(reviewdata)

  const ForumsScreen = () => {
    return (
        <FlatList
        // style={{flexGrow:1}}
        contentContainerStyle={{paddingBottom:100}}
        data={postdata}
        renderItem={({ item }) => {
          return(
            <View style={styles.postbox} >
            <TouchableOpacity 
            // onPress={() => { navigation.navigate("ReviewDetail", { item });}} 
            style={{width:'100%'}}>
              <View style={{flexDirection:'row'}}>
                <Image source={require("../../assets/icons/profileBlue.png")}/>
                <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{item.field.author}</Text>
              </View>
              <Text style={styles.label}>{item.field.Description}</Text>
            </TouchableOpacity>
              <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
                <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
                  <Image source={require("../../assets/icons/minilike.png")}/>
                  <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{item.field.likeCount} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
                  <Image source={require("../../assets/icons/minicomment.png")}/>
                  <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
                </TouchableOpacity>
              </View>  
        </View>

          )
        }}
        onEndReachedThreshold={0.3}
        />
    );
  };

  const ReviewScreen = () => {
    return (
        <FlatList
        // style={{flexGrow:1}}
        contentContainerStyle={{paddingBottom:100}}
        data={reviewdata}
        renderItem={({ item }) => {
          return(
            <View style={styles.postbox} >
            <TouchableOpacity 
            // onPress={() => { navigation.navigate("ReviewDetail", { item });}} 
            style={{width:'100%'}}>
              <View style={{flexDirection:'row'}}>
                <Image source={require("../../assets/icons/profileBlue.png")}/>
                <Text style={{color:'#0C2D57',fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:8}}>{item.data.Author}</Text>
              </View>
              <Text style={styles.label}>{item.data.Description}</Text>
            </TouchableOpacity>
              <View style={{alignSelf:'center',flexDirection:'row',borderTopWidth:1}}>  
                <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',marginTop:5}}>
                  <Image source={require("../../assets/icons/minilike.png")}/>
                  <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>{item.data.likeCount} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'50%',flexDirection:'row',justifyContent:'space-evenly',borderLeftWidth:1,marginTop:5}}>
                  <Image source={require("../../assets/icons/minicomment.png")}/>
                  <Text style={{fontSize:12, color:'#FC6736',marginRight:30}}>0 Comments</Text>
                </TouchableOpacity>
              </View>  
        </View>
            // <View style={{borderWidth: 1,
            //   borderColor: 'gray',
            //   padding: 10,
            //   marginBottom: 10,
            //   borderRadius: 8,}}>
            //   <Text>{item.data.Author}</Text>
            //   <Text>{item.data.Description}</Text>
            //   <Text>{item.data.likeCount}</Text>
            // </View>

          )
        }}
        onEndReachedThreshold={0.3}
        /> 
    );
  };

  return (
    <TopTabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor:"#FC6736",
        tabBarInactiveTintColor:"#EFECEC",
        backgroundColor: "#EFECEC",
        headerShown: true,
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: "#FFB0B0",
          marginTop: "5%",
          height: "7%",
          width: "90%",
          alignSelf: "center",
          borderRadius: 15,
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#0C2D57",
          height: "100%",
          borderRadius: 15,
        },
      }}
    >
      <TopTabNavigator.Screen name="Forums" component={ForumsScreen} />
      <TopTabNavigator.Screen name="Reviews" component={ReviewScreen} />
    </TopTabNavigator.Navigator>
  );
};
/* -------------------------------------------------------------------------- */
const MyCourseScreen = ({ route }) => {
  return (
    <View>
      <Text>MyCourseScreen</Text>
    </View>
  );
};
/* -------------------------------------------------------------------------- */
const ContactScreen = ({ route }) => {
  return (
    <View>
      <Text>Contact us screen</Text>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
