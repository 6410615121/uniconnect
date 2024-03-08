import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    label: {
      fontWeight: 'bold',
      marginRight: 5,
      color: '#666', // Medium gray text color
    },
    value: {
      flex: 1,
      color: '#444', // Dark gray text color
    },
  });
  
export {styles}