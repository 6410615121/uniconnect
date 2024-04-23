import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//       padding: 20,
//     },
//     course: {
//       marginBottom: 20,
//       borderWidth: 2,
//       borderColor: '#ccc',
//       borderRadius: 5,
//       padding: 10,
//       marginLeft:10,
//       width:160,
//       height:120,
//       backgroundColor:'#FFF'
//     },
//     title: {
//       fontSize: 18,
//       fontWeight: 'bold',

//     },
//     description: {
//       fontSize: 14,
//     },
//   });

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  course_container: {
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 20,
    // padding: 20,
    marginLeft:10,
    width:160,
    height:150,
    backgroundColor:'#FFF',
    overflow:'hidden'
  },
  course_header: {
    width:'100%', 
    height:40,
    padding: 7,
    paddingLeft: 10
  },
  course_text_box: {
    padding: 10,
    flexDirection: "column",
  },
  courseID: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
  ,
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    height: 65
  },
  description: {
    // marginTop: 3,
    fontSize: 13,
    fontWeight: 'bold',
    height: 30,
    color: '#707070'
  },
});

export {styles}