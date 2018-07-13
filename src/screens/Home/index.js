import React, { Component } from 'react';
import {View , Image,Text,TouchableOpacity, ImageBackground, Dimensions } from 'react-native'
import styles from './styles';
import Swiper from 'react-native-swiper';
import Button from '../../components/button'
import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDn6DDsOAxDRex0IJ770drJsOyP-l_QzrM",
    authDomain: "cleaningapp-c9f80.firebaseapp.com",
    databaseURL: "https://cleaningapp-c9f80.firebaseio.com",
    projectId: "cleaningapp-c9f80",
    storageBucket: "cleaningapp-c9f80.appspot.com",
    messagingSenderId: "506337704456"
  };
  const firebaseApp = firebase.initializeApp(config);
export default class HomeScreen extends Component{
    static navigationOptions = {
        // title: 'Home',
        header: null
    }
    Login(){
       this.props.navigation.navigate('Login')
    }
    signUpwithEmail(){
       this.props.navigation.navigate('ZipCode',{loggedin: false})
    }
    render(){
        return(
            <View style={styles.container}>
                {/* <TouchableOpacity onPress={()=>this.Login()}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>Log In</Text>
                    </View>
                </TouchableOpacity> */}
                <Swiper style={styles.wrapper} showsButtons={false} dotStyle={{opacity:0}} activeDotStyle={{opacity:0}}>
                    <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/back1.jpg')} style={styles.image}>
                                <Text style={styles.logoText}>Let's Clean!</Text>
                            </ImageBackground>
                    </View>
                    <View style={styles.slide2}>
                        <View style={styles.slide}>
                            <Image source={require('../../images/2.jpg')} style={styles.image}/>
                        </View>
                    </View>
                    <View style={styles.slide3}>
                        <View style={styles.slide}>
                            <Image source={require('../../images/3.jpg')} style={styles.image}/>
                        </View>
                    </View>
                </Swiper>
                <Button text={'Existing Customers'} style={{marginBottom: 20}} onPress={()=>this.Login()}/>
                <Button text={'New Customers'} style={{marginBottom: 40}} onPress={()=>this.signUpwithEmail()}/>
                {/* <Button text={'AirBnB/Rental Cleanings'} style={{marginBottom: 20}} onPress={()=>this.signUpwithEmail()}/> */}
            </View>
        )
    }
}