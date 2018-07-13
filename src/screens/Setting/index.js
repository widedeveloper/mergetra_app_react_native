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
  ImageBackground
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import Drawer from 'react-native-drawer-menu';
import { AsyncStorage } from "react-native"
export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        var user_info = params.user_info;
        this.state={
            email: '',
            password: '',
            drawer: false,
            user_data: user_info
        }
    }

    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.navigation.state;
        var user_data = params.user_info;
        this.setState({
            user_data,
        });
    }

    render(){
        console.log("=======render")
        return(
            <Drawer
                ref='drawer'
                style={styles.container}
                //drawerWidth={300}
                drawerContent={this.drawerContent()}
                maskAlpha={0.1}
                rightDisabled={this.state.drawer}
                //customStyles={{drawer: styles.drawer}}
                drawerPosition={Drawer.positions.Right}
                onDrawerOpen={() => {console.log('Drawer is opened');}}
                onDrawerClose={() => {console.log('Drawer is closed')}}
                //easingFunc={Easing.ease}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>this.refs.drawer.openDrawer()} style={styles.backIcon}>
                            <Icon name='ios-menu' size={30} color='#212123'/>
                        </TouchableOpacity>
                        <Image source={require('../../images/logo1.jpg')} style={styles.image} />
                        <Text style={styles.headerTitle_home}>Home</Text>
                    </View>
                    <View style={styles.statecotainer}>
                    <Text style={styles.CompanyTitle}>{this.state.user_data.companyname}</Text>

                        <View style={styles.locationView}>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total Revenue</Text>
                                <Text style={styles.schedulename}>{this.state.user_data.total_revenue}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total Miles</Text>
                                <Text style={styles.schedulename}>{this.state.user_data.total_mile}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total DHO</Text>
                                <Text style={styles.schedulename}>{this.state.user_data.total_dho}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>All Mile RPM</Text>
                                <Text style={styles.schedulename}>{this.state.user_data.total_rpm}</Text>
                            </View>
                        </View>
                    </View>


                    <Button text={'Reports'} style={{marginTop:15, width:220}} onPress={()=>this.props.navigation.navigate('Reports', {user_info:this.state.user_data})}/>
                    <Button text={'Calendar'} style={{marginTop:15, width:220}} onPress={()=>this.props.navigation.navigate('Calendar', {user_info:this.state.user_data})}/>
                    <Button text={'Upload Images'} style={{marginTop:15, width:220}} onPress={()=>this.uploadbtn()}/>
                    <Button text={'Contact Dispatch'} style={{marginTop:15, width:220}} onPress={()=>this.props.navigation.navigate('Contact', {user_info:this.state.user_data})}/>
                    {
                        this.state.user_data.role===4? 
                        <Button text={'Invoice'} style={{marginTop:15, width:220}} onPress={()=>this.invoicebtn()}/>
                        :null
                    }
                </View>
            </Drawer>
        )
    }
    drawerContent(){
        return(
            <View style={styles.drawerContent} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.drawerHeader}>
                        <Image source={require('../../images/logo1.jpg')} style={styles.image} />
                        <Text style={styles.headerTitle}>{this.state.user_data.companyname}</Text>
                    </View>
                    <Text style={{fontSize:14,fontFamily:'Symbol',fontWeight:'bold',marginTop:15,color:'black',marginLeft:12}}>{this.state.user_data.name}</Text>
                    <TouchableOpacity>
                        <View style={[styles.menuView,{backgroundColor:'transparent'}]}>
                            <Icon name='ios-help' size={50} color='#000' />
                            <Text style={[styles.menuText,{marginLeft:28}]}>Help</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View style={styles.BottomBorder} />
                    {
                        this.state.user_data.role===4?
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddDrivers', {user_info:this.state.user_data})}>
                                <View style={[styles.menuView,{backgroundColor:'transparent'}]}>
                                    <Icon name='ios-contacts' size={30} color='#000' />
                                    <Text style={styles.menuText}>Add Drivers</Text>
                                </View>
                            </TouchableOpacity>
                        :null
                    }
                    <View style={styles.BottomBorder} />
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Password', {user_info:this.state.user_data})}>
                        <View style={[styles.menuView,{backgroundColor:'transparent'}]}>
                            <Icon name='ios-settings' size={30} color='#000' />
                            <Text style={styles.menuText}>Change Password</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.BottomBorder} />
                    {
                        this.state.user_data.role===4?
                        <TouchableOpacity onPress={()=>this.account()}>
                            <View style={[styles.menuView,{backgroundColor:'transparent'}]}>
                                <Icon name='md-person' size={30} color='#000' />
                                <Text style={styles.menuText}>My Account</Text>
                            </View>
                        </TouchableOpacity>
                        :null
                    }
                    <View style={styles.BottomBorder} />
                    <TouchableOpacity  onPress={()=>this.logout()}>
                        <View style={[styles.menuView,{backgroundColor:'transparent'}]}>
                            <Icon name='ios-log-out' size={30} color='#000' />
                            <Text style={styles.menuText}>Log out</Text>
                        </View>
                    </TouchableOpacity>

                    
                </ScrollView>
            </View>
        )
    }
    Login(){
        this.props.navigation.navigate('Reports')
    }
    account(){
        this.props.navigation.navigate('Account', {user_info:this.state.user_data})
    }
    logout(){
            fetch('http://mergetransit.com/api/api_logout', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.state.user_data.token}`,
                    }
                })
            .then((response) => response.json())
            .then((responseJson) => {
                    this.props.navigation.navigate('Login')
            })
            .catch((error) => {
                alert(error);
            }); 

             
    }

    invoicebtn(){
        this.props.navigation.navigate('Upload', {user_info:this.state.user_data})
        
        AsyncStorage.setItem('pageinfo','invoice',()=>{});
        
    }
    uploadbtn(){
        this.props.navigation.navigate('Upload', {user_info:this.state.user_data})
        AsyncStorage.setItem('pageinfo','upload',()=>{});   
    }
}