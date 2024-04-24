import { View, Text, StyleSheet } from 'react-native';


const FileDetailScreen = ({ route }) => {
    const { item } = route.params;
    return(
      <View >
        <Text>Filename: {item.Filename}</Text>
        <Text>Description: {item.Description}</Text>
      </View>
    );
  }


export default FileDetailScreen;