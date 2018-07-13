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
  ImageBackground,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/button';
import moment from 'moment';
import axios from 'axios';
import QS from 'qs';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props){
        super(props)
        this.state={
            company: '',
            firstName: '',
            lastName:'',
            phone:'',
            email:'',
            description:'',
            password:'',
            address:'',
            addressdata:[],
            city:'',
            state:'',
            zipcode:'',

            addressValid:false,
            companyValid:false,
            firstNameValid:false,
            lastNameValid:false,
            phoneValid:false,
            descriptionValid:false,
            emailValid:false,
            passwordValid:false,
            submitValid:false,
            wq_photo:'',
            insurance_photo:'',
            authority_photo:'',
            showAddress: false,
            misc_photo:'',
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Register</Text>
                </View>
                <ScrollView>                 
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
                        placeholder='Email'
                        onChangeText={(email)=>this.email(email)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.email}
                        style = {styles.textInput}
                    />
                </View>
                {
                    this.state.emailValid?
                    <View style={styles.validView}>
                        <Text>Please enter a email address.</Text>
                    </View>:null
                }                
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Password'
                        onChangeText={(password)=>this.password(password)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.password}
                        style = {styles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                {
                    this.state.passwordValid?
                    <View style={styles.validView}>
                        <Text>Please enter a 6-character password.</Text>
                    </View>:null
                }   
                <Button text={'Submit'} style={{marginTop:15,marginBottom:15}} onPress={()=>this.submit_btn()}/>

                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
                </ScrollView>
            </View>
            
        )
    }
    getaddress(data){
        this.setState({address: data.structured_formatting.main_text, showAddress:false})
        var index = data.terms.length
        this.setState({city: data.terms[index-3].value,state:data.terms[index-2].value})
        this.getzipcode(data.place_id)
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
    email(email){
        this.setState({email: email})
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            this.setState({emailValid: false,submitValid:true})
        }else{
            this.setState({emailValid: true,submitValid:false})
        }
    }
    password(password){
        this.setState({password: password})
        if(password.length>=6) this.setState({passwordValid: false,submitValid:true})
        else this.setState({passwordValid: true,submitValid:false})
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
                else this.setState({zipcode: zipcode.long_name})
            })
            .catch(error=>{
                alert(error)
            })
    }

    submit_btn(){
        this.company(this.state.company)
        this.firstName(this.state.firstName)
        this.lastName(this.state.lastName)
        this.description(this.state.description)
        this.phone(this.state.phone)
        this.email(this.state.email)
        this.password(this.state.password)
        if(this.state.zipcode='') 
        this.setState({addressValid:true})

if(this.state.zipcode=='' || this.state.company=='' || this.state.firstName=='' || this.state.lastName=='' || this.state.description=='' || this.state.phone=='' ||  this.state.email=='' || this.state.password=='')
    return;



        if (!this.state.companyValid && !this.state.firstNameValid && !this.state.lastNameValid && !this.state.descriptionValid 
            && !this.state.phoneValid && !this.state.emailValid && !this.state.passwordValid && !this.state.addressValid ){

                    fetch('http://mergetransit.com/api/api_signup', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                company: this.state.company,
                                firstname: this.state.firstName,
                                lastname: this.state.lastName,
                                desc: this.state.description,
                                phone: this.state.phone,
                                email: this.state.email,
                                password: this.state.password,
                                address:this.state.address,
                                city:this.state.city,
                                state:this.state.state,
                                zipcode:this.state.zipcode
                            }),
                        })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.error){
                            return;
                        }
                        
                        
                        if(responseJson.data==='EmailTrue'){
                            alert('Email exist aleady!')
                        }
                        else{
                            alert('Register Successful.') 
                            this.props.navigation.navigate('Login')
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });  
        }
        else return
 
    }
}