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
  CheckBox,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import moment from 'moment';
import ImagePicker  from 'react-native-image-picker';
import PDFView from 'react-native-view-pdf';
import RNFetchBlob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import axios from 'axios';
import QS from 'qs';


export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        var user_info = params.user_info;
        this.state={
            company: user_info.companyname,
            firstName: user_info.firstname,
            lastName: user_info.lastname,
            phone: user_info.phone,
            description: user_info.description,
            imagepath:user_info.image_path,
            zipcode:'',
            city:'',
            address:'',
            state:'',

            addressdata:[],
            addressValid:false,
            companyValid:false,
            firstNameValid:false,
            lastNameValid:false,
            phoneValid:false,
            descriptionValid:false,
            submitValid:false,
            
            showAddress: false,
            
            wq_photo:false,
            insurance_photo:false,
            authority_photo:false,
            misc_photo:false,

            user_data: user_info,
            attachmentData:[],

            modalVisible: false,
            PDFUrl:'',
            filekey:''
        }
    }
    setModalVisible(visible){
        this.setState({modalVisible:visible})
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

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.backbtn()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Account</Text>
                </View>
                <ScrollView>
                {
                    this.state.user_data.isActive==="0"?
                    <View style={styles.validView}>
                        <Text>Account Requires Activation.</Text>
                        <Text>Our Agent Will Contact You Shortly</Text>
                    </View>
                    :null
                }                 

                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Company'
                        onChangeText={(company)=>this.company(company)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.company}
                        style = {styles.textInput}
                    />
                </View>
                {
                    this.state.companyValid?
                    <View style={styles.validView}>
                        <Text>Please enter a company.</Text>
                    </View>:null
                }
                <View  style={styles.secondRow}>
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='First Name'
                            onChangeText={(firstName)=>this.firstName(firstName)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.firstName}
                            style = {styles.textInput}
                        />
                    </View>
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='Last Name'
                            onChangeText={(lastName)=>this.lastName(lastName)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.lastName}
                            style = {styles.textInput}
                        />
                    </View>
                </View>
                {
                    this.state.firstNameValid || this.state.lastNameValid?
                    <View style={styles.validView}>
                        <Text>Please enter a firstname and lastname.</Text>
                    </View>:null
                }                
                
                 
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='MC#'
                        onChangeText={(description)=>this.description(description)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.description}
                        style = {styles.textInput}
                    />
                </View>
                {
                    this.state.descriptionValid?
                    <View style={styles.validView}>
                        <Text>Please enter a MC#.</Text>
                    </View>:null
                }                
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Phone'
                        onChangeText={(phone)=>this.phone(phone)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.phone}
                        style = {styles.textInput}
                        keyboardType='numeric'
                    />
                </View>
                {
                    this.state.phoneValid?
                    <View style={styles.validView}>
                        <Text>Please enter a phone number.</Text>
                    </View>:null
                }
                
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Address'
                        onChangeText={(address)=>this.address(address)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.address}
                        style = {styles.textInput}
                    />
                </View>
                {
                        this.state.addressdata.length>0&&this.state.showAddress?
                        this.state.addressdata.map(item=>{
                            return(
                                <TouchableOpacity onPress={()=>this.getaddress(item)}>
                                    <View style={styles.locationPreview}>
                                        <Icon name='ios-pin' size={20} color='rgba(0,0,0,0.3)' />
                                        <Text style={styles.locationName}>{item.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }):null
                }
                <View  style={styles.secondRow}>
                    <View style={[styles.inputView3,{marginTop:10}]}>
                        <TextInput 
                            placeholder='City'
                            value = {this.state.city}
                            editable={false}
                            style = {styles.textInput}
                        />
                    </View>
                    <View style={[styles.inputView3,{marginTop:10}]}>
                        <TextInput 
                            placeholder='State'
                            value = {this.state.state}
                            editable={false}
                            style = {styles.textInput}
                        />
                    </View>
                    <View style={[styles.inputView3,{marginTop:10}]}>
                        <TextInput 
                            placeholder='ZipCode'
                            value = {this.state.zipcode}
                            editable={false}
                            style = {styles.textInput}
                        />
                    </View>
                </View>
                {
                    this.state.addressValid?
                    <View style={styles.validView}>
                        <Text>Please enter a address.</Text>
                    </View>:null
                }
                
                
                <View style={[styles.imageinputView,{marginTop:10}]}>
                    <View  style ={styles.imagetext}>
                            <Text style ={styles.imagefilename}>W9 Image</Text>
                    </View>
                    {
                        this.state.imagepath.indexOf("WQ")>-1 || this.state.wq_photo ?
                        <TouchableOpacity  onPress={()=>this.imageView("WQ")}>
                            <View style ={styles.viewbtn}>
                                <Text style ={styles.uploadbtnText}>View</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  onPress={()=>this.imageupload("WQ")}>
                            <View style ={styles.uploadbtn}>
                                <Text style ={styles.uploadbtnText}>Upload</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.imageinputView,{marginTop:10}]}>
                    <View  style ={styles.imagetext}>
                            <Text style ={styles.imagefilename}>Insurance Image</Text>
                    </View>
                    {
                        this.state.imagepath.indexOf("Insurance")>-1 || this.state.insurance_photo ?
                        <TouchableOpacity  onPress={()=>this.imageView("Insurance")}>
                            <View style ={styles.viewbtn}>
                                <Text style ={styles.uploadbtnText}>View</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  onPress={()=>this.imageupload("Insurance")}>
                            <View style ={styles.uploadbtn}>
                                <Text style ={styles.uploadbtnText}>Upload</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.imageinputView,{marginTop:10}]}>
                    <View  style ={styles.imagetext}>
                            <Text style ={styles.imagefilename}>Authority Image</Text>
                    </View>
                    {
                        this.state.imagepath.indexOf("Authority")>-1 || this.state.authority_photo ?
                        <TouchableOpacity  onPress={()=>this.imageView("Authority")}>
                            <View style ={styles.viewbtn}>
                                <Text style ={styles.uploadbtnText}>View</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  onPress={()=>this.imageupload("Authority")}>
                            <View style ={styles.uploadbtn}>
                                <Text style ={styles.uploadbtnText}>Upload</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                <View style={[styles.imageinputView,{marginTop:10}]}>
                    <View  style ={styles.imagetext}>
                            <Text style ={styles.imagefilename}>Misc(factoring) Image</Text>
                    </View>
                    {
                        this.state.imagepath.indexOf("Misc")>-1 || this.state.misc_photo ?
                        <TouchableOpacity  onPress={()=>this.imageView("Misc")}>
                            <View style ={styles.viewbtn}>
                                <Text style ={styles.uploadbtnText}>View</Text>
                            </View>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  onPress={()=>this.imageupload("Misc")}>
                            <View style ={styles.uploadbtn}>
                                <Text style ={styles.uploadbtnText}>Upload</Text>
                            </View>
                        </TouchableOpacity>
                    }
                </View>
                   
                <View style={styles.btnRowstyle}>
                    <Button text={'Update'} style={styles.buttonStyle} onPress={()=>this.submit_btn()}/>
                    <Button text={'Send Email'} style={styles.buttonStyle} onPress={()=>this.SendEmail()}/>
                </View>
                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
                </ScrollView>
                   <Modal animationType='slide' transparent={false} visible={this.state.modalVisible} >
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={()=>this.filedelte()} style={styles.backIcon}>
                                        <Text>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible)} style={styles.closeIcon}>
                                        <Icon name='ios-close' size={30} color='#212123'/>
                                    </TouchableOpacity>
                                    <Text style={styles.headerTitle_home}>{this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?'PDF':'Image'}</Text>
                                </View>
                                {
                                    this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?
                                    <PDFView
                                        style={{ flex: 1 }}
                                        onError={(error) => console.log('onError', error)}
                                        onLoad={() => console.log('PDF rendered from base 64 data')}
                                        resource= {`${this.state.PDFUrl}`}
                                        resourceType= 'url'
                                    />
                                    :
                                    <Image source={{uri: this.state.PDFUrl}} style={styles.modalimage}  ></Image>
                                }
                                
                            </View>
                    </Modal>
            </View>
            
        )
    }


    company(company){
        company.length===0?this.setState({company: company,companyValid:true}):this.setState({company: company,companyValid:false})
    }
    firstName(firstName){
        firstName.length===0?this.setState({firstName: firstName, firstNameValid:true}):this.setState({firstName: firstName, firstNameValid:false})
    }
    lastName(lastName){
        lastName.length===0?this.setState({lastName: lastName, lastNameValid:true}):this.setState({lastName: lastName, lastNameValid:false})
    }
    description(description){
        description.length===0?this.setState({description: description, descriptionValid: true}):this.setState({description: description, descriptionValid: false})
    }
    phone(phone){
        phone.length===0?this.setState({phone: phone, phoneValid:true}):this.setState({phone: phone, phoneValid:false})
    }

    filedelte(){
        Alert.alert(
            'Delete File',
            'Are you sure ?',
            [
                {text:'Cancel'},
                {text:'OK', onPress:()=>this.okbtn()}
            ],
            {cancelable:false}
        )
    }
    
    
    
    address(location){
        this.setState({address: location, showAddress: true})
        let query = {
            key: 'AIzaSyAr1HliRAne44OuG55a6FOOornx_dHgBjA',
            language: 'en',
            types: 'address'
        };
        let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'+QS.stringify({
            key: query.key,
            input: location,
            types: 'address',
            components:'country:us'
        })
        
            axios.get(url)
            .then(responseJson=>{
                console.log('++--address-------',responseJson.data)
                this.setState({addressdata: responseJson.data.predictions})
            })
            .catch(error=>{
                alert(error)
            })
    }
    getaddress(data){
        this.setState({address: data.structured_formatting.main_text, showAddress:false})
        var index = data.terms.length
        this.setState({city: data.terms[index-3].value,state:data.terms[index-2].value})
        this.getzipcode(data.place_id)
    }
    getzipcode(placeid){
        let query = {
            key: 'AIzaSyAr1HliRAne44OuG55a6FOOornx_dHgBjA',
            language: 'en',
            types: 'address'
        };
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?'+QS.stringify({
            placeid: placeid,
            key: query.key            
            
        })
        
            axios.get(url)
            .then(responseJson=>{
                console.log("zipcode----------------", responseJson)
                
                let zipcode=responseJson.data.result.address_components.filter(d=>{
                    return d.types[0]==='postal_code'
                })[0]
                if(!zipcode) this.setState({zipcode:'', addressValid: true})
                else this.setState({zipcode: zipcode.long_name, addressValid: false})
            })
            .catch(error=>{
                alert(error)
            })
    }

    okbtn(){
                this.setState({modalVisible:false})
                
                fetch('http://mergetransit.com/api/api_customerimagedelete', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.user_data.token}`,
                        },
                        body: JSON.stringify({
                            customer_id: this.state.user_data.customersID,
                            strkey: this.state.filekey
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    }
                    alert('File deleted successfully.')
                    this.setState({user_data:responseJson.success,imagepath:responseJson.success.image_path})

                })
                .catch((error) => {
                        alert(error);
                }); 
    }


    SendEmail(){        

            var attachfiles=[]
            var index=0
            let paths = this.state.imagepath
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


    imageView(str){
        let imagePath = this.state.imagepath

       
        res = imagePath.split(",");

            const findData = res.find(item=>{
                return item.indexOf(str)>-1
            })
            if(findData){
                this.setState({PDFUrl:encodeURI(findData),modalVisible: true,filekey:str});
                 console.log(findData);
            }
    }

    imageupload(str){
        let filename = str;      
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
                let source = { uri: response.data };
                
                fetch('http://mergetransit.com/api/api_imageuploadcustome', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.user_data.token}`,
                        },
                        body: JSON.stringify({
                            customer_id: this.state.user_data.customersID,
                            filename: filename,
                            imageupload: response.data,
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    } 
                    alert('Upload successfully')
                    this.setState({user_data:responseJson.success,imagepath:responseJson.success.image_path})

                })
                .catch((error) => {
                        alert(error);
                });  
            }
        });
    }


    backbtn(){
        if(this.state.user_data.isActive!="0")
            this.props.navigation.navigate('Setting', {user_info:this.state.user_data})
        else
            this.props.navigation.goBack()
    }



    submit_btn(){
        this.company(this.state.company)
        this.firstName(this.state.firstName)
        this.lastName(this.state.lastName)
        this.description(this.state.description)
        this.phone(this.state.phone)


        if (!this.state.companyValid && !this.state.firstNameValid && !this.state.lastNameValid && !this.state.descriptionValid  && !this.state.phoneValid){

                    fetch('http://mergetransit.com/api/api_customerupdate', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.state.user_data.token}`,
                            },
                            body: JSON.stringify({
                                customer_id:this.state.user_data.customersID,
                                user_id:this.state.user_data.userId,
                                company: this.state.company,
                                firstname: this.state.firstName,
                                lastname: this.state.lastName,
                                desc: this.state.description,
                                phone: this.state.phone,                                
                            }),
                        })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.error){
                            return;
                        }
                            alert('update Successful.')
                            console.log(responseJson) 
                            this.setState({user_data:responseJson.success,imagepath:responseJson.success.image_path})
                    })
                    .catch((error) => {
                        alert(error);
                    });  
        }
        else return
 
    }
}