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
            moreOptionModal: false,
            addone1:false,
            addone2:false,
            addone3:false,
            addone4:false,
            addone5:false,
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Service')} style={styles.backIcon}>
                        <Icon name='ios-arrow-back' size={30} color='#212123'/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Extras</Text>
                </View>
                <View style={styles.servicetitle}>
                    <Text style={styles.serviceText}>Add-Ons and Special requests</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:18}}>
                    <View style={styles.typeContainer}>
                        <TouchableOpacity onPress={()=>this.setState({addone1:!this.state.addone1})}>
                            <View style={this.state.addone1===true?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={40}  />
                                <Text style={styles.typeText}>Clean inside cabinets</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({addone2:!this.state.addone2})}>
                            <View style={this.state.addone2===true?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={40}  />
                                <Text style={styles.typeText}>Oven</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({addone3:!this.state.addone3})}>
                            <View style={this.state.addone3===true?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={40}  />
                                <Text style={styles.typeText}>Fridge</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({addone4:!this.state.addone4})}>
                            <View style={this.state.addone4===true?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={40}  />
                                <Text style={styles.typeText}>Interior windows</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({addone5:!this.state.addone5})}>
                            <View style={this.state.addone5===true?styles.cleaningTypeView_active:styles.cleaningTypeView}>
                                <Icon name='ios-woman' size={40}  />
                                <Text style={styles.typeText}>Laundry wash & dry</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Button text={'CONTINUE'} style={{marginVertical:15}} onPress={()=>this.Next()}/>
                </ScrollView>
                
            </View>
        )
    }
    Next(){
        this.props.navigation.navigate('Schedule')
    }

}