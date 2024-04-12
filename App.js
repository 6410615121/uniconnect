// modules
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View, TouchableOpacity, Image } from "react-native";
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
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setLoggedIn={handleLogin} />}
      </Stack.Screen>
      <Stack.Screen name="register">
        {(props) => <RegisterScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const MainApp = ({ handleLogout }) => {
  const [name, setName] = useState('');

  // fetch name from AsyncStorage
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        if (storedName) {
          setName(storedName);
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
          headerLeft: () => (
            <TouchableOpacity style={{flexDirection:"row"}}
              onPress={() => navigation.navigate("ProfileStack")}
            >
              <Image
                source={require("./assets/icons/default-profile-icon.png")} // path to image
                style={icons.profile_icon}
              />
              <Text>{name}</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationsStack")}
              >
                <Image
                  source={require("./assets/icons/bell-icon.png")} // path to image
                  style={icons.bell_icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("SettingsStack")}
              >
                <Image
                  source={require("./assets/icons/setting-icon.png")} // path to image
                  style={icons.setting_icon}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Stack.Screen name="ProfileStack" component={ProfileScreen} />

      <Stack.Screen name="NotificationsStack" component={NotificationsScreen} />

      <Stack.Screen name="SettingsStack">
        {(props) => <SettingsScreen {...props} setLoggedOut={handleLogout} />}
      </Stack.Screen>

      <Stack.Screen
        name="CourseDetail"
        component={TopTabcourse}
        options={({ navigation }) => ({
          headerTitle: () => <View></View>,
        })}
      />

      <Stack.Screen
        name="FileDetail"
        options={{ ...TransitionPresets.ModalPresentationIOS }}
        component={FileDetailScreen}
      />

      <Stack.Screen
        name="PostDetail"
        options={{ ...TransitionPresets.Modal }}
        component={PostDetailScreen}
      />
    </Stack.Navigator>
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
