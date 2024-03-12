import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import axios from "axios";

export default function RegisterScreen({ navigation }) {
	function registerHandle(){
		const response = axios.post("http://localhost:3000")
	}

  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", height: "100%" }}
    >
      <Text>Login Screen</Text>
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200}}
        placeholder="Enter Username Here"
      />
      <TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Enter Password Here"
      />

			<TextInput
        style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200 }}
        placeholder="Password Confirm"
      />

      <Button title="submit" />
    </View>
  );
}
