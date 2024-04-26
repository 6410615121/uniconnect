import { Button, Text, View, Image} from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { API_host, API_port } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn, getUserFromUserID } from "../../firebase/firebaseAuth";

export default function LoginScreen({ navigation, setLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  async function handleLogin() {
    //setLoggedIn(); // for development only
    
    if (!email || !password) {
      setLoginStatus("All field is required!");
      return;
    }

    try{
      const user = await signIn(email, password)

      if(user){
        setLoginStatus("Logged In!");
        const userData = await getUserFromUserID(user.uid);

        if (userData) {
          const { name } = userData;
          AsyncStorage.setItem("name", name);
          console.log(user.uid)
          AsyncStorage.setItem("UID", user.uid); // set name for later use in app
          
          console.log("async:",await AsyncStorage.getItem('UID'))
          setLoggedIn(); 
        } else {
          console.log("User data not found");
          setLoginStatus("Login Error!");
        }
      }
    }catch(error){
      console.error("Login error:", error);
      setLoginStatus("Login Error!");
    }

  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%", backgroundColor:'#0C2D57'}}
    >
      <Image source={require("../../assets/icons/logo.png")}/>
      <View style={{marginTop:10}}>
        <TextInput
          style={{ backgroundColor: "#FFF8E3",paddingLeft:10, padding: 5, width: 200, borderWidth:1,borderRadius:15}}
          placeholder="Enter Email Here"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={{marginTop:10}}>
        <TextInput
          style={{ backgroundColor: "#FFF8E3", paddingLeft:10, padding: 5, width: 200, borderWidth:1,borderRadius:15}}
          placeholder="Enter Password Here"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      {loginStatus ? <Text>{loginStatus}</Text> : null}
      <View style={{marginTop:10}}>
        <Button title="Login" onPress={handleLogin} color={'#FC6736'} />
      </View>
      <View style={{marginTop:10}}>
        <Button
          title="register"
          onPress={() => navigation.navigate("register")}
          color={'#FC6736'}
        />
      </View>
    </View>
  );
}
