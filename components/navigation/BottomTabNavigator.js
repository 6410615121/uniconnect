import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CoursesScreen, ForumsScreen, HomeScreen } from "../Screens/Screens.js";
import { Image } from "react-native";

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => (
  <BottomTab.Navigator screenOptions={{ headerShown: false }}>
    <BottomTab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
          <Image source={require("../../assets/icons/home-icon.png")} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Courses"
      component={CoursesScreen}
      options={{
        tabBarIcon: () => (
          <Image source={require("../../assets/icons/course-icon.png")} />
        ),
      }}
    />
    <BottomTab.Screen
      name="Forums"
      component={ForumsScreen}
      options={{
        tabBarIcon: () => (
          <Image source={require("../../assets/icons/forum-icon.png")} />
        ),
      }}
    />
  </BottomTab.Navigator>
);
