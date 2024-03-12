import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { API_host, API_port } from "@env";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  function handleRegister() {
    if (!username || !password || !confirmPassword) {
      setRegisterMessage("All field is required!");
      return;
    } else if (password !== confirmPassword) {
      setRegisterMessage("password does not match");
      return;
    }

    axios
      .post(`http://${API_host}:${API_port}/auth/register`, {
        "username": username,
        "password": password,
        "confirmPassword": confirmPassword
      })
      .then((response) => {
        console.log(response.data);
        setRegisterMessage("register sucessfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setRegisterMessage("something wrong! maybe the username is taken!");
      });
  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Register Screen</Text>
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Username Here"
        onChangeText={(text) => setUsername(text)}
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
