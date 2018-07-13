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
        const { params } = this.props.navigation.state;
        var user_info = params.user_info;
        
        this.state={
            
            currentpassword:'',
            newpassword:'',
            confirmpassword:'',
            currentpasswordValid:false,
            newpasswordValid:false,
            confirmpasswordValid:false,
            submitValid:false,

            user_data:user_info
            
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
                    <Text style={styles.headerTitle}>Password</Text>
                </View>
                <ScrollView>                 
              
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Current password'
                        onChangeText={(currentpassword)=>this.currentpassword(currentpassword)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.currentpassword}
                        style = {styles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                {
                    this.state.currentpasswordValid?
                    <View style={styles.validView}>
                        <Text>Please enter a 6-character password.</Text>
                    </View>:null
                }   
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='New password'
                        onChangeText={(newpassword)=>this.newpassword(newpassword)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.newpassword}
                        style = {styles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                {
                    this.state.newpasswordValid?
                    <View style={styles.validView}>
                        <Text>Please enter a 6-character password.</Text>
                    </View>:null
                }
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Confirm password'
                        onChangeText={(confirmpassword)=>this.confirmpassword(confirmpassword)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.confirmpassword}
                        style = {styles.textInput}
                        secureTextEntry={true}
                    />
                </View>
                {
                    this.state.confirmpasswordValid?
                    <View style={styles.validView}>
                        <Text>Please enter a 6-character password.</Text>
                    </View>:null
                }
                {
                    this.state.submitValid?
                    <View style={styles.validView}>
                        <Text>Must match the previous entry</Text>
                    </View>:null
                }
                <Button text={'Change Password'} style={{marginTop:15,marginBottom:15, width:220}} onPress={()=>this.submit_btn()}/>

                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
                </ScrollView>
            </View>
            
        )
    }


    currentpassword(currentpassword){
        this.setState({currentpassword: currentpassword})
        if(currentpassword.length>=6) this.setState({currentpasswordValid: false})
        else this.setState({currentpasswordValid: true})

        this.setState({submitValid:false})
    }
    newpassword(newpassword){
        this.setState({newpassword: newpassword})
        if(newpassword.length>=6) this.setState({newpasswordValid: false})
        else this.setState({newpasswordValid: true})


        this.setState({submitValid:false})
    }
    confirmpassword(confirmpassword){
        this.setState({confirmpassword: confirmpassword})
        if(confirmpassword.length>=6) this.setState({confirmpasswordValid: false})
        else this.setState({confirmpasswordValid: true})


        this.setState({submitValid:false})
    }





    submit_btn(){
        this.currentpassword(this.state.currentpassword)
        this.newpassword(this.state.newpassword)
        this.confirmpassword(this.state.confirmpassword)

        if(this.state.newpassword == this.state.confirmpassword && this.state.newpassword.length!=0){
            if(!this.state.currentpasswordValid && !this.state.newpasswordValid && !this.state.confirmpasswordValid){
                    fetch('http://mergetransit.com/api/api_changepassword', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.state.user_data.token}`,
                            },
                            body: JSON.stringify({
                                currentPassword: this.state.currentpassword,
                                newPassword: this.state.newpassword,
                            }),
                        })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson.error){
                            return;
                        }
                        if(responseJson.data==='ErrorTrue'){
                            alert('Your password has not been changed.')

                        }
                        else{
                            alert('Changed Password.') 
                        }
                        this.setState({currentpassword:'', newpassword:'', confirmpassword:''})

                    })
                    .catch((error) => {
                        alert(error);
                    }); 
            }

        }else{
            this.setState({submitValid:true})
            return
        }

    }
}