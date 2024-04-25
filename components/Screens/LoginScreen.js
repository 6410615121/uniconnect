import { Button, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { API_host, API_port } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signIn } from "../../firebase/firebaseAuth";

export default function LoginScreen({ navigation, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  function handleLogin() {
    setLoggedIn(); // for development only
    
    // if (!username || !password) {
    //   setLoginStatus("All field is required!");
    //   return;
    // }
    // signIn(username, password).then((isSuccessful) => {
    //   if(isSuccessful){
    //     setLoginStatus("Logged In!");
    //     AsyncStorage.setItem("name", "Somsak Rakthai");
    //     setLoggedIn(); 
    //   }else{
    //     setLoginStatus("Login Failed!");
    //   }
    // }).catch((error) =>{
    //   console.login(error)
    //   setLoginStatus("Login Error!");
    // });

  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Login Screen</Text>
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Email Here"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Password Here"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      {loginStatus ? <Text>{loginStatus}</Text> : null}
      <Button title="Login" onPress={handleLogin} />

      <Button
        title="register"
        onPress={() => navigation.navigate("register")}
      />
    </View>
  );
}
