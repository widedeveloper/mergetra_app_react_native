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
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment'
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
            PropsData:null,
            date_style:null,
            selectedStartDate:null,
            user_data: user_info,
            dataload:false,
        }
        this.onDateChange = this.onDateChange.bind(this);
    }
    componentWillMount(){
        let customDatesStyles = [];
        let driverid='';
        this.state.user_data.role==="4"?driverid='':driverid=this.state.user_data.drivers[0].id
            fetch('http://mergetransit.com/api/api_report_calendar', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.state.user_data.token}`,
                    },
                    body: JSON.stringify({
                        po: '',
                        startdate: '',
                        enddate: '',
                        driverid:driverid,
                        customersID:this.state.user_data.customersID
                    }),
                })
            .then((response) => response.json())
            .then((responseJson) => {
               responseJson.data.map(item=>{
                        customDatesStyles.push({
                            date: moment(item.put_date,'YYYY-MM-DD hh:mm:ss'),
                            style: {backgroundColor: '#ff00ff'},
                        });
                    })
               this.setState({date_style:customDatesStyles, PropsData:responseJson, dataload:true})
                
            })
            .catch((error) => {
                alert(error);
            }); 
    }
    onDateChange(date) {
        this.setState({
            selectedStartDate: date,
        });
        
        
            const findData = this.state.PropsData.data.find(item=>{
                return item.put_date.split(' ')[0] === moment(date).format('YYYY-MM-DD')
            })
            if(findData){
                console.log(findData)
                this.props.navigation.navigate('Details', {DetailData:findData, token:this.state.user_data.token})
            }
            else
                alert('No DATA')
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
                    <Text style={styles.headerTitle}>Calendar</Text>
                </View>
                    {
                        
                    this.state.dataload?
                    <View style={{marginVertical: 45}}>
                        <CalendarPicker
                        todayTextStyle={{fontWeight: 'bold'}}
                        customDatesStyles={this.state.date_style}
                        onDateChange={this.onDateChange}
                        />
                    </View>
                    :<View style={styles.horizontal}>
                                <ActivityIndicator size='small'color='#0000ff' />
                     </View>
                    }
                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
            </View>
           
        )
    }
    Login(){        
        this.props.navigation.navigate('Setting')
    }
    getDate(){

    }
}