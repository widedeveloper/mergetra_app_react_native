import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Button from '../../components/button';
import axios from 'axios';
import PDFView from 'react-native-view-pdf';
import ImagePicker  from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import { captureRef, captureScreen } from "react-native-view-shot";
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import QS from 'qs';
import { AsyncStorage } from "react-native"

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        var DetailData = params.DetailData;
        var propsToken = params.token;
        this.state={
            start_date: '',
            DetailData:null,
            avatarSource:'',
            token:propsToken,
            propsData:DetailData,
            modalVisible: false,
            PDFUrl:'',
            filekey:'',
            pageinfo:'',
            attachmentData:[],

            signature_flag:false,
            imageURI:null,
            value:{
                format: "jpg",
                quality: 0.8,
                result:'base64',
                snapshotContentContainer:false
            }

        }
    }
  handleEmail = () => {
    Mailer.mail({
      subject: '',
      recipients: [''],
      ccRecipients: [''],
      bccRecipients: [''],
      body: '',
      isHTML: true,
      attachment: this.state.attachmentData
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }


    setModalVisible(visible){
        this.setState({modalVisible:visible})
    }
    componentWillMount(){

                fetch('http://mergetransit.com/api/api_detailsdata', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.token}`,
                        },
                        body: JSON.stringify({
                            detail_id: this.state.propsData.id,
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    }
                    console.log(responseJson);
                    this.setState({DetailData:responseJson.data[0]})
                })
                .catch((error) => {
                        alert(error);
                });

                AsyncStorage.getItem('pageinfo', (err, result)=>{
                    this.setState({pageinfo:result})
                })



    }
    captureScreenFunction= refname =>()=>
            (
                refname?
                captureRef(this.refs[refname], this.state.value)
                : captureScreen(this.state.value)
            )
            .then(
                res =>(
                    this.setState({ imageURI : res }),
                    console.log(res)

                )
            )
            .catch(
                error =>(
                    console.warn(error)
                )
            )

    render(){
        return(
            
            <View ref="capturecon" style={styles.containerV}>
            
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Details</Text>
                </View>
                {
                    this.state.DetailData?
                     <ScrollView>
                    <View style={[styles.DetailView,{marginTop:10}]}>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Company :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.company}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Contact :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.contact}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>PO# :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.po}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Pu Date :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.put_date}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Del Date :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.del_date}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Origin :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.origin}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Destination :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.destination}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Weight :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.weight}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>DHO :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.dho}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>RPM :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.rpm}</Text>
                        </View>                                                                
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>DH RPM :</Text>
                            <Text style={styles.DetailTitle}>{this.state.DetailData.dh_rpm}</Text>
                        </View>
                        <View style={styles.DetailRow}>
                            <Text style={styles.DetailTitle}>Attach :</Text>
                            {
                                this.state.DetailData.upload===''? 
                                <Text style={[styles.DetailTitle]}></Text> :
                                <View style={styles.attachView}>
                                {
                                    this.attachfile(this.state.DetailData.upload).length>0?
                                        this.attachfile(this.state.DetailData.upload).map((value, key)=>{
                                            return(
                                                <TouchableOpacity onPress={()=>this.showPDFView(value,key)} key={key}>
                                                    <Text style={[styles.DetailAttach,{color:'#31b131'}]}>{`File${key}`}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    :<Text style={[styles.DetailTitle]}></Text>
                                }
                                </View>
                            }
                                    
                                
                        </View>
                </View>
                <View style={styles.btnRowstyle}>
                    {
                        this.state.pageinfo=='invoice'?
                            <Button text={'Generate Invoice'} style={styles.btnStyle} onPress={()=>this.generateInvoice()}/>
                        :
                            <Button text={'Image Upload'} style={styles.btnStyle} onPress={()=>this.imageUplaod()}/>
                    }                    
                    <Button text={'Send Email'} style={styles.btnStyle} onPress={()=>this.Sendemail()}/>
                </View>
                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
                </ScrollView>
                :
                <View style={styles.horizontal}>
                       <ActivityIndicator size='small'color='#0000ff' />
                </View>
                }

                    <Modal animationType='slide' transparent={false} visible={this.state.modalVisible} >
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={()=>this.filedelte()} style={styles.backIcon}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible)} style={styles.closeIcon}>
                                        <Icon name='ios-close' size={30} color='#212123'/>
                                    </TouchableOpacity>
                                    <Text style={styles.headerTitle_home}>{this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?'PDF-m':'Image-m'}</Text>
                                </View>
                                {
                                    this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?
                                   
                                                <View  style={{ flex: 1, flexDirection: "column" }}>
                                                    <PDFView
                                                        style={styles.pdfview}
                                                        onError={(error) => console.log('onError', error)}
                                                        onLoad={() => console.log('PDF rendered from base 64 data')}
                                                        resource= {`${this.state.PDFUrl}`}
                                                        resourceType= 'url'
                                                    />
                                                    {
                                                        this.state.signature_flag?
                                                        <SignatureCapture
                                                            style={styles.signature}
                                                            ref="sign"
                                                            onSaveEvent={this._onSaveEvent}
                                                            onDragEvent={this._onDragEvent}
                                                            saveImageFileInExtStorage={false}
                                                            showNativeButtons={false}
                                                            showTitleLabel={false}
                                                            viewMode={"portrait"}/>
                                                        :null
                                                    }
                                                    <View style={{ position:'absolute',bottom:0, flexDirection: "row" }}>
                                                        {
                                                            this.state.signature_flag?
                                                            <TouchableOpacity style={styles.buttonStyleOn}
                                                                onPress={() => { this.signOnOff() } } >
                                                                <Text style={{color:'#FFFFFF'}}>Sign</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity style={styles.buttonStyle}
                                                                onPress={() => { this.signOnOff() } } >
                                                                <Text>Sign</Text>
                                                            </TouchableOpacity>
                                                        }                                                        
                                                        <TouchableOpacity style={styles.buttonStyle} onPress={this.captureScreenFunction('capturecon')} >
                                                            <Text>Send Email</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                    :
                                    <Image source={{uri: this.state.PDFUrl}} style={styles.modalimage}  ></Image>
                                }
                                
                            </View>
                    </Modal>
            </View>
           
        )
    }
    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }
    signOnOff(){
        this.setState({signature_flag:!this.state.signature_flag})
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
    }
    _onDragEvent() {
         // This callback will be called when the user enters signature
        console.log("dragged");
    }


    Sendemail(){        

            var attachfiles=[]
            var index=0
            let paths = this.state.DetailData.upload
            let paths_uri = paths.split(',')
                if(paths_uri.length>0){
                    paths_uri.map((value, key)=>{


                        filenameget = value
                        str = filenameget.split('/')
                        filename = str[str.length-1]

                        str_name_str = filename.split('.')
                        file_type = str_name_str[1]
                        file_name = str_name_str[0]
                        
                        //let dirs = RNFetchBlob.fs.dirs
                        RNFetchBlob.config({
                            filecache : true,
                            path : RNFS.ExternalStorageDirectoryPath +'/'+filename
                        })
                        .fetch('GET', value, {

                        })
                        .then((res) => {
                            console.log('the file saved to ', res.path());
                            ++index 
                            attachfiles.push({
                                        path: res.path(),  // The absolute path of the file from which to read data.
                                        type: file_type,   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                                        name: file_name   // Optional: Custom filename for attachment
                            })

                            if(paths_uri.length == index){
                                console.log("_____________________________", attachfiles);
                                this.setState({attachmentData:attachfiles})
                                this.handleEmail()
                            }

                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    })
                }else{
                    this.handleEmail()
                }
    }


    showPDFView(PDFUrl, key){
        if(PDFUrl==='') return
        
        this.setState({PDFUrl: encodeURI(PDFUrl), filekey:key})
        if(PDFUrl.toLowerCase().indexOf('.pdf') > -1)
            this.props.navigation.navigate('Filesview', {PDFUrl:encodeURI(PDFUrl), filekey:key, token:this.state.token, detail_id: this.state.DetailData.id})
        else
            this.setState({modalVisible:true})
    }
    attachfile(str){
        return  str.split(',');
    }
    filedelte(){
        Alert.alert(
            'Delete Image',
            'Are you sure ?',
            [
                {text:'Cancel'},
                {text:'OK', onPress:()=>this.okbtn()}
            ],
            {cancelable:false}
        )
    }
    okbtn(){
                this.setState({modalVisible:false})
                
                fetch('http://mergetransit.com/api/api_delete_file', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.token}`,
                        },
                        body: JSON.stringify({
                            detail_id: this.state.DetailData.id,
                            no: this.state.filekey
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    }
                    alert('File deleted successfully.')
                    this.setState({DetailData:responseJson.data[0]})

                })
                .catch((error) => {
                        alert(error);
                }); 
    }

    generateInvoice(){
        
    }


    imageUplaod(){        
        var options = {
                title: 'Select Avatar',
                customButtons: [
                    {name: 'fb', title: 'Choose Photo from Facebook'},
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };
                
                // You can also display the image using data:
                let source = { uri: response.data };
                console.log(this.state.DetailData.id);
                fetch('http://mergetransit.com/api/api_imageupload', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.token}`,
                        },
                        body: JSON.stringify({
                            detail_id: this.state.DetailData.id,
                            imageupload: response.data
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    }

                    alert('upload successfully')
                    this.setState({DetailData:responseJson.data[0]})

                })
                .catch((error) => {
                        alert(error);
                });  
                console.log(this.state.DetailData.id);
                this.setState({
                    avatarSource: response.data
                });
            }
        });
    }
}