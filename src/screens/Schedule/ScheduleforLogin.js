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
  ScrollView,
  Modal
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
export default class Schedule extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            cleaningType: 2,
            howoften: 2,
            moreOptionModal: false,
            isDatePickerVisible: false,
            isTimePickerVisible: false,
            date: 'Select Start Date',
            time: 'Select Start Time'
        }
    }
    _showDateTimePicker = () => this.setState({ isTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isTimePickerVisible: false });
    _showDateTimePicker1 = () => this.setState({ isDatePickerVisible: true });

    _hideDateTimePicker1 = () => this.setState({ isDatePickerVisible: false });

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', moment(date).format('hh:mm a'));
        this.setState({time: moment(date).format('hh:mm a')})
        this._hideDateTimePicker();
    };
    _handleDatePicked1 = (date) => {
        console.log('A date has been picked: ', date);
        this.setState({date: moment(date).format('DD-MM-YYYY')})
        this._hideDateTimePicker1();
    };
    render(){
        const {goBack} = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>goBack()} style={styles.backIcon}>
                        <Icon name='ios-arrow-back' size={30} color='#212123'/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Schedule Cleaning</Text>
                </View>
                <View style={styles.servicetitle}>
                    <Text style={styles.serviceText}>Select a Frequency</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:18}}>
                    <View style={styles.howOften}>
                        <TouchableOpacity onPress={()=>this.setState({howoften:1})}>
                            <View style={this.state.howoften===1?styles.howOftenView_active:styles.howOftenView}>
                                <Text style={this.state.howoften===1?styles.oftenText_active:styles.oftenText}>One Time</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({howoften:2})}>
                            <View style={this.state.howoften===2?styles.howOftenView_active:styles.howOftenView}>
                                <Text style={this.state.howoften===2?styles.oftenText_active:styles.oftenText}>Weekly</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({howoften:3})}>
                            <View style={this.state.howoften===3?styles.howOftenView_active:styles.howOftenView}>
                                <Text style={this.state.howoften===3?styles.oftenText_active:styles.oftenText}>Monthly</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <View style={[styles.inputView,{marginVertical:25}]}>
                            <Text style={styles.dateText}>{this.state.time}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._showDateTimePicker1}>
                        <View style={[styles.inputView,{marginBottom: 25}]}>
                            <Text style={styles.dateText}>{this.state.date}</Text>
                        </View>
                    </TouchableOpacity>
                    <Button text={'CONTINUE'} style={{marginVertical:15}} onPress={()=>this.Next()}/>
                </ScrollView>   
                <DateTimePicker
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    mode='time'
                    minimumDate={new Date()}
                    minuteInterval={30}
                />             
                <DateTimePicker
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked1}
                    onCancel={this._hideDateTimePicker1}
                    mode='date'
                    minimumDate={new Date()}
                    minuteInterval={30}
                />    
            </View>
        )
    }
    Next(){
        this.props.navigation.navigate('PaymentForLogin')
    }
}