import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

import { Button, Text, View } from 'react-native';

import {
  CoursesScreen, 
  ForumsScreen, 
  HomeScreen, 
  NotificationsScreen, 
  ProfileScreen, 
  SettingsScreen
} from './components/Screens/Screens.js'

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
        <Stack.Screen name="Main" 
        component={BottomTabNavigator} 
        options={({ navigation }) => ({
          headerTitle: () => <View></View>,
          headerLeft: () => <Button title='Profile' onPress={() => navigation.navigate('ProfileStack')} />,
          headerRight: () => 
            <View style={{flexDirection:'row'}}>
              <Button title='Bell' onPress={() => navigation.navigate('NotificationsStack')}/>
              <Button title='Settings' onPress={() => navigation.navigate('SettingsStack')}/>
            </View>
      })}/>
        <Stack.Screen name="ProfileStack" component={ProfileScreen}/>
        <Stack.Screen name="NotificationsStack" component={NotificationsScreen} />
        <Stack.Screen name="SettingsStack" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
