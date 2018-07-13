

import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        width: 150,
        backgroundColor:'#194B70',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf :'center',
        paddingVertical: 5
    },
   
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '200',
    },
   
})