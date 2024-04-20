import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList} from 'react-native';
import { styles } from '../../assets/styles//styles_post.js';
import { TextInput } from "react-native-gesture-handler";

const PostDetailScreen = (navigation) => {
  const {post} = navigation.route.params;
  console.log(post)
    return(
      <View style={styles.container}>
        <View style={styles.postbox}>
          <Text>author: {post.author}</Text>
          <Text>title : {post.title}</Text>
          <Text>Description: {post.Description}</Text>
        </View>
        {/* <View style={{ flexDirection: 'row', marginTop:10}}>
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
        </View> */}
      
      </View>
    );
  }


export default PostDetailScreen;