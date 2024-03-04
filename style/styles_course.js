import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 20,
    },
    course: {
      marginBottom: 20,
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginLeft:10,
      width:160,
      height:120,
      backgroundColor:'#FFF'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',

    },
    description: {
      fontSize: 14,
    },
  });

export {styles}