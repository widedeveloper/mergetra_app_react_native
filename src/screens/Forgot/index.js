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

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props){
        super(props)
        this.state={
            verifycode: '',
            email:'',
            password:'',
            con_password:'',
            verifycodeValid:false,
            emailValid:false,
            passwordValid:false,
            con_passwordValid:false,
            submitValid:false,
            
            ViewCode:false,

            wq_photo:'',
            insurance_photo:'',
            authority_photo:'',
            misc_photo:'',
            
            RequireData:null
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
                    <Text style={styles.headerTitle}>Forgot Password</Text>
                </View>
                {
                    !this.state.ViewCode?
                        <View>
                            <Text style={styles.InputTitle}>Email</Text>                 
                            <View style={[styles.inputView,{marginTop:10}]}>
                                <TextInput 
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
                            <Text  style={styles.InputTitle}>New Password</Text>                
                            <View style={[styles.inputView,{marginTop:10}]}>
                                <TextInput 
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
                            <Text  style={styles.InputTitle}>Confirm Password</Text>                
                            <View style={[styles.inputView,{marginTop:10}]}>
                                <TextInput 
                                    onChangeText={(con_password)=>this.con_password(con_password)}
                                    underlineColorAndroid = 'transparent'
                                    value = {this.state.con_password}
                                    style = {styles.textInput}
                                    secureTextEntry={true}
                                />
                            </View>
                            {
                                this.state.con_passwordValid?
                                <View style={styles.validView}>
                                    <Text>Please enter a 6-character password.</Text>
                                </View>:null
                            }
                            <Button text={'Send Email'} style={{marginTop:15,marginBottom:15}} onPress={()=>this.submit_btn()}/>
                        </View>
                    :
                        <View>
                            <View style={[styles.inputView,{marginTop:10}]}>
                                <TextInput 
                                    placeholder='Verify Code'
                                    onChangeText={(verifycode)=>this.verifycode(verifycode)}
                                    underlineColorAndroid = 'transparent'
                                    value = {this.state.verifycode}
                                    style = {styles.textInput}
                                />
                            </View>
                            {
                                this.state.verifycodeValid?
                                <View style={styles.validView}>
                                    <Text>Please enter a email verify code.</Text>
                                </View>:null
                            }
                            <Button text={'Confirm'} style={{marginTop:15,marginBottom:15}} onPress={()=>this.Confirmbtn()}/>


                        </View>
                }

                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
            </View>
            
        )
    }

    verifycode(verifycode){
        verifycode.length===0?this.setState({verifycode: verifycode,verifycodeValid:true}):this.setState({verifycode: verifycode,verifycodeValid:false})
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
    con_password(con_password){
        this.setState({con_password: con_password})
        if(con_password.length>=6) this.setState({con_passwordValid: false,submitValid:true})
        else this.setState({con_passwordValid: true,submitValid:false})
    }
    Confirmbtn(){
        if(this.state.verifycode === this.state.RequireData){
                    fetch('http://mergetransit.com/api/api_forgotupdate', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: this.state.email,
                                newPassword:this.state.password
                            }),
                        })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.error){
                            return;
                        }
                            alert("Password updated!")
                            this.props.navigation.navigate('Login')
                    })
                    .catch((error) => {
                        alert(error);
                    });  

        } else{
            this.setState({verifycodeValid:true})
        }
    }

    submit_btn(){
        this.email(this.state.email)
        this.password(this.state.password)
        this.con_password(this.state.con_password)
if(this.state.email==="" || this.state.password==="" || this.state.con_password==="") return
if(this.state.password!=this.state.con_password){
    alert("Password is not matched");
    return
}
        if (!this.state.emailValid && !this.state.passwordValid){
            
                    fetch('http://mergetransit.com/api/api_forgotpass', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                email: this.state.email
                            }),
                        })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.error){
                            return;
                        }
                        
                        
                        if(responseJson.data.type==='error'){
                            alert('Email exist aleady!')                            
                        }
                        else{
                            this.setState({RequireData:responseJson.data.code})
                            this.setState({ViewCode:true})
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });  
        }
        else return
 
    }
}