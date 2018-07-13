import React, { Component } from 'react';
import {View , Image,Text,TouchableOpacity, ImageBackground, Dimensions} from 'react-native'
import styles from './styles';
export default class Button extends Component{
   
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.container, this.props.style]}>
                     <Text style={styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}