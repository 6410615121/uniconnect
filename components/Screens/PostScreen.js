import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../style/styles_post.js';
import { FlatList} from 'react-native';

const PostDetailScreen = (navigation) => {
  const {post} = navigation.route.params;
  console.log(post)
    return(
      <View style={styles.container}>
        <View style={styles.postbox}>
          <Text>author: {post.author}</Text>
          <Text>title : {post.title}</Text>
          <Text>Description: {post.description}</Text>
        </View>
        
        {post.comment.map((commentText, index) => (
          <View key={index} style={styles.commentbox}>
            <Text>{commentText}</Text>
          </View>
      ))}
      </View>
    );
  }


export default PostDetailScreen;