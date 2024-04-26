import { Button, Text, View } from "react-native";
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
    setLoggedIn(); // for development only
    
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
          AsyncStorage.setItem("name", name); // set name for later use in app
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
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Login Screen</Text>
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Email Here"
        onChangeText={(text) => setEmail(text)}
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
