import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    header: {
        height: 60,
        width: width,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        justifyContent:  'center',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomColor: 'rgba(33,33,33,0.4)',
        borderBottomWidth:0.5
    },
    backIcon: {
        position: 'absolute',
        left: 16
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: '#212123'
    },
    title: {
        fontSize: 16,
        fontWeight:'300',
        color: 'black',
        marginLeft: 16,
        marginVertical: 16
    },
    textView:{
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width:width-24
    },
    lineView:{
        width:width-24,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop:7,
        marginBottom:7
    },
    colView:{
        width:(width-164)
    },
    colView_one:{
        width:130,
    },
    colView_two:{
        width:90,
    },
    colView_three:{
        width:(width-244),
    },
    textInput: {
        fontSize:12,
        fontWeight:'300'
    },
    textInput1:{
        fontSize:22,
        fontWeight:'300',
        marginLeft:12,
        marginBottom:10,
        marginTop:20
    },
    image: {
        width:140,
        height: 50,
    },


    
})