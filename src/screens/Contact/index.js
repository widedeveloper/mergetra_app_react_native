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
import SendSMS from 'react-native-sms';
import moment from 'moment';
import firebase from 'firebase';
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
            start_date: '',
            end_date: '',
            origin:'',
            destination:'',
            po:'',
            company:'',
            PropsData: user_info,
            phonenumber:null
        }
    }
    componentWillMount(){
                fetch('http://mergetransit.com/api/api_phonenumber', {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.state.PropsData.token}`,
                        },
                        body: JSON.stringify({
                            customer_id: this.state.PropsData.customersID
                        }),
                    })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.error){
                        return;
                    }
                    console.log(responseJson.data)
                    this.setState({phonenumber:responseJson.data})
                })
                .catch((error) => {
                        alert(error);
                });
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
                    <Text style={styles.headerTitle}>Contact</Text>
                </View>
                {
                    this.state.phonenumber?
                    <View>   
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} REQUESTED CONTACT`)} style={styles.contactBtn}>
                                <Icon name='ios-call' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>Contact Me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} ARRIVED AT SHIPPER @ ${moment(new Date()).format('DD-MM-YYYY hh:mm A')}`)} style={styles.contactBtn}>
                                <Icon name='ios-bulb' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>At Shipper</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} IS BEING LOADED @ ${moment(new Date()).format('DD-MM-YYYY hh:mm A')}`)} style={styles.contactBtn}>
                                <Icon name='ios-bulb' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>Loading</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} IS IN TRANSIT @ ${moment(new Date()).format('DD-MM-YYYY hh:mm A')}`)} style={styles.contactBtn}>
                                <Icon name='ios-bulb' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>In Transit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} ARRIVED AT CONSIGNEE @ ${moment(new Date()).format('DD-MM-YYYY hh:mm A')}`)} style={styles.contactBtn}>
                                <Icon name='ios-bulb' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>At Delivery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.sendSMSFUN(`${this.state.PropsData.drivers[0].firstname} HAS COMPLETED SHIPMENT @ ${moment(new Date()).format('DD-MM-YYYY hh:mm A')}`)} style={styles.contactBtn}>
                                <Icon name='ios-bulb' size={30} color='#FFFFFF'/>
                                <Text style={styles.Btntext}>Unloaded</Text>
                        </TouchableOpacity>
                        
                    </View>
                    :
                    <View style={styles.horizontal}>
                       <ActivityIndicator size='small'color='#0000ff' />
                    </View>
                }
                <View style={styles.slide1}>                       
                                    <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>    
            </View>
        )
    }
    sendSMSFUN(message_body) {        
        console.log(message_body)
        SendSMS.send({
            body: message_body,
            recipients: this.state.phonenumber,
            successTypes: ['sent', 'queued']
        }, (completed, cancelled, error) => {
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);    
        });
    }
    Login(){
        this.props.navigation.navigate('Setting')
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