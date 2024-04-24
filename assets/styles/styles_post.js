import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems:"center",
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333', // Dark gray text color
    },
    detailsContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    postbox: {
      marginTop: 20,
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 20,
      width:"100%",
      height:"auto",
      backgroundColor:'#FFF',
    },
    commentbox: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 20,
        width:"100%",
        height:"auto",
        backgroundColor:'#FFF',
    }
    
  });
  
export {styles}