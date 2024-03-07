import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

function NotificationList(){
  const list = new Array(20).fill('Notification Text');

  return(
    <View>
      {list.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => alert(`Pressed notification ${index}`)}>
          <Text>{item} {index}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function NotificationsScreen() {
  return (
    <View>
      <NotificationList />
    </View>  
  )
}