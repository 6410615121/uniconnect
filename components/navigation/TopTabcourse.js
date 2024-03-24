import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CourseDetailScreen } from "../Screens/Screens"

const TopTab = createMaterialTopTabNavigator();

export const TopTabcourse = ({ route }) => {
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