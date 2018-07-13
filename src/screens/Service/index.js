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
import Button from '../../components/button'
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
            howoften: 0,
            moreOptionModal: false
        }
    }
    render(){
        const {goBack} = this.props.navigation;
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>goBack()} style={styles.backIcon}>
                        <Icon name='ios-arrow-back' size={30} color='#212123'/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Service</Text>
                </View>
                <View style={styles.servicetitle}>
                    <Text style={styles.serviceText}>What kind of service would you like?</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:18}}>
                    <View style={styles.typeContainer}>
                        <TouchableOpacity onPress={()=>this.setState({cleaningType:1,howoften:0})}>
                            <View style={this.state.cleaningType===1?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={60}  />
                                <Text style={styles.typeText}>$40 / 2 hour{'\n'}No add-ons{'\n'}Cleaning</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({cleaningType:2,howoften:0})}>
                            <View style={this.state.cleaningType===2?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={60}  />
                                <Text style={styles.typeText}>$80 / 2 hour{'\n'}2 add-ons{'\n'}Cleaning</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({cleaningType:3,howoften:0})}>
                            <View style={this.state.cleaningType===3?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={60}  />
                                <Text style={styles.typeText}>$120 / 3 hour{'\n'}4 add-ons{'\n'}Cleaning</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Button text={'CONTINUE'} style={{marginVertical:15}} onPress={()=>this.Next()}/>
                </ScrollView>
                
            </View>
        )
    }
    Next=()=>{
        const {AddressData} = this.props.navigation.state.params;        
        AddressData.cleaningType = this.state.cleaningType;
        // console.log('++---',AddressData)
        if(this.state.cleaningType===1){
            if(AddressData.loggedin) this.props.navigation.navigate('Schedule',{ServiceData: AddressData})
            else this.props.navigation.navigate('Signup',{ServiceData: AddressData})
        }else{
            this.props.navigation.navigate('Extras',{ServiceData: AddressData})
        }
    }

}