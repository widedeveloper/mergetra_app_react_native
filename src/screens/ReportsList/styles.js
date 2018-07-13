import {StyleSheet } from 'react-native';
import {Dimensions} from 'react-native'
let {width, height} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    header: {
        height: 60,
        width: width,
        backgroundColor:'#fff',
        flexDirection: 'row',
        justifyContent:  'center',
        alignItems: 'center',
        marginBottom: 5,
        borderBottomColor: '#19A536',
        borderBottomWidth:1
    },
    backIcon: {
        position: 'absolute',
        left: 16
    },
    closeIcon:{
        position: 'absolute',
        right: 16
    },

    headerTitle: {
        fontSize: 30,
        fontWeight: '500',
        color: '#000',
        marginLeft: 60,
        fontFamily: 'Times New Roman'
    },
    headerTitle_home: {
        fontSize: 24,
        fontWeight: '500',
        color: '#212123'
    },
    title: {
        fontWeight:'300',
        color: 'black',
        marginLeft: 40,
        marginVertical: 16,
        //alignSelf: 'center',
        fontSize:20,
        fontFamily:'bold'
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
        justifyContent: 'space-around',
    },
    locationName: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '200',
        marginLeft: 3
    },
    schedulename: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '200',
        textAlignVertical:'bottom'
    },
    CompanyTitle :{
        alignSelf: 'center',
        alignItems:'center',
        color: '#C7C7C7',
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 20       
    },
    CompanyTitle1 :{
        alignSelf: 'center',
        alignItems:'center',
        color: '#C7C7C7',
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 8       
    },
    dupView: {
        width: (width-16)/4,
        height: 42,
        justifyContent: 'space-around',
        borderColor: '#C7C7C7',
        borderWidth: 1,
        alignSelf: 'center',
        alignItems:'center'
        
    },
    locationView : {
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: width-16,
        
    },
    statecotainer :{
        backgroundColor:'#0C3F52',
        height:130
    },
    inputView: {
        height: 40,
        paddingHorizontal: 8,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        justifyContent: 'center',
    },
    textInput: {
        
        width: width-48,
        fontSize: 16,
        marginBottom: -6
    },
    tableTitle : {
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: width-16,
        height:50,
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 1,
    },
    tableView : {
        justifyContent: 'space-around',
        alignSelf: 'center',
        flexDirection: 'row',
        width: width-16,
        height:40,
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 0.5,
    },
    DetailRow :{
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems:'center',  
        flexDirection: 'row',
        width: width-40,
        height:30,
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 0.5,
        backgroundColor:'#f9f9f9',
    },
    DetailTitle :{
        flexDirection: 'row',
        width: (width-40)*1/3,
        height: 20,
        marginLeft:10,  
    },
    DetailAttach:{
        flexDirection: 'row',
        height: 20,
        marginLeft:5,  
    },
    attachView:{
        justifyContent: 'space-around',
        alignItems:'center',  
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: (width-40)*1/3,
    },
    DetailText :{
        flexDirection: 'row',
        width: (width-40)*2/3,
        height: 20,
        marginLeft:10,  
    },
    tableCols1: {
        width: (width-16)*2/5,
        height: 20,
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems:'center'        
    },
    tableCols3: {
        flexDirection: 'row',
        width: (width-16)*2/5,
        height: 20,
        alignSelf: 'center',
        marginLeft:10,     
    },
    tableCols2: {
        width: (width-16)/5,
        height: 20,
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems:'center'        
    },
    titleName: {
        fontSize: 14,
        fontWeight: '300',
        marginLeft: 3
    },
    tableText: {
        fontSize: 14,
        fontWeight: '300',
        marginLeft: 3
    },
    forgotTitle: {
        fontSize: 16,
        fontWeight:'300',
        color: '#41cab7',
        marginLeft: 32,
        marginVertical: 16
    },
    createText: {
        fontSize: 16,
        fontWeight:'300',
        color: '#41cab7',       
        marginTop: 30,
        alignSelf: 'center'
    },
    drawerContent:{
        //width:width*2/3,
        height: height,
        backgroundColor:'#FFFFFF',
        shadowColor: 'black',      
        shadowOffset:{
            width:-5,
            height:0
        },        
        shadowRadius: -5,
        shadowOpacity:1,
        elevation:10 ,
       // paddingLeft: 10,
        paddingTop: 20
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:12
    },
    menuView: {
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        paddingVertical:15,
        backgroundColor:'white',
        paddingLeft: 20
    },
    BottomBorder: {
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 0.5,
        width:width*2/3-40,
        alignSelf: 'flex-end'
    },
    menuText: {
        color: '#212123',
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 20
    },
    image: {
        resizeMode:'cover',
        flex:1
    },
    logoimage: {
        width: 150,
        height: 150,
        justifyContent:'center',
        alignItems: 'center'
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
})