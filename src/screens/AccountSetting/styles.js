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
        marginBottom: 25,
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
    headerTitle_home: {
        fontSize: 24,
        fontWeight: '500',
        color: '#212123'
    },
    closeIcon:{
        position: 'absolute',
        right: 16
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
    imageinputView: {
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    secondRow : {
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: width-16,
    },
    checkbox:{
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: (width-56)/2,
        backgroundColor:'#009688',
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        height:32
    },
    checkboxText:{
        width:width-76,
        color: '#fff',
        fontSize: 13,
        fontWeight: '200',
    },
    imagetext:{
        width:width-146,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.3)',
        height:40,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    uploadbtn:{
        width:106,
        height:40,
        backgroundColor:'#337ab7',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    modalimage: {
        resizeMode:'cover',
        flex:1
    },
    viewbtn:{
        width:106,
        height:40,
        backgroundColor:'#009688',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    inputView2: {
        height: 40,
        width:(width-56)/2,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    },
    inputView3: {
        height: 40,
        width:(width-70)/3,
        paddingHorizontal: 4,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
    },
    iconstyle :{
        marginRight: 5,
        width:40,
        color: '#C7C7C7'
    },
    textInput: {
        width: width-48,
        fontSize: 14,
        marginBottom: -2
    },
    imagefilename:{
        fontSize: 16,
        marginTop: 6,
        marginLeft:10,
        fontWeight: '300',
    },
    uploadbtnText:{
        fontSize: 16,
        marginTop: 7,
        fontWeight: '200',
        alignSelf: 'center',
        color:'#fff'      
    },
    dateInput:{
        width: (width-48)/2-16,
        fontSize: 14,
        marginTop: 10,
    },
    datestyles:{
        alignSelf: 'center',
        marginLeft:20,
        flex:1,
        flexDirection: 'row', 
        justifyContent: 'center',
    },
    locationPreview: {
        alignSelf: 'center',
        width: width-32,
        height:42,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'rgba(0,0,0,0.2)',
        borderBottomWidth: 0.5,
        backgroundColor:'white',
        paddingLeft: 10,
        borderRightWidth:0.5,
        borderRightColor: 'rgba(0,0,0,0.2)',
        borderLeftWidth: 0.5,
        borderLeftColor: 'rgba(0,0,0,0.2)',
    },
    locationName: {
        fontSize: 15,
        color: '#212123',
        fontWeight: '400',
        marginLeft: 8
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
    buttonStyle: {
        flex:1,
        justifyContent: "center", 
        alignItems: "center", 
        marginTop:25,
        marginBottom:15
    },
    btnRowstyle: {
        flex:1,
        justifyContent: 'space-around',
        flexDirection: "row",
        //width:width-16
    }
})