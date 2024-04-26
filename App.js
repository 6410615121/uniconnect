// modules
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Button, Text, View, TouchableOpacity, Image,Dimensions } from "react-native";
import { TransitionPresets } from "@react-navigation/stack"; //https://reactnavigation.org/docs/stack-navigator/#transparent-modals
import { icons } from "./assets/styles/icon.js";
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import {
  NotificationsScreen,
  ProfileScreen,
  SettingsScreen,
  FileDetailScreen,
  PostDetailScreen,
  LoginScreen,
  RegisterScreen,
  ReviewDetailScreen,
  CreateReviewScreen,
  UploadsheetScreen,
  UploadexamScreen,
  CreateForumScreen,
  CreateCommentReviewScreen,
  CreateCommentForumScreen,
} from "./components/Screens/Screens.js";

// firebase config
// import { addUser } from "./firebase/firestoreCourses";

// navigation
import {
  BottomTabNavigator,
  TopTabcourse,
} from "./components/navigation/navigation.js";

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('name')
    setLoggedIn(false);
  };

  return (
    <NavigationContainer>
      {!loggedIn ? (
        <RegisterAndLoginStack handleLogin={handleLogin} />
      ) : (
        <MainApp handleLogout={handleLogout} />
      )}
    </NavigationContainer>
  );
}

const RegisterAndLoginStack = ({ handleLogin }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Login"
      options={{
        headerTitle:"LOGIN",
        headerTintColor: '#FFB0B0',
        headerStyle:{backgroundColor:'#0C2D57'},
        headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
      >
        {(props) => <LoginScreen {...props} setLoggedIn={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen 
      name="register"
      options={{
        headerTitle:"REGISTER",
        headerTintColor: '#FFB0B0',
        headerStyle:{backgroundColor:'#0C2D57'},
        headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}
        
      }}
      >
        {(props) => <RegisterScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const MainApp = ({ handleLogout }) => {
  const [name, setName] = useState('');

  const screenHeight = Dimensions.get('window').height;

  // fetch name from AsyncStorage
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
        }else{
          setName("ชื่อจริง มนุษย์");
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }

    fetchUserName();
    
    }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        
        component={BottomTabNavigator}
        options={({ navigation }) => ({
          headerTitle: () => <View></View>,
          headerStyle:{backgroundColor:'#0C2D57',height:screenHeight*0.15},
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row"}}
              onPress={() => navigation.navigate("ProfileStack")}
            >
              <Image
                source={require("./assets/icons/profilePageicon.png")} // path to image
                style={icons.profile_icon}
              />
              <View style={{flexDirection:'column'}}>
                <Text style={{color:'#FC6736',fontWeight:'bold',fontSize:18,paddingLeft:20}}>{name}</Text>
                <Text style={{color:'#FFB0B0',fontSize:12,paddingLeft:20}}>Welcome to the UniConnect</Text>
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationsStack")}
              >
                <Image
                  source={require("./assets/icons/bell.png")} // path to image
                  style={icons.bell_icon}
                />
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate("SettingsStack")}
              >
                <Image
                  source={require("./assets/icons/setting-icon.png")} // path to image
                  style={icons.setting_icon}
                />
              </TouchableOpacity> */}
            </View>
          ),
        })}
      />

      <Stack.Screen name="ProfileStack"
      options={{headerTitle: '',
        headerTintColor: '#FFB0B0',
        headerStyle:{
        backgroundColor:'#0C2D57', 
        borderWidth:0,
        shadowColor:'#0C2D57'
        },
        headerShown:false
        }}>
          {(props) => <ProfileScreen {...props} setLoggedOut={handleLogout} />}
        </Stack.Screen>

      <Stack.Screen name="NotificationsStack" component={NotificationsScreen} />

      <Stack.Screen name="SettingsStack">
        {(props) => <SettingsScreen {...props} setLoggedOut={handleLogout} />}
      </Stack.Screen>

      <Stack.Screen
        name="CourseDetail"
        component={TopTabcourse}
        options={({ navigation }) => ({
          // headerTintColor: '#FFB0B0',
          headerLeft:() => <CustomHeaderBackButton />,
          title: "Course",
          headerStyle: {backgroundColor:'#0C2D57'},
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}
        })}
        
      />

      <Stack.Screen
        name="FileDetail"
        options={{ ...TransitionPresets.ModalPresentationIOS , 
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'FILE DETAIL',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={FileDetailScreen}
      />

      <Stack.Screen
        name="PostDetail"
        options={{ ...TransitionPresets.Modal ,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'FORUMS POST',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={PostDetailScreen}
      />

      <Stack.Screen
        name="ReviewDetail"
        options={{ ...TransitionPresets.Modal , 
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'REVIEWS POST',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'},}}
        component={ReviewDetailScreen}
      />

      <Stack.Screen
        name="createReview"
        options={{ ...TransitionPresets.ModalPresentationIOS, 
        headerTintColor: '#FFB0B0',
        headerStyle:{backgroundColor:'#0C2D57'},
        title : 'REVIEWS CREATE',
        headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={CreateReviewScreen}
      
        
      />

      <Stack.Screen
        name="uploadsheet"
        options={{ ...TransitionPresets.ModalPresentationIOS ,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'UPLOADSHEET',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={UploadsheetScreen}
      />

      <Stack.Screen
        name="uploadexam"
        options={{ ...TransitionPresets.ModalPresentationIOS ,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'UPLOADEXAM',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={UploadexamScreen}
      />

      <Stack.Screen
        name="createForum"
        options={{ ...TransitionPresets.Modal,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'FORUM CREATE',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={CreateForumScreen}
      />

      <Stack.Screen
        name="CommentReview"
        options={{ ...TransitionPresets.ModalPresentationIOS ,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'COMMENT REVIEWS',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={CreateCommentReviewScreen}
      />

      <Stack.Screen
        name="ForumReview"
        options={{ ...TransitionPresets.ModalPresentationIOS ,
          headerTintColor: '#FFB0B0',
          headerStyle:{backgroundColor:'#0C2D57'},
          title : 'COMMENT FORUMS',
          headerTitleStyle:{color:'#FC6736',fontWeight:'bold'}}}
        component={CreateCommentForumScreen}
      />
    </Stack.Navigator>
  );
};

const CustomHeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("./assets/icons/fe_arrow-up.png")} // path to image
        style={{width:40,height:40,marginLeft:10}}
      />
    </TouchableOpacity>
  );
};

// test
const Test = () =>{
  return(
    <View style={{alignItems:"center", justifyContent: "center", flex:1}}>
      <Button title="test" onPress={() => addUser()}/>
    </View>
  );
}
