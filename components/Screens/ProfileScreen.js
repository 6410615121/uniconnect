import { View, Text, Image,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

export default function ProfileScreen({setLoggedOut}) {
  const navigation = useNavigation()
  const Stack = createStackNavigator();

  return (
    
    <Stack.Navigator initialRouteName="ProfileScreen"
      screenOptions={{headerShown: true, 
                      headerTitle:'',
                      headerTitleStyle:{color:'#FC6735',fontSize:25},
                      headerStyle:{backgroundColor:'#002E57', shadowColor:'#002E57'},
                      headerLeft:()=> <View><CustomHeaderBackButton /></View>,
        }}
    >
      <Stack.Screen 
        name='ProfileScreen'
      >
        {(props) => <ProfileMain {...props} setLoggedOut= {setLoggedOut} /> }
      </Stack.Screen>
      <Stack.Screen 
        name='LikeScreen'
        component={LikeScreen}
        options={{headerTitle:'Likes'}}
      />

      <Stack.Screen 
        name='PostScreen'
        component={PostScreen}
        options={{headerTitle:'Posts'}}
      />

      <Stack.Screen 
        name='MyCourseScreen'
        component={MyCourseScreen}
        options={{headerTitle:'My Courses'}}
      />
    </Stack.Navigator>
  )
}

const ProfileMain = ({route, setLoggedOut}) => {
  const navigation = useNavigation();

  const handleLikesPress = () => {
    navigation.push('LikeScreen');
  };

  const handlePostsPress = () => {
    navigation.push('PostScreen');
  };

  const handleMyCoursePress = () => {
    navigation.push('MyCourseScreen');
  };

  return (
    <View style={{backgroundColor:'#EFECEC', height:'100%', width:'100%'}}>
      
    <View style={{backgroundColor:'#0C2D57' ,height:'50%', borderBottomLeftRadius:40,borderBottomEndRadius:40, marginTop:0, alignItems:'center', width:'100%'}}>
      <Image source={require("../../assets/icons/profilePageicon.png")} style={{alignSelf:'center',marginTop:10}}/>
      <Text style={{color:'#FC6736', textAlign:'center',fontSize:24,fontWeight:'bold',marginTop:10}}>Somsak Rakthai</Text>
      <Text style={{color:'#FFB0B0',textAlign:'center',fontSize:12,fontWeight:'light'}}>Welcome to the UniConnect Application!</Text>
      
      <View style={{flexDirection:'row',marginTop:10}}>
        <Image source={require("../../assets/icons/FBicon.png")} />
        <Text style={{color:'#FFB0B0',fontSize:12,fontWeight:'light',marginLeft:10}}>xxxxxx xxxxxx</Text>
      </View>

      <View style={{flexDirection:'row' ,marginTop:5}}>
        <Image source={require("../../assets/icons/Lineicon.png")}/>
        <Text style={{color:'#FFB0B0',fontSize:12,fontWeight:'light',marginLeft:10}}>xxxxxx xxxxxx</Text>
      </View>
      
      <View style={{flexDirection:'row',marginTop:5}}>
        <Image source={require("../../assets/icons/IGicon.png")}/>
        <Text style={{color:'#FFB0B0',fontSize:12,fontWeight:'light',marginLeft:10}}>xxxxxx xxxxxx</Text>
      </View>
    </View>

    <View style={{marginTop:-90}}>
      <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                  ,alignSelf:'center',padding:20, paddingTop:15,borderBottomWidth:2
                                  , borderTopLeftRadius:15,borderTopEndRadius:15}} 
                          onPress={handleLikesPress} 
                          underlayColor='#FFDEA2'
                                  >
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', width:'50%'}}>
            <Image source={require("../../assets/icons/likeIcon.png")} style={{height:30, width:30}}/>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#0C2D57'}}>Likes</Text>
          </View>
          <View style={{ width:'50%'}}>
            <Image source={require("../../assets/icons/cirAir.png")} style={{alignSelf:'flex-end'}}/>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                  ,alignSelf:'center',padding:20, paddingTop:15,borderBottomWidth:2}} 
                                  onPress={handlePostsPress} underlayColor='#FFDEA2'>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', width:'50%'}}>
            <Image source={require("../../assets/icons/postIcon.png")} style={{height:30, width:30}}/>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#0C2D57'}}>Posts</Text>
          </View>
          <View style={{ width:'50%'}}>
            <Image source={require("../../assets/icons/cirAir.png")} style={{alignSelf:'flex-end'}}/>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                  ,alignSelf:'center',padding:20, paddingTop:15
                                  , borderBottomLeftRadius:15,borderBottomEndRadius:15}} 
                                  onPress={handleMyCoursePress} underlayColor='#FFDEA2'>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', width:'50%'}}>
            <Image source={require("../../assets/icons/courseIcon.png")} style={{height:30, width:30}}/>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#0C2D57'}}>My Courses</Text>
          </View>
          <View style={{ width:'50%'}}>
            <Image source={require("../../assets/icons/cirAir.png")} style={{alignSelf:'flex-end'}}/>
          </View>
        </View>
      </TouchableHighlight>
    </View>

    <View style={{marginTop:70}}>
      <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                  ,alignSelf:'center',padding:20, paddingTop:15,borderBottomWidth:2
                                  , borderTopLeftRadius:15,borderTopEndRadius:15}} 
                                  onPress={alert} underlayColor='#FFDEA2'>
        <View style={{flexDirection:'row'}}>
          <View style={{flexDirection:'row', width:'50%'}}>
            <Image source={require("../../assets/icons/contactUs.png")} style={{height:30, width:30}}/>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#0C2D57'}}>Contact Us</Text>
          </View>
          <View style={{ width:'50%'}}>
            <Image source={require("../../assets/icons/cirAir.png")} style={{alignSelf:'flex-end'}}/>
          </View>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                  ,alignSelf:'center',padding:20, paddingTop:15
                                  , borderBottomLeftRadius:15,borderBottomEndRadius:15}} 
                                  onPress={setLoggedOut} underlayColor='#FFDEA2'>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
            <Image source={require("../../assets/icons/logout.png")} style={{height:30, width:30}}/>
            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#FC6736'}}>Logout</Text>
        </View>
      </TouchableHighlight>
    </View>

   

  </View>
  )
}

const CustomHeaderBackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/icons/fe_arrow-up.png")} // path to image
        style={{width:40,height:40,marginLeft:10}}
      />
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------- */

const LikeScreen = ({ route }) => {
  const TopTabNavigator = createMaterialTopTabNavigator();
  const ForumsScreen = () => {
    return (
      <View>
        <Text>forums Like</Text>
      </View>
    );
  };
  
  const ReviewScreen = () => {
    return (
      <View>
        <Text>reviews Like</Text>
      </View>
    );
  };

  return (
    <TopTabNavigator.Navigator>
      <TopTabNavigator.Screen name='forums' component={ForumsScreen} />
      <TopTabNavigator.Screen name='reviews' component={ReviewScreen} />
    </TopTabNavigator.Navigator>
  );
};
/* -------------------------------------------------------------------------- */
const PostScreen = ({route}) => {
  const TopTabNavigator = createMaterialTopTabNavigator();
  const ForumsScreen = () => {
    return (
      <View>
        <Text>forums Post</Text>
      </View>
    );
  };
  
  const ReviewScreen = () => {
    return (
      <View>
        <Text>reviews Post</Text>
      </View>
    );
  };

  return (
    <TopTabNavigator.Navigator>
      <TopTabNavigator.Screen name="Forums" component={ForumsScreen}/>
      <TopTabNavigator.Screen name="Reviews" component={ReviewScreen}/>
    </TopTabNavigator.Navigator>
  )
}
/* -------------------------------------------------------------------------- */
const MyCourseScreen = ({route}) => {
  return (
    <View>
      <Text>MyCourseScreen</Text>
    </View>
  )
}
/* -------------------------------------------------------------------------- */