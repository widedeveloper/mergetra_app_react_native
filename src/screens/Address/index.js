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
import QS from 'qs';


export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        this.state={
            address: '',
            zipcode: '',
            unit: '',
            data: [],
            locationname: '',
            addressvalid: true,
            city: [],
            complex: '',
            value: '',
            loading: true,
            showCity: false,
            showComplex: false,
            zipcodevalid: true,
            showAddress: false,
            correctAddress: false
        }
    }
    componentWillMount(){
        let city=['Not Yet'], complex = [];
        firebase.database().ref('Region').on('value',snapshot=>{
            let obj = {}
            let city1 = []
            if(snapshot.child(`${this.props.navigation.state.params.zipcode}`).val()!==null){
                city1 = snapshot.child(`${this.props.navigation.state.params.zipcode}`).val();
            }
            console.log('++---snapshot',snapshot.child(`${this.props.navigation.state.params.zipcode}`).val())
           
            this.setState({city:city.concat(city1),complex,loading: false})
        }).bind(this)
    }
    getDescription=(item)=>{
        console.log('++--',item)
        this.setState({address: item.description, data:[]})
        let query = {
            key: 'AIzaSyCVUAFwJyIucwikjyHMmcM9srKk2nKdZn8',
            language: 'en',
            types: 'address'
        };
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?'+QS.stringify({
            placeid: item.place_id,
            key: query.key            
            
        })
        
            axios.get(url)
            .then(responseJson=>{
                // console.log('++--',responseJson.data)
                // this.setState({data: responseJson.data.predictions})
                let zipcode=responseJson.data.result.address_components.filter(d=>{
                    // console.log('------=-=-=',d.types[0])
                    return d.types[0]==='postal_code'
                })[0]
                if(!zipcode) this.setState({addressvalid: false, zipcode:''})
                else this.setState({addressvalid: true,zipcode: zipcode.long_name})
            })
            .catch(error=>{
                alert(error)
            })
    }

    
    
    render(){
        let self = this
        console.log('++--OBJECT',this.state.city, this.state.complex)
        if(this.props.navigation.state.params === undefined) this.props.navigation.state.params={param: false}
        return(
            <View style={styles.container}>
                <View style={styles.header}>                    
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                        <Icon name='ios-arrow-back' size={30} color='#212123'/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Address</Text>
                </View>
                <View style={styles.servicetitle}>
                    <Text style={styles.serviceText}>Do you reside at one of our partner properties?</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 30}}>
                    <View style={styles.inputView}>
                        <TouchableOpacity onPress={()=>this.setState({showCity: true})}>
                            <TextInput 
                                onChangeText={(complex)=>this.complex(complex)}
                                underlineColorAndroid = 'transparent'
                                value = {this.state.complex}
                                style = {styles.textInput}
                                editable={false}
                                placeholder='City'
                            />
                        </TouchableOpacity>
                    </View>

                   

                    {
                        !this.state.addressvalid?
                        <View style={styles.validView}>
                            <Text>Please select your Complex.</Text>
                        </View>:null
                    }
                    {
                        this.state.city.length>0&&this.state.showCity?
                        this.state.city.map(item=>{
                            return(
                                <TouchableOpacity onPress={()=>this.setState({complex:item,showCity: false, addressvalid: true})}>
                                    <View style={styles.locationPreview}>
                                        <Icon name='ios-pin' size={20} color='rgba(0,0,0,0.3)' />
                                        <Text style={styles.locationName}>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }):null
                    }
                    
                    {this.state.complex!=='Not Yet'&&this.state.complex.length>0?
                    <View style={[styles.inputView,{marginTop:25}]}>
                        <TouchableOpacity onPress={()=>this.setState({showComplex: true})}>
                            <TextInput 
                                placeholder='Apt/Unit #'
                                onChangeText={(unit)=>this.setState({unit: unit})}
                                underlineColorAndroid = 'transparent'
                                value = {this.state.unit}
                                style = {styles.textInput}                                
                                
                            />
                        </TouchableOpacity>
                    </View>:null}
                    {
                        !this.state.zipcodevalid&&this.state.city.indexOf('Not Yet')<0?
                        <View style={styles.validView}>
                            <Text>Please select your Apt/Unit.</Text>
                        </View>:null
                    }                    
                   
                    
                    {this.state.complex==='Not Yet'?
                    <View style={[styles.inputView,{marginTop:25}]}>
                        <TextInput 
                            placeholder='Address'
                            onChangeText={(address)=>this.address(address)}
                            underlineColorAndroid = 'transparent'
                            value = {this.state.address}
                            style = {styles.textInput}
                            
                        />
                    </View>:null  }              
                    {
                        this.state.data.length>0&&this.state.showAddress?
                        this.state.data.map(item=>{
                            return(
                                <TouchableOpacity onPress={()=>this.setState({address: item.description,showAddress:false,correctAddress: true})}>
                                    <View style={styles.locationPreview}>
                                        <Icon name='ios-pin' size={20} color='rgba(0,0,0,0.3)' />
                                        <Text style={styles.locationName}>{item.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }):null
                    }
                    <Button text={'CONTINUE'} style={{marginTop:35}} onPress={()=>this.Login()}/>
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
    address(location){
        this.setState({address: location,addressvalid: true, showAddress: true})
        let query = {
            //key: 'AIzaSyCVUAFwJyIucwikjyHMmcM9srKk2nKdZn8',
            key: 'AIzaSyAr1HliRAne44OuG55a6FOOornx_dHgBjA',
            language: 'en',
            types: 'address'
        };
        let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?'+QS.stringify({
            key: query.key,
            input: location,
            types: 'address',
            components:'country:us'
        })
        
            axios.get(url)
            .then(responseJson=>{
                console.log('++--',responseJson.data)
                this.setState({data: responseJson.data.predictions})
            })
            .catch(error=>{
                alert(error)
            })
        
    }
    Login(){
        if(this.state.complex==='') {
            this.setState({addressvalid: false})
            return        }      
        if(!this.state.correctAddress&&this.state.complex==='Not Yet') return
       
        if(this.props.navigation.state.params.param) {
            this.props.navigation.navigate('AddressList')
            return
        }
        let AddressData = {
            zipcode: this.props.navigation.state.params.zipcode,
            complex: this.state.complex,
            unit: this.state.unit,
            address: this.state.address,
            loggedin: this.props.navigation.state.params.loggedin
        }
        this.props.navigation.navigate('Service',{AddressData: AddressData});
        this.setState({complex:'',address: '',unit: ''})
    }
}