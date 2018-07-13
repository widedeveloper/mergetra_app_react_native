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
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>IVOICE</Text>
                </View>
                <View style={styles.textView}>
                    <View style={styles.colView}>
                        <Text style={[styles.textInput,{fontWeight:'bold'}]}>Steve's Trucking</Text>
                        <Text style={styles.textInput}>Phone: (888)564-6546</Text>
                        <Text style={styles.textInput}></Text>
                        <Text style={styles.textInput}>PO Box 915654</Text>
                        <Text style={styles.textInput}>Kansas City, MO 64111</Text>
                    </View>
                    <ImageBackground source={require('../../images/invoicelogo.png')} style={styles.image}></ImageBackground>
                </View>
                <Text style={styles.textInput1}>INVOICE</Text>
                <View style={styles.textView}>
                    <View style={styles.colView_one}>
                        <Text style={[styles.textInput,{fontWeight:'bold'}]}>Bill To:</Text>
                        <Text style={styles.textInput}>Company Name</Text>
                        <Text style={styles.textInput}>7834 18th St.</Text>
                        <Text style={styles.textInput}>Dallas, TX 75391</Text>
                    </View>
                    <View style={styles.colView_two}>
                        <Text style={[styles.textInput,{textAlign:'right',marginRight:5}]}>Invoice Num : </Text>
                        <Text style={[styles.textInput,{textAlign:'right',marginRight:5}]}>Terms : </Text>
                        <Text style={[styles.textInput,{textAlign:'right',marginRight:5}]}>Date : </Text>
                        <Text style={[styles.textInput,{textAlign:'right',marginRight:5}]}>Due : </Text>
                    </View>
                    <View style={styles.colView_three}>
                        <Text style={styles.textInput}>23157</Text>
                        <Text style={styles.textInput}>Net 30 Days</Text>
                        <Text style={styles.textInput}>8/5/2018</Text>
                        <Text style={styles.textInput}>8/5/2018</Text>
                    </View>                    
                </View>
                <View style={styles.lineView}/>

                <View style={styles.lineView}/>


             
                

            </View>
        )
    }
    
}