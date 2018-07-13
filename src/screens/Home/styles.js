import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    wrapper: {
        width: '100%',
        height: '50%'
    },
    slide:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
       
    },
    slide1: {
     
        justifyContent: 'center',
        alignItems: 'center',

    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
      
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    loginButton: {
        // position: 'absolute',
        width: 70,
        height:35,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: '#e7f5f7',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 60,
        alignSelf: 'flex-end',
        marginRight: 15
    },
    loginText: {
        color: '#66b6cb',
        fontSize: 15,
        fontWeight: '500'
    },
    image: {
        width:width,
        height: (width),
        justifyContent:'center',
        alignItems: 'center'
    },
    logoText: {
        color: 'white',
        fontSize: 29,
        fontWeight: 'bold',
        fontFamily: 'Roboto'
    }
    
})