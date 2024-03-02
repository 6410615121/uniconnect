import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

function MyTabs(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Settings' component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function HomeScreen(){
  return(
    <Text>test</Text>
  )
}


export default MyTabs;