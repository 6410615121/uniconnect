import "react-native-gesture-handler";
import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { icons } from "./style/icon.js";
import { NavigationContainer } from "@react-navigation/native";
import { Button, Text, View, TouchableOpacity, Image } from "react-native";
import { TransitionPresets } from "@react-navigation/stack"; //https://reactnavigation.org/docs/stack-navigator/#transparent-modals

import {
  CoursesScreen,
  ForumsScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
  SettingsScreen,
  CourseDetailScreen,
  FileDetailScreen,
  PostDetailScreen,
  LoginScreen,
  RegisterScreen,
} from "./components/Screens/Screens.js";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const BottomTabNavigator = () => (
  <BottomTab.Navigator screenOptions={{ headerShown: false }}>
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: () => <Image source={require("./icon/home-icon.png")} />,
      }}
    />
    <BottomTab.Screen
      name="Courses"
      component={CoursesScreen}
      options={{
        tabBarIcon: () => <Image source={require("./icon/course-icon.png")} />,
      }}
    />
    <BottomTab.Screen
      name="Forums"
      component={ForumsScreen}
      options={{
        tabBarIcon: () => <Image source={require("./icon/forum-icon.png")} />,
      }}
    />
  </BottomTab.Navigator>
);

const TopTabcourse = ({ route }) => {
  const { course } = route.params;
  return (
    <TopTab.Navigator screenOptions={{ headerShown: false }}>
      <TopTab.Screen
        name="reviews"
        component={CourseDetailScreen}
        initialParams={{ course }}
      />
      <TopTab.Screen
        name="sheets"
        component={CourseDetailScreen}
        initialParams={{ course }}
      />
      <TopTab.Screen
        name="exam"
        component={CourseDetailScreen}
        initialParams={{ course }}
      />
    </TopTab.Navigator>
  );
};

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
        <Stack.Navigator>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setLoggedIn={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="register">
            {(props) => <RegisterScreen {...props}/>}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={({ navigation }) => ({
              headerTitle: () => <View></View>,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProfileStack")}
                >
                  <Image
                    source={require("./icon/default-profile-icon.png")} // path to image
                    style={icons.profile_icon}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("NotificationsStack")}
                  >
                    <Image
                      source={require("./icon/bell-icon.png")} // path to image
                      style={icons.bell_icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SettingsStack")}
                  >
                    <Image
                      source={require("./icon/setting-icon.png")} // path to image
                      style={icons.setting_icon}
                    />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen name="ProfileStack" component={ProfileScreen} />
          <Stack.Screen
            name="NotificationsStack"
            component={NotificationsScreen}
          />
          <Stack.Screen name="SettingsStack">
            {(props) => <SettingsScreen {...props} setLoggedOut= {handleLogout}/>}
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
      )}
    </NavigationContainer>
  );
}

export { BottomTabNavigator };
