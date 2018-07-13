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
            firstName: '',
            lastName:'',
            phone:'',
            email:'',
            mcNum:'',
            equipment:'',
            maxWeight:'',
            rpm:'',
            regions:'',
            
            firstNameValid:false,
            lastNameValid:false,
            phoneValid:false,
            mcNumValid:false,
            equipmentValid:false,
            maxWeightValid:false,
            RPMValid:false,
            regionsValid:false,

            submitValid:false,

            user_data: user_info
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
                    <Text style={styles.headerTitle}>Drivers Register</Text>
                </View>
                <ScrollView>                 
                <View style={styles.secondRow}>
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
                        <Text>Please enter a first name and last name.</Text>
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
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='MC Number'
                        onChangeText={(mcNum)=>this.mcNum(mcNum)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.mcNum}
                        style = {styles.textInput}
                    />
                </View>
                {
                    this.state.mcNumValid?
                    <View style={styles.validView}>
                        <Text>Please enter a Mc Number.</Text>
                    </View>:null
                }                
                <View style={styles.secondRow}>
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='Equipment'
                            onChangeText={(equipment)=>this.equipment(equipment)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.equipment}
                            style = {styles.textInput}
                        />
                    </View>
                    
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='Max Weight'
                            onChangeText={(maxWeight)=>this.maxWeight(maxWeight)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.maxWeight}
                            style = {styles.textInput}
                        />
                    </View>
                </View>
                {
                    this.state.equipmentValid || this.state.maxWeightValid?
                    <View style={styles.validView}>
                        <Text>Please enter a Equipment and Max Weight.</Text>
                    </View>:null
                }
                <View style={styles.secondRow}>
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='Truck #'
                            onChangeText={(rpm)=>this.rpm(rpm)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.rpm}
                            style = {styles.textInput}
                            keyboardType='numeric'
                        />
                    </View>
                    
                    <View style={[styles.inputView2,{marginTop:10}]}>
                        <TextInput 
                            placeholder='Trailer #'
                            onChangeText={(regions)=>this.regions(regions)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.regions}
                            style = {styles.textInput}
                        />
                    </View>
                </View>
                {
                    this.state.regionsValid || this.state.RPMValid?
                    <View style={styles.validView}>
                        <Text>Please enter a Regions Covered and Starting RPM.</Text>
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

    firstName(firstName){
        firstName.length===0?this.setState({firstName: firstName, firstNameValid:true}):this.setState({firstName: firstName, firstNameValid:false})
    }
    lastName(lastName){
        lastName.length===0?this.setState({lastName: lastName, lastNameValid:true}):this.setState({lastName: lastName, lastNameValid:false})
    }
    phone(phone){
        phone.length===0?this.setState({phone: phone, phoneValid:true}):this.setState({phone: phone, phoneValid:false})
    }
    email(email){
        this.setState({email: email})
    }
    mcNum(mcNum){
        mcNum.length===0?this.setState({mcNum: mcNum,mcNumValid:true}):this.setState({mcNum: mcNum,mcNumValid:false})
    }
    equipment(equipment){
        equipment.length===0?this.setState({equipment: equipment, equipmentValid: true}):this.setState({equipment: equipment, equipmentValid: false})
    }
    maxWeight(maxWeight){
        maxWeight.length===0?this.setState({maxWeight: maxWeight,maxWeightValid:true}):this.setState({maxWeight: maxWeight,maxWeightValid:false})
    }
    rpm(rpm){
        rpm.length===0?this.setState({rpm: rpm, RPMValid: true}):this.setState({rpm: rpm, RPMValid: false})
    }    
    regions(regions){
        regions.length===0?this.setState({regions: regions, regionsValid: true}):this.setState({regions: regions, regionsValid: false})
    }

    submit_btn(){
        this.mcNum(this.state.mcNum)
        this.firstName(this.state.firstName)
        this.lastName(this.state.lastName)
        this.equipment(this.state.equipment)
        this.phone(this.state.phone)
        this.rpm(this.state.rpm)
        this.regions(this.state.regions)
        this.maxWeight(this.state.maxWeight)


        if (!this.state.mcNumValid && !this.state.firstNameValid && !this.state.lastNameValid && !this.state.equipmentValid 
            && !this.state.phoneValid && !this.state.rpmValid && !this.state.regionsValid && !this.state.maxWeightValid){

                    fetch('http://mergetransit.com/api/api_adddrivers', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.state.user_data.token}`,
                            },
                            body: JSON.stringify({
                                firstname: this.state.firstName,
                                lastname: this.state.lastName,
                                email: this.state.email,
                                phone: this.state.phone,
                                customer: this.state.user_data.customersID,
                                mc_number: this.state.mcNum,
                                equipment: this.state.equipment,
                                max_weight: this.state.maxWeight,
                                starting_rpm: this.state.rpm,
                                region: this.state.regions
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
                            this.setState({mcNum:'',firstName:'',lastName:'',equipment:'',phone:'',rpm:'',regions:'',maxWeight:'',email:''})
                        }
                        
                    })
                    .catch((error) => {
                        alert(error);
                    });  
            }
        else return
 
    }
}