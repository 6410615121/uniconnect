import { View, Text, StyleSheet } from 'react-native';


const FileDetailScreen = ({ route }) => {
    const { item } = route.params;
    return(
      <View style={{backgroundColor:'#EFECEC',marginTop:10}}>
        <Text style={{color:'#0C2D57',fontSize:18,marginLeft:10}}>Filename: {item.Filename}</Text>
        <Text style={{color:'#0C2D57',fontSize:18,marginLeft:10}}>Description: {item.Description}</Text>
      </View>
    );
  }


export default FileDetailScreen;