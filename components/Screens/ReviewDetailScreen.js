import { View, Text, StyleSheet } from 'react-native';


const ReviewDetailScreen = ({ route }) => {
    const { item } = route.params;
    
    return(
      <View >
        <Text>Author</Text>
        <Text>{item.Description}</Text>
      </View>
    );
  }


export default ReviewDetailScreen;