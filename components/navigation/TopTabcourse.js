import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CourseDetailScreen } from "../Screens/Screens"

const TopTab = createMaterialTopTabNavigator();

export const TopTabcourse = ({ route }) => {
  const { course } = route.params;
  return (
    <TopTab.Navigator  screenOptions={{backgroundColor:'#EFECEC', headerShown: false,tabBarLabelStyle:{fontSize:18,color:'#FC6736',fontWeight:'bold'}
    ,tabBarStyle:{backgroundColor:'#FFB0B0',marginTop:'5%',height:'7%',width:'90%',alignSelf:'center',borderRadius:15} 
    ,tabBarIndicatorStyle:{backgroundColor:'#0C2D57', height:'100%',borderRadius:15}}}>
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
        name="exams"
        component={CourseDetailScreen}
        initialParams={{ course }}
      />
    </TopTab.Navigator>
  );
};