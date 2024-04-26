import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CoursesScreen, ForumsScreen, HomeScreen } from "../Screens/Screens.js";
import { Image } from "react-native";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { useIsFocused } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();


export const BottomTabNavigator = () => {
  // const isHomeScreenFocused = useIsFocused(); // Example: useIsFocused for the HomeScreen tab
  // const focusedRoute = getFocusedRouteNameFromRoute(route);
  // const isHomeScreenFocused = focusedRoute === "Home";

  return (
    <BottomTab.Navigator 
      screenOptions={{ 
        headerShown: false, 
        tabBarStyle:{height:"10%", backgroundColor:"#FFB0B0"}, // Adjust the height here
        tabBarLabelStyle: { fontSize: 14 }, // Adjust the font size here
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <HomeTabIcon />,
          //<Image source={require("../../assets/icons/home-icon.png")} />
          //<HomeTabIcon focused={focused} />
            
          
          // tabBarInactiveBackgroundColor: "blue", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
        }}
      />
      <BottomTab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarIcon: () => <CoursesTabIcon />,
          // tabBarInactiveBackgroundColor: "blue", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
        }}
      />
      <BottomTab.Screen
        name="Forums"
        component={ForumsScreen}
        options={{
          tabBarIcon: () => <ForumsTabIcon />,
          // tabBarInactiveBackgroundColor: "blue", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
        }}
      />
    </BottomTab.Navigator>
  );
};

// Define your custom tab icons
const HomeTabIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Image
      source={isFocused ? require("../../assets/icons/fluent_home-20-filled.png") : require("../../assets/icons/fluent_home-20-filled-unselected.png")}
    />
  );
};
const CoursesTabIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Image
      source={isFocused ? require("../../assets/icons/course-icon2.png") : require("../../assets/icons/course-unselected-icon.png")}
    />
  );
};

const ForumsTabIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Image
      source={isFocused ? require("../../assets/icons/fluent_people-community-16-filled.png") : require("../../assets/icons/fluent_people-community-16-filled-unselected.png")}
    />
  );
};
