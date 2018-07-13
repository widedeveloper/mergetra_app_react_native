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
  ActivityIndicator
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import firebase from 'firebase';
import axios from 'axios';
export default class ZipCode extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state={
            zipcode: '',            
            zipcodeValid: true,
            validStart: false,            
            loading: false
        }
    }
    componentDidMount(){
        console.log('++--------------',this.props.navigation.state.params.loggedin)
    }
    render(){
       
        return(
            <View style={styles.container}>
                
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <Icon name='ios-arrow-back' size={30} color='white'/>
                    </TouchableOpacity>
                    <Image source={require('../../images/back1.jpg')} style={styles.image} />
                   
                    <View style={[styles.inputView,{marginVertical:20,flexDirection:'row',alignItems:'center'}]}>
                        <Icon name='ios-pin' size={30} color='rgba(0,0,0,0.3)' style={{marginHorizontal:15,marginBottom:-7}} />
                        <TextInput 
                            placeholder='ZIP Code'
                            onChangeText={(name)=>this.firstname(name)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.zipcode}
                            style = {styles.zipcodeInput}
                            keyboardType='numeric'

                        />
                    </View>
                    {
                        this.state.zipcodeValid&&this.state.validStart?
                        <View style={styles.validView}>
                            <Text>Please enter correct zipcode.</Text>
                        </View>:null
                    }                 
                    
                   
                    <Button text={'Conitnue'} style={{marginTop:15}} onPress={()=>this.Signup()}/>
                    
                </ScrollView>
                {
                    this.state.loading?
                    <View style={styles.loadinView}>
                        <ActivityIndicator size='large' color='#41cab7' />
                    </View>:null
                }
            </View>
        )
    }
    firstname(name){
        let self = this
        if(name.length>5) return
       this.setState({zipcode: name})
        url = `https://www.zipcodeapi.com/rest/zk6NOjw8t9oYbYyoCLSioTKsLAL9B24QwPi1OPJMSnQXCiKR8sK5WkHF9x83TQaO/info.json/${name}/radians`
        
           if(name.length===5){
                axios.get(url)
                .then(response=>{
                    console.log('++--result',response.data)
                    self.setState({zipcodeValid: false})

                }).catch(error=>{
                self.setState({zipcodeValid: true})
                })
            }
        
        
    }
   
    
    Signup(){       
        this.setState({validStart: true})
        if(this.state.zipcodeValid) return
        this.props.navigation.navigate('Address',{zipcode: this.state.zipcode,loggedin:this.props.navigation.state.params.loggedin})
        
    }
}