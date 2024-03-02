import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from './components/HomeScreen'
import Courses from "./components/Courses";
import Forums from "./components/Forums";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Courses' component={Courses} />
        <Tab.Screen name='Forums' component={Forums} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}