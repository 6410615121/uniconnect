import { View, Text, StyleSheet, Button ,Image} from 'react-native';
import { useState } from "react";
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";
import { FlatList} from 'react-native';

import {
  Createcomment,

} from "../../firebase/firestoreCourseDetail.js";

const ReviewDetailScreen = ({ route }) => {
    const { item } = route.params;
    const [comment, setcomment] = useState("");

    return(
      <View style={styles.container}>
        <View style={styles.postbox}>
          <View style={{flexDirection:'row'}}>
            <Image source={require("../../assets/icons/profileBlue.png")} />
            <Text style={{fontSize: 18,marginTop: 5,marginLeft:50,marginRight: 50, color: '#0C2D57',}}>author</Text>
          </View>
          <Text>{item.Description}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop:10}}>
          <TextInput
            style={{ backgroundColor: "#C7C7C7", padding: 5, width: 200}}
            placeholder="comments"
            onChangeText={(text) => {
              setcomment(text);
            }}
          />
          <Button
            title="comment"
            onPress={() => Createcomment(item.CourseID, item.reviewID, comment)}/>    
        </View>
        
      </View>
    );
}


export default ReviewDetailScreen;