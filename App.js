import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import SettingsScreen from './components/SettingsScreen';
import CoursesScreen from './components/CoursesScreen';
import ForumsScreen from './components/ForumsScreen';



const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <BottomTab.Navigator screenOptions={{headerShown: false}}>
    <BottomTab.Screen name="Home" component={HomeScreen} />
    <BottomTab.Screen name="Courses" component={CoursesScreen} />
    <BottomTab.Screen name="Forums" component={ForumsScreen} />
  </BottomTab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileStack" component={ProfileScreen} />
        <Stack.Screen name="NotificationsStack" component={NotificationsScreen} />
        <Stack.Screen name="SettingsStack" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
