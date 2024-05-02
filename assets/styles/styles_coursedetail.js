import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f5f5f5', // Light gray background color
      width:'100%',
      height:'100%'
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
    postbox:{
      marginTop: 20,
      borderRadius: 15,
      padding: 10,
      width:'90%',
      height:'auto',
      backgroundColor:'#FFF8E3',
      alignSelf:'center',
      borderWidth:1   

    },
    filebox: {
      marginTop: 20,
      borderRadius: 15,
      padding: 10,
      width:'90%',
      height:80,
      backgroundColor:'#FFF8E3',
      alignSelf:'center',
      borderWidth:1
    },
    label: {
      paddingBottom:5,
      fontSize: 18,
      marginTop: 5,
      marginLeft:50,
      marginRight: 50,
      color: '#0C2D57', // Medium gray text color
    },
    value: {
      flex: 1,
      color: '#444', // Dark gray text color
    },
  });
  
export {styles}