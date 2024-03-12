import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

export default function LoginScreen({setLoggedIn}){
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Text>Login Screen</Text>
        <TextInput 
            style={{backgroundColor: '#C7C7C7', padding:5}}
            placeholder="Enter Username Here"
        />
        <TextInput 
            style={{backgroundColor: '#C7C7C7', padding:5}}
            placeholder="Enter Password Here"
        />
        <Button 
            title='Login'
            onPress={setLoggedIn}
        />
      </View>
    )
  }
