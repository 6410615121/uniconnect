import { View, Text, Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { TouchableHighlight } from 'react-native-gesture-handler'

export default function ProfileScreen() {
  return (
    <View style={{backgroundColor:'#EFECEC', height:'100%', width:'100%'}}>
      
      <View style={{backgroundColor:'#0C2D57' ,height:'50%', borderBottomLeftRadius:40,borderBottomEndRadius:40, marginTop:0, alignItems:'center', width:'100%'}}>
        <Image source={require("../../assets/icons/profilePageicon.png")} style={{alignSelf:'center',marginTop:10}}/>
        <Text style={{color:'#FC6736', textAlign:'center',fontSize:24,fontWeight:'bold',marginTop:10}}>Somsak Rakthai</Text>
        <Text style={{color:'#FFB0B0',textAlign:'center',fontSize:12,fontWeight:'light'}}>3rd Year Student | Faculty of Engineering</Text>
        
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
                                    onPress={alert} underlayColor='#FFDEA2'>
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
                                    onPress={alert} underlayColor='#FFDEA2'>
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
                                    onPress={alert} underlayColor='#FFDEA2'>
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
              <Image source={require("../../assets/icons/settingIcon.png")} style={{height:30, width:30}}/>
              <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#0C2D57'}}>Setting</Text>
            </View>
            <View style={{ width:'50%'}}>
              <Image source={require("../../assets/icons/cirAir.png")} style={{alignSelf:'flex-end'}}/>
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ backgroundColor: '#FFF8E3', height:60 ,width:'90%'
                                    ,alignSelf:'center',padding:20, paddingTop:15
                                    , borderBottomLeftRadius:15,borderBottomEndRadius:15}} 
                                    onPress={alert} underlayColor='#FFDEA2'>
          <View style={{flexDirection:'row',alignSelf:'center'}}>
              <Image source={require("../../assets/icons/logout.png")} style={{height:30, width:30}}/>
              <Text style={{fontSize:20, fontWeight:'bold', marginLeft:10, color:'#FC6736'}}>Logout</Text>
          </View>
        </TouchableHighlight>
      </View>

     

    </View>
  )
}