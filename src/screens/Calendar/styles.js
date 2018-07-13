import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    header: {
        height: 60,
        width: width,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        justifyContent:  'center',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomColor: '#19A536',
        borderBottomWidth: 1
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
        width: 120,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    inputView1: {
        height: 40,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    },
    subView: {
        height: 40,
        width: width-48,
        paddingHorizontal: 4,
        justifyContent: 'space-around',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        alignItems:'center',
    },
    subContant:{
        height: 280,
        width: width-48,
        paddingHorizontal: 4,
        justifyContent: 'space-around',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    },
    iconstyle :{
        marginTop: 8,
        marginRight: 5,
        color: '#C7C7C7'
    },
    textInput: {
        width: width-48,
        fontSize: 14,
        marginBottom: -2
    },
    subTitle:{        
        fontSize: 18,
        marginBottom: -2,
        alignItems:'center'
    },
    subtext:{
        flex:1,
        width: width-60,
        fontSize: 14,
        marginBottom: -2,
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    dateInput:{
        fontSize: 14,
        marginBottom: -2,
    },
    datestyles:{
        flex:1,
        flexDirection: 'row', 
        marginLeft:24
        
    },
    slide1: {
        backgroundColor:'#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
        paddingRight:10,
        borderTopColor: '#19A536',
        borderTopWidth: 1
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
        width: 150,
        height: 150,
        justifyContent:'center',
        alignItems: 'center'
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '500'
    },
})