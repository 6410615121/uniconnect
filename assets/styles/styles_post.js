import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      height:'100%',
      alignItems:"center",
      backgroundColor: '#EFECEC',
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
      borderRadius: 15,
      padding: 10,
      width:'90%',
      height:150,
      backgroundColor:'#EFECEC',
      alignSelf:'center'
    },
    commentbox: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 20,
        width:"95%",
        height:"auto",
        backgroundColor:'#FFF',
    }
    
  });
  
export {styles}