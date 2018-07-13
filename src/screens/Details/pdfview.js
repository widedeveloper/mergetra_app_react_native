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
    ScrollView,
    Alert
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome'
import Button from '../../components/button';
import axios from 'axios';
import PDFView from 'react-native-view-pdf';
import ImagePicker from 'react-native-image-picker';
import SignatureCapture from 'react-native-signature-capture';
import { captureRef, captureScreen } from "react-native-view-shot";
import Mailer from 'react-native-mail';
import RNFS from 'react-native-fs';
import QS from 'qs';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        const { params } = this.props.navigation.state;
        this.state = {
            PDFUrl: params.PDFUrl,
            filekey: params.filekey,
            token: params.token,
            detail_id: params.detail_id,

            imagePath:null,
            basedata: null,
            basedataURI:null,
            signature_flag: false,
            value: {
                format: "jpg",
                quality: 0.8,
                result:'base64'
                
            }
        }
    }

  handleEmail = () => {
    Mailer.mail({
      subject: '',
      recipients: [''],
      ccRecipients: [''],
      bccRecipients: [''],
      body: '',
      isHTML: true,
      attachment: [{
        path: this.state.imagePath,  // The absolute path of the file from which to read data.
        type: 'jpg',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
        name: 'Image',   // Optional: Custom filename for attachment
      }]
    }, (error, event) => {
      Alert.alert(
        error,
        event,
        [
          {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
          {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
        ],
        { cancelable: true }
      )
    });
  }

    captureScreenFunction = refname => () =>
        (
            refname ?
                captureRef(this.refs[refname], this.state.value)
                : captureScreen(this.state.value)
        )
            .then(
                res => (
                    this.setState({ basedata: res }),
                    console.log(res),
                    this.imageUplaod()
                )
            )
            .catch(
            error => (
                console.warn(error)
            )
            )
    render() {
        return (

            <View style={styles.containerV}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.filedelte()} style={styles.backIcon}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.closeIcon}>
                            <Icon name='ios-close' size={30} color='#212123' />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle_home}>{this.state.PDFUrl.toLowerCase().indexOf('.pdf') > -1 ? 'PDF' : 'Image'}</Text>
                    </View>
                    <View ref="capturecon" style={styles.container}>
                                <View style={{ flex: 1 }}>
                                    <PDFView
                                        style={styles.pdfview}
                                        onError={(error) => console.log('onError', error)}
                                        onLoad={() => console.log('PDF rendered from base 64 data')}
                                        resource={`${this.state.PDFUrl}`}
                                        resourceType='url'
                                        />
                                    {
                                        this.state.signature_flag ?
                                            <SignatureCapture
                                                style={styles.signature}
                                                ref="sign"
                                                onSaveEvent={this._onSaveEvent}
                                                onDragEvent={this._onDragEvent}
                                                saveImageFileInExtStorage={false}
                                                showNativeButtons={false}
                                                showTitleLabel={false}
                                                viewMode={"portrait"} />
                                            : null
                                    }
                                </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "column" }}>
                                <View style={{ position: 'absolute', bottom: 0, flexDirection: "row" }}>
                                    {
                                        this.state.signature_flag ?
                                            <TouchableOpacity style={styles.buttonStyleOn}
                                                onPress={() => { this.signOnOff() } } >
                                                <Text style={{ color: '#FFFFFF' }}>Sign</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={styles.buttonStyle}
                                                onPress={() => { this.signOnOff() } } >
                                                <Text>Sign</Text>
                                            </TouchableOpacity>
                                    }
                                    <TouchableOpacity style={styles.buttonStyle} onPress={this.captureScreenFunction('capturecon')} >
                                        <Text>Send Email</Text>
                                    </TouchableOpacity>
                                </View>
                   </View>

                </View>
            </View>

        )
    }
    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }
    signOnOff() {
        this.setState({ signature_flag: !this.state.signature_flag })
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log(result);
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }


    showPDFView(PDFUrl, key) {
        if (PDFUrl === '') return
        this.setState({ PDFUrl: encodeURI(PDFUrl), filekey: key })
        this.setModalVisible(true)
    }
    attachfile(str) {
        return str.split(',');
    }
    filedelte() {
        Alert.alert(
            'Delete Image',
            'Are you sure ?',
            [
                { text: 'Cancel' },
                { text: 'OK', onPress: () => this.okbtn() }
            ],
            { cancelable: false }
        )
    }
    okbtn() {
        this.setState({ modalVisible: false })

        fetch('http://mergetransit.com/api/api_delete_file', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.token}`,
            },
            body: JSON.stringify({
                detail_id: this.state.detail_id,
                no: this.state.filekey
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    return;
                }
                alert('File deleted successfully.')
                //this.setState({DetailData:responseJson.data[0]})
                this.props.navigation.goBack()
            })
            .catch((error) => {
                alert(error);
            });
    }

    imageUplaod() {
        // var imagepath = RNFS.DocumentDirectoryPath + '/image.jpg'
        var imagepath = RNFS.ExternalStorageDirectoryPath + '/image.jpg'
        
        this.setState({imagePath:imagepath})
        console.log(imagepath);
        RNFS.writeFile(imagepath, this.state.basedata, 'base64')
        .then(()=> 
                console.log(this.state.imagePath),
                this.handleEmail()
        )
        .catch((err)=>{
            alert(err.message)
        })
        
        fetch('http://mergetransit.com/api/api_imageupload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.state.token}`,
            },
            body: JSON.stringify({
                detail_id: this.state.detail_id,
                imageupload: this.state.basedata
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.error) {
                return;
            }

            //alert('upload successfully')
            //this.setState({DetailData:responseJson.data[0]})

        })
        .catch((error) => {
            alert(error);
        });






    }
}