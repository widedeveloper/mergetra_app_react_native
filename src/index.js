import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';
import Home from './screens/Home';
import Login from './screens/Login';
import Setting from './screens/Setting';
import Reports from './screens/Reports';
import Calendar from './screens/Calendar';
import Upload from './screens/Upload';
import Contact from './screens/Contact';
import ReportsList from './screens/ReportsList';
import Billing from './screens/Billing';
import Details from './screens/Details';
import Signup from './screens/Signup';
import Password from './screens/AccountSetting/password';
import Forgot from './screens/Forgot';
// import Address from './screens/Address';
import Schedule from './screens/Schedule';
import AddDrivers from './screens/AddDrivers';
import Account from './screens/AccountSetting';
import Filesview from './screens/Details/pdfview';
import Invoice from './screens/Invoice';
// import Extras from './screens/Extras';
// import Payment from './screens/Payment';
// import ServiceForLogin from './screens/Service/serviceforLogin';
// import ExtraForLogin from './screens/Extras/ExtrasForLogin';
// import ScheduleForLogin from './screens/Schedule/ScheduleforLogin';
// import PaymentForLogin from './screens/Payment/PaymentforLogin';
export default class App extends Component {
    render(){
        return (<AppScreen />)
    }
}
// const Drawer = createDrawerNavigator({
//     Setting: {screen: Setting},

// },{
// drawerPosition: 'right',
// useNativeAnimations : false
// })
const AppScreen = createStackNavigator({
        Home: { screen: Home},
        Login: {screen: Login},
        Setting: {screen: Setting},
        Reports : {screen: Reports},
        Calendar : {screen: Calendar},
        Upload : {screen: Upload},
        Contact : {screen: Contact},
        Signup: {screen: Signup},
        AddDrivers : {screen: AddDrivers},
        Password : {screen: Password},
        Forgot: {screen: Forgot},
        // Address: {screen: Address},
        Schedule: {screen: Schedule},
        ReportsList : {screen: ReportsList},
        Billing : {screen: Billing},
        Details : {screen: Details},
        Account : {screen: Account},
        Filesview : {screen:Filesview},
        Invoice: {screen: Invoice}
        // ZipCode: {screen: ZipCode},
        // Service: {screen: Service},
        // Extras: {screen: Extras},
        // Payment: {screen: Payment},      
        // ServiceForLogin: {screen: ServiceForLogin},
        // ScheduleForLogin: {screen: ScheduleForLogin},
        // ExtrasForLogin: {screen: ExtraForLogin},
        // PaymentForLogin: {screen: PaymentForLogin}
    },
    {
        initialRouteName: 'Invoice'
        
    }
)
