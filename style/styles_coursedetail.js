import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#f5f5f5', // Light gray background color
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
    filebox: {
      marginTop: 20,
      borderWidth: 2,
      borderColor: '#ccc',
      borderRadius: 20,
      padding: 10,
      width:"auto",
      height:"auto",
      backgroundColor:'#FFF',
    },
    label: {
      fontWeight: 'bold',
      fontSize: 17,
      marginTop: 15,
      marginRight: 5,
      color: '#666', // Medium gray text color
    },
    value: {
      flex: 1,
      color: '#444', // Dark gray text color
    },
  });
  
export {styles}