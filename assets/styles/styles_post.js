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
      height:'30%',
      backgroundColor:'#EFECEC',
      alignSelf:'center',
    },
    commentbox: {
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        width: '90%',
        height:"auto",
        backgroundColor:'#FFF8E3',
        flexDirection:'row',
        alignSelf:'center',
        borderWidth:1
    }
    
  });
  
export {styles}