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
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Button from '../../components/button';
import firebase from 'firebase';
import axios from 'axios';
import QS from 'qs';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state={
            email: 'charlievansickle262@gmail.com',
            password: '123456',
            //email: '',
            //password: '',
            
            emailValid: false,
            passwordValid: false,


            validStart: true,
            loading: false,
            login_failed:false
        }
    }
    render(){
        return(
            <View style={styles.container}>
            <ScrollView>
                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/Logo.jpg')} style={styles.image}></ImageBackground>
                </View>
                <View style={styles.cotainTEXT}>
                    <Text style={styles.conTitle}>"The Spot Market Agency"</Text>
                    <Text style={styles.conTitleSM}>SM</Text>
                </View>
                
                {
                    this.state.login_failed?
                    <View style={styles.validView}>
                        <Text>Your email address and password do not match.</Text>
                    </View>:null
                } 
                <View style={styles.inputView}>
                    <Icon name='ios-contact' style={styles.iconstyle} size={20} color='#212123'/>
                    <TextInput 
                        onChangeText={(email)=>this.email(email)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.email}
                        style = {styles.textInput}
                        placeholder='USERNAME OR EMAIL'
                    />
                    <TouchableOpacity onPress={()=>this.usernameclean()}>
                        <Icon name='md-close-circle' style={styles.iconstyle} size={20} color='#212123'/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.emailValid&&this.state.validStart?
                    <View style={styles.validView}>
                        <Text>Please enter a valid email address.</Text>
                    </View>:null
                }
               
                <View style={[styles.inputView,{marginTop:10}]}>
                    <Icon name='md-key' style={styles.iconstyle} size={20} color='#212123'/>
                    <TextInput 
                        placeholder='PASSWORD'
                        onChangeText={(pass)=>this.password(pass)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.password}
                        style = {styles.textInput}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={()=>this.passwordclean()}>
                        <Icon name='md-close-circle' style={styles.iconstyle} size={20} color='#212123'/>
                    </TouchableOpacity>
                </View>
                {
                    this.state.passwordValid&&this.state.validStart?
                    <View style={styles.validView}>
                        <Text>Please enter a password.</Text>
                    </View>:null
                }
  
                <Text onPress={()=>this.props.navigation.navigate('Forgot')} style={styles.forgotTitle}>FORGOT PASSWORD?</Text>
                
                <Button text={'LOGIN'} style={{marginTop:15}} onPress={()=>this.Login()}/>
                <Button text={'REGISTER'} style={{marginTop:15, marginBottom:55}} onPress={()=>this.Signup()}/>
            </ScrollView>
            </View>
            
        )
    }
    usernameclean(){
        this.setState({email: ''}) 
    }
    passwordclean(){
        this.setState({password: ''}) 
    }
    Signup(){
        this.props.navigation.navigate('Signup')
    }
    Login(){
        this.setState({validStart: true})        
        if(this.state.emailValid||this.state.passwordValid) return
        
            fetch('http://mergetransit.com/api/api_login', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    }),
                })
            .then((response) => response.json())
            .then((responseJson) => {
               if(responseJson.error){
                    this.setState({login_failed: true})
                    return;
                } 
                var login_info = responseJson
                if(login_info.success.isActive==="1")
                    this.props.navigation.navigate('Setting', {user_info:login_info.success})
                else
                    this.props.navigation.navigate('Account', {user_info:login_info.success})   

            })
            .catch((error) => {
                alert(error);
            });   

    }
    email(email){
        this.setState({email: email})
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            this.setState({emailValid: false,login_failed:false})
        }else{
            this.setState({emailValid: true,login_failed:false})
        }
        
    }
    password(pass){
        if(pass.length===0) this.setState({password: pass, passwordValid: true,login_failed:false})
        else this.setState({password: pass, passwordValid: false,login_failed:false})
    }
}