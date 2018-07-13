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
            start_date: 'Select Start Date',
            end_date: 'Select End Date',
            po:'',
            showarray:[],

            isDatePickerVisible: false,
            isTimePickerVisible: false,
            date: 'Select Date',
            start_date_flag:false,
            end_date_flag:false,

            user_data: user_info,
            ReportsData:null
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
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Find Shipment</Text>
                </View>

                <View>
                        <View style={[styles.inputView,{marginTop:5}]}>
                            <TextInput 
                                placeholder='PO#'
                                onChangeText={(po)=>this.po(po)}
                                underlineColorAndroid = 'transparent'
                                value = {this.state.po}
                                style = {styles.textInput}
                            />
                        </View>

                        <View style={[styles.datestyles,{marginTop:10}]}> 
                         
                            <View style={[styles.inputView,{marginRight:20}]}>
                                <TouchableOpacity onPress={()=>this.start_date()}>
                                <Text style={styles.dateInput}>{this.state.start_date}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.setState({start_date: 'Select Start Date'})}>
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
                                <TouchableOpacity onPress={()=>this.setState({end_date: 'Select End Date'})}>
                                    <Icon name='md-close-circle' style={styles.iconstyle} size={20} color='#212123'/>
                                </TouchableOpacity>
                            </View>
                           
                        
                        </View>
                        <Button text={'Search'} style={{marginTop:10,marginBottom:5}} onPress={()=>this.search_btn()}/>
                </View>
                        <View style={styles.tableTitle}>
                            <View style={styles.tableCols1}>
                                <Text style={styles.titleName}>Company</Text>
                            </View>
                            <View style={styles.tableCols1}>
                                <Text style={styles.titleName}>PO#</Text>
                            </View>
                            <View style={styles.tableCols2}>
                                <Text style={styles.titleName}>Pu Date</Text>
                            </View>
                        </View>
                        <ScrollView style={{marginBottom:35}} >
                        {
                            this.state.ReportsData && this.state.ReportsData.length>0?
                            this.state.ReportsData.map(item=>{
                                return(
                                        <TouchableOpacity onPress={()=>this.showDetails(item.id)}>
                                            <View style={styles.tableView}>
                                                <View style={styles.tableCols3}>
                                                    <Text style={styles.tableText}>{item.company}</Text>
                                                </View>
                                                <View style={styles.tableCols1}>
                                                    <Text style={styles.tableText}>{item.po}</Text>
                                                </View>
                                                <View style={styles.tableCols2}>
                                                    <Text style={styles.tableText}>{moment(item.put_date,'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD')}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )

                            }):null
                        }
                        </ScrollView> 
                <View style={styles.slide1}>                       
                            <ImageBackground source={require('../../images/logo1.jpg')} style={styles.image}></ImageBackground>
                </View>                         
            </View>
         
        )
    }
    
    showDetails(id){
            const findData = this.state.ReportsData.find(item=>{
                return id === item.id
            })
            if(findData){
                this.props.navigation.navigate('Details', {DetailData:findData, token:this.state.user_data.token})
            }
    }
    start_date(){
        this._showDateTimePicker1();
        this.setState({start_date_flag:true});
    }
    end_date(){
        this._showDateTimePicker1();
        this.setState({end_date_flag:true});
    }
    po(po){
        this.setState({po: po})
    }
    
    search_btn(){
            

            let start_date = '';
            let end_date = '';
            if(this.state.start_date=='Select Start Date')
                start_date = '';
            else
                start_date = this.state.start_date;

            if(this.state.end_date=='Select End Date')
                end_date = '';
            else
                end_date = this.state.end_date;

            let driverid='';
            this.state.user_data.role===4?driverid='':driverid=this.state.user_data.drivers[0].id

            if(this.state.po==='' && start_date==='' && end_date==='') return
            
            fetch('http://mergetransit.com/api/api_report_calendar', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.state.user_data.token}`,
                    },
                    body: JSON.stringify({
                        driverid:driverid,
                        po: this.state.po,
                        startdate: start_date,
                        enddate: end_date,
                        customersID:this.state.user_data.customersID
                    }),
                })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error){
                    return;
                } 
                this.setState({ReportsData:responseJson.data})
            })
            .catch((error) => {
                alert(error);
            });   
        //this.props.navigation.navigate('Setting')
    }
}