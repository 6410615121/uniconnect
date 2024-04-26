import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
// import axios from "axios";
// import { API_host, API_port } from "@env";
import { register } from "../../firebase/firebaseAuth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  function handleRegister() {
    if (!email || !password || !confirmPassword) {
      setRegisterMessage("All field is required!");
      return;
    } else if (password !== confirmPassword) {
      setRegisterMessage("password does not match");
      return;
    }

    register(name, email, password).then(
      (isSuccessful) => {
        console.log('Registration successful:', isSuccessful)
        // console.log('password', password)

        if(isSuccessful){
          setRegisterMessage('sucessfully registered')
        }else{
          setRegisterMessage('registered failed')
        }
      }
    ).catch((error) =>{
      console.error('Error during registration:', error);
    });
  
  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Register Screen</Text>
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Email Here"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter your name Here"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Password Here"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />

      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Password Confirm"
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      {registerMessage ? <Text>{registerMessage}</Text> : null}
      <Button title="submit" onPress={handleRegister} />
    </View>
  );
}
