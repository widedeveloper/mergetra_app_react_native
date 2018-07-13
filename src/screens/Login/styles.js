import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000000'
    },
    header: {
        height: 60,
        width: width,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        justifyContent:  'center',
        alignItems: 'center',
        marginBottom: 33,
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
    inputView: {
        height: 40,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconstyle :{
        marginTop: 8,
        marginRight: 5,
        color: '#C7C7C7'
    },
    textInput: {
        width: width-140,
        fontSize: 14,
        marginBottom: -2
    },
    slide1: {
        backgroundColor:'#000',
        justifyContent: 'center',
        alignItems: 'center',
        height: 270,

    },
    forgotTitle: {
        fontSize: 12,
        fontWeight:'300',
        color: '#3490E9',
        marginVertical: 10,
        alignSelf:'center'
    },
    createText: {
        fontSize: 16,
        fontWeight:'300',
        color: '#41cab7',       
        marginTop: 30,
        alignSelf: 'center'
    },
    validView: {
        width: width-32,
        height: 40,
        backgroundColor: '#FEF9B7',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        alignSelf: 'center'
    },
    cotainTEXT:{
        width: width-32,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom:20
    },
    loadinView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    image: {
        width:300,
        height: 280,
        justifyContent:'center',
        alignItems: 'center'
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '500'
    },
    conTitle:{
        fontFamily:'Roboto-Regular',
        color: '#adadad',
        fontSize: 17,
        fontWeight: '400'        
    },
    conTitleSM:{
        fontFamily:'Roboto-Regular',
        color: '#adadad',
        fontSize: 8,
        fontWeight: '400',
        marginTop:-9,
    }
})