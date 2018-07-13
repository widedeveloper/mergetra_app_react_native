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
import DateTimePicker from 'react-native-modal-datetime-picker';
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
            start_date: 'Select Date',
            end_date: 'Select Date',
            origin:'',
            destination:'',
            drivers:'Select Driver',
            drivers_ID:'',
            showDrivers:false,
            po:'',
            company:'',
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            date: 'Select Date',
            start_date_flag:false,
            end_date_flag:false,

            user_data: user_info
        }
    }

    _showDateTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isTimePickerVisible: false });
    _showDateTimePicker1 = () => this.setState({ isDatePickerVisible: true });
    _hideDateTimePicker1 = () => this.setState({ isDatePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({date: moment(date).format('DD-MM-YYYY')})
        this._hideDateTimePicker1();
    };
    _handleDatePicked1 = (date) => {
        console.log('A date has been picked: ', date);
        if(this.state.start_date_flag)
            this.setState({start_date: moment(date).format('YYYY-MM-DD'), start_date_flag:false})
        else
            this.setState({end_date: moment(date).format('YYYY-MM-DD'), end_date_flag:false})
        
        this._hideDateTimePicker1();
    };


    render(){
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Reports</Text>
                </View>
                <View style={styles.inputView}>
                    <TouchableOpacity onPress={()=>this.setState({showDrivers: true})}>
                    <TextInput 
                        placeholder='drivers'
                        underlineColorAndroid = 'transparent'
                        value = {this.state.drivers}
                        editable={false}
                        style = {styles.dtextInput}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({showDrivers: true})}>
                        <Icon name='md-funnel' style={styles.iconstyle} size={20} color='#212123'/>
                    </TouchableOpacity>
                </View>
                    {
                        this.state.user_data.drivers.length>0&&this.state.showDrivers?
                        this.state.user_data.drivers.map(item=>{
                            return(
                                <TouchableOpacity onPress={()=>this.setState({drivers:item.company +`(${item.firstname})`,drivers_ID:item.id ,showDrivers: false})}>
                                    <View style={styles.locationPreview}>
                                        <Text style={styles.locationName}>{item.company +`(${item.firstname})`}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }):null
                    }

                <View style={[styles.datestyles,{marginTop:10}]}>
                    
                            
                    <View style={[styles.inputView,{marginRight:20}]}>
                        <TouchableOpacity onPress={()=>this.start_date()}>
                            <Text style={styles.dateInput}>{this.state.start_date}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({start_date: 'Select Date'})}>
                            <Icon name='md-close-circle' style={styles.iconstyle} size={20} color='#212123'/>
                        </TouchableOpacity>
                    </View>
                            
                   
                 
                    <DateTimePicker
                        isVisible={this.state.isDatePickerVisible}
                        onConfirm={this._handleDatePicked1}
                        onCancel={this._hideDateTimePicker1}
                        mode='date'
                    />
                    
                <View style={[styles.inputView,{marginRight:20}]}>
                    <TouchableOpacity onPress={()=>this.end_date()}>
                        <Text style={styles.dateInput}>{this.state.end_date}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({end_date: 'Select Date'})}>
                        <Icon name='md-close-circle' style={styles.iconstyle} size={20} color='#212123'/>
                    </TouchableOpacity>
                </View>
                            
                    
                 
                </View>
                 
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='ORIGIN'
                        onChangeText={(origin)=>this.origin(origin)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.origin}
                        style = {styles.textInput}
                    />
                </View>
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Destination'
                        onChangeText={(destination)=>this.destination(destination)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.destination}
                        style = {styles.textInput}
                    />
                </View>
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='PO#'
                        onChangeText={(po)=>this.po(po)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.po}
                        style = {styles.textInput}
                    />
                </View>
                <View style={[styles.inputView,{marginTop:10}]}>
                    <TextInput 
                        placeholder='Company'
                        onChangeText={(company)=>this.company(company)}
                        underlineColorAndroid = 'transparent'
                        value = {this.state.company}
                        style = {styles.textInput}
                    />
                </View>

                <Button text={'Search'} style={{marginTop:15,marginBottom:15}} onPress={()=>this.search_btn()}/>

                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>
            </View>
            </ScrollView>
        )
    }

    start_date(){
        this._showDateTimePicker1();
        this.setState({start_date_flag:true});
    }
    end_date(){
        this._showDateTimePicker1();
        this.setState({end_date_flag:true});
    }
    origin(origin){
        this.setState({origin: origin})
    }
    destination(destination){
        this.setState({destination: destination})
    }
    po(po){
        this.setState({po: po})
    }
    company(company){
        this.setState({company: company})
    }

    search_btn(){
            if(this.state.drivers_ID==='') {
                alert("Please select driver.");
              return  
            }
            
            let start_date = '';
            let end_date = '';
            if(this.state.start_date=='Select Date')
                start_date = '';
            else
                start_date = this.state.start_date;



            if(this.state.end_date=='Select Date')
                end_date = '';
            else
                end_date = this.state.end_date;


            fetch('http://mergetransit.com/api/api_report_generate', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.state.user_data.token}`,
                    },
                    body: JSON.stringify({
                        driver_id: this.state.drivers_ID,
                        company: this.state.company,
                        origin: this.state.origin,
                        po: this.state.po,
                        destination: this.state.destination,
                        startdate: start_date,
                        enddate: end_date,
                    }),
                })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error){
                    return;
                } 
                this.props.navigation.navigate('ReportsList', {ReportsData:responseJson.data})
            })
            .catch((error) => {
                alert(error);
            });   
        //this.props.navigation.navigate('Setting')
    }
}