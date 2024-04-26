import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CoursesScreen, ForumsScreen, HomeScreen } from "../Screens/Screens.js";
import { Image, View, Text } from "react-native";
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
        tabBarLabelStyle: { fontSize: 12, fontWeight:"bold", color:"#0C2D57", marginBottom:"10%", }, // Adjust the font size here
        tabBarIconStyle: { width: 20, height: 20, marginBottom: "-5%", marginTop:"2%" }, // Adjust the margin bottom of the icon here
        
      }}
    >
      <BottomTab.Screen
        name="Courses"
        component={CoursesScreen}
        options={{
          tabBarIcon: () => <CoursesTabIcon />,
          // tabBarInactiveBackgroundColor: "#EFECEC", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
          tabBarLabel: () => <CoursesTabTitle />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <HomeTabIcon />,
          //<Image source={require("../../assets/icons/home-icon.png")} />
          //<HomeTabIcon focused={focused} />
            
          
          // tabBarInactiveBackgroundColor: "#EFECEC", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
          tabBarLabel: () => <HomeTabTitle />,
        }} 
      />
      
      <BottomTab.Screen
        name="Forums"
        component={ForumsScreen}
        options={{
          tabBarIcon: () => <ForumsTabIcon />,
          // tabBarInactiveBackgroundColor: "#EFECEC", // Adjust inactive background color
          // tabBarActiveBackgroundColor: "green", // Adjust active background color
          tabBarLabel: () => <ForumsTabTitle />,
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
        //style={{backgroundColor:"black"}}
        style={{ width: "180%", height: "90%", backgroundColor:"#FFB0B0" }}
      />
  );
};
const HomeTabTitle = () => {
  const isFocused = useIsFocused();
  return (
      //<Text style={{isFocused ? color:"#0C2D57", color:"#EFECEC"}}>HOME</Text>
      <Text style={{ color: isFocused ? "#0C2D57" : "#EFECEC", fontSize:12, fontWeight:"bold", marginBottom:"5%", marginLeft:"0.8%" }}>HOME</Text>
  );
};

const CoursesTabIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Image
      source={isFocused ? require("../../assets/icons/course-icon2.png") : require("../../assets/icons/course-unselected-icon.png")}
      style={{ width: "120%", height: "75%", backgroundColor:"#FFB0B0" }}
    />
  );
};
const CoursesTabTitle = () => {
  const isFocused = useIsFocused();
  return (
      //<Text style={{isFocused ? color:"#0C2D57", color:"#EFECEC"}}>HOME</Text>
      <Text style={{ color: isFocused ? "#0C2D57" : "#EFECEC", fontSize:12, fontWeight:"bold", marginBottom:"5%" }}>COURSES</Text>
  );
};

const ForumsTabIcon = () => {
  const isFocused = useIsFocused();
  return (
    <Image
      source={isFocused ? require("../../assets/icons/fluent_people-community-16-filled.png") : require("../../assets/icons/fluent_people-community-16-filled-unselected.png")}
      style={{ width: "150%", height: "75%", backgroundColor:"#FFB0B0" }}
    />
  );
};
const ForumsTabTitle = () => {
  const isFocused = useIsFocused();
  return (
      //<Text style={{isFocused ? color:"#0C2D57", color:"#EFECEC"}}>HOME</Text>
      <Text style={{ color: isFocused ? "#0C2D57" : "#EFECEC", fontSize:12, fontWeight:"bold", marginBottom:"5%" }}>FORUMS</Text>
  );
};
