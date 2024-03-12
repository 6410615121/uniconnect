import { View, Text, Button } from 'react-native'
import React from 'react'

export default function SettingsScreen({setLoggedOut}) {
  return (
    <View>
      <Button 
        title='Logout'
        onPress={setLoggedOut}
      />
    </View>
  )
}