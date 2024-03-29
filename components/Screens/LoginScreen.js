import { Button, Text, View } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { API_host, API_port } from "@env";
import axios from "axios";

export default function LoginScreen({ navigation, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  function handleLogin() {
    if (!username || !password) {
      setLoginStatus("All field is required!");
      return;
    }

    axios
      .post(
        `http://${API_host}:${API_port}/auth/login`,
        {
          username: username,
          password: password,
        },
        { timeout: 5000 }
      )
      .then((response) => {
        console.log(response.data);
        setLoggedIn();
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          console.log("Request timed out");
          setLoginStatus("timeout");
          return;
        }

        console.log(err.response.data);
        if (err.response.status === 401)
          setLoginStatus("Wrong username or password.");
        else if (err.response.status === 500) {
          setLoginStatus("500 internal server error");
        }
      });
  }

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Login Screen</Text>
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
      {loginStatus ? <Text>{loginStatus}</Text> : null}
      <Button title="Login" onPress={handleLogin} />

      <Button
        title="register"
        onPress={() => navigation.navigate("register")}
      />
    </View>
  );
}
