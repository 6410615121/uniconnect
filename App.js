import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button, Text, View, TouchableOpacity, Image} from 'react-native';
import {icons} from './style/icon.js'
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
    <BottomTab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: () => (
            <Image source={require('./icon/home-icon.png')}/>
          ),}}/>
    <BottomTab.Screen name="Courses" component={CoursesScreen} options={{tabBarIcon: () => (
            <Image source={require('./icon/course-icon.png')}/>
          ),}}/>
    <BottomTab.Screen name="Forums" component={ForumsScreen} options={{tabBarIcon: () => (
            <Image source={require('./icon/forum-icon.png')}/>
          ),}}/>
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
          headerLeft: () => <TouchableOpacity  onPress={() => navigation.navigate('ProfileStack')}>
            <Image
                  source={require('./icon/default-profile-icon.png')} // path to image
                  style={icons.profile_icon}
            />  
          </TouchableOpacity>,
          headerRight: () => 
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity  onPress={() => navigation.navigate('NotificationsStack')}>
                <Image
                  source={require('./icon/bell-icon.png')} // path to image
                  style={icons.bell_icon}
                />  
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => navigation.navigate('SettingsStack')}>
                <Image
                  source={require('./icon/setting-icon.png')} // path to image
                  style={icons.setting_icon}
                />  
              </TouchableOpacity>
            </View>
      })}/>
        <Stack.Screen name="ProfileStack" component={ProfileScreen}/>
        <Stack.Screen name="NotificationsStack" component={NotificationsScreen} />
        <Stack.Screen name="SettingsStack" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export {BottomTabNavigator}