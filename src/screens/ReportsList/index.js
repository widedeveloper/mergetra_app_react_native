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
  Modal,
  ScrollView,
  ImageBackground
} from 'react-native';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../components/button';
import Drawer from 'react-native-drawer-menu';
import PDFView from 'react-native-view-pdf';
export default class Login extends Component {
    static navigationOptions = {
        header: null
    }
    constructor(props){
        super(props)
        const { params } = this.props.navigation.state;
        var user_info = params.ReportsData;
        this.state={
            email: '',
            password: '',
            showarray:[],
            drawer: false,
            modalVisible: false,
            PDFUrl:'',
            ReportsData: user_info,
        }
    }
    setModalVisible(visible){
        this.setState({modalVisible:visible})
    }

    render(){
        return(
                 
                 <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                            <View style={{width:60}}>
                                <Icon name='ios-arrow-back' size={30} color='#212123'/>
                            </View>

                        </TouchableOpacity>
                        <Text style={styles.headerTitle_home}>Reports View</Text>
                    </View>
                    <View style={styles.statecotainer}>
                    <Text style={this.state.ReportsData.infor.from?styles.CompanyTitle1:styles.CompanyTitle}>{this.state.ReportsData.infor.driver_name}</Text>
                    {
                     this.state.ReportsData.infor.from?
                        <Text style={[styles.CompanyTitle1,{fontSize: 14}]}>{this.state.ReportsData.infor.from} ~ {this.state.ReportsData.infor.to}</Text>:null
                    }
                        <View style={styles.locationView}>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total Revenue</Text>
                                <Text style={styles.schedulename}>{this.state.ReportsData.infor.total_revenue}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total Miles</Text>
                                <Text style={styles.schedulename}>{this.state.ReportsData.infor.total_mile}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>Total DHO</Text>
                                <Text style={styles.schedulename}>{this.state.ReportsData.infor.total_dho}</Text>
                            </View>
                            <View style={styles.dupView}>
                                <Text style={styles.locationName}>All Mile RPM</Text>
                                <Text style={styles.schedulename}>{this.state.ReportsData.infor.total_rpm}</Text>
                            </View>
                        </View>
                    </View>

                        <View style={styles.tableTitle}>
                            <View style={styles.tableCols1}>
                                <Text style={styles.titleName}>Company</Text>
                            </View>
                            <View style={styles.tableCols1}>
                                <Text style={styles.titleName}>Revenue</Text>
                            </View>
                            <View style={styles.tableCols2}>
                                <Text style={styles.titleName}>Miles</Text>
                            </View>
                        </View>
                        <ScrollView style={{marginBottom:35}} >
                        {
                            this.state.ReportsData.reports.length>0?
                            this.state.ReportsData.reports.map(item=>{
                                return(
                                        <View>
                                        <View style={styles.tableView}>
                                            <View style={styles.tableCols3}>
                                                <TouchableOpacity onPress={()=>this.showDetails(item.id)}>
                                                    {
                                                        this.state.showarray.indexOf(item.id) > -1?
                                                        <Icon name='ios-arrow-dropdown-circle' size={20} style={{marginRight:10,color:'#d33333'}} />
                                                        :<Icon name='ios-arrow-dropright-circle' size={20} style={{marginRight:10,color:'#31b131'}} />
                                                    }
                                                    
                                                </TouchableOpacity>
                                                <Text style={styles.tableText}>{item.company}</Text>
                                            </View>
                                            <View style={styles.tableCols1}>
                                                <Text style={styles.tableText}>{item.revenue}</Text>
                                            </View>
                                            <View style={styles.tableCols2}>
                                                <Text style={styles.tableText}>{item.mile}</Text>
                                            </View>
                                        </View>
                                        {
                                            this.state.showarray.indexOf(item.id) > -1?
                                            <View style={styles.DetailView}>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Contact :</Text>
                                                    <Text style={styles.DetailTitle}>{item.contact}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>PO# :</Text>
                                                    <Text style={styles.DetailTitle}>{item.po}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Pu Date :</Text>
                                                    <Text style={styles.DetailTitle}>{item.put_date}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Del Date :</Text>
                                                    <Text style={styles.DetailTitle}>{item.del_date}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Origin :</Text>
                                                    <Text style={styles.DetailTitle}>{item.origin}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Destination :</Text>
                                                    <Text style={styles.DetailTitle}>{item.destination}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Weight :</Text>
                                                    <Text style={styles.DetailTitle}>{item.weight}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>DHO :</Text>
                                                    <Text style={styles.DetailTitle}>{item.dho}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>RPM :</Text>
                                                    <Text style={styles.DetailTitle}>{item.rpm}</Text>
                                                </View>                                                                
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>DH RPM :</Text>
                                                    <Text style={styles.DetailTitle}>{item.dh_rpm}</Text>
                                                </View>
                                                <View style={styles.DetailRow}>
                                                    <Text style={styles.DetailTitle}>Attach :</Text>
                                                    {
                                                        item.upload===''? 
                                                        <Text style={[styles.DetailTitle]}></Text> :
                                                        <View style={styles.attachView}>
                                                        {
                                                            this.attachfile(item.upload).length>0?
                                                                this.attachfile(item.upload).map((value, key)=>{
                                                                    return(
                                                                        <TouchableOpacity onPress={()=>this.showPDFView(value)} key={key}>
                                                                            <Text style={[styles.DetailAttach,{color:'#31b131'}]}>{`File${key}`}</Text>
                                                                        </TouchableOpacity>
                                                                    )
                                                                })
                                                            :<Text style={[styles.DetailTitle]}></Text>
                                                        }
                                                        </View>
                                                    }
                                                            
                                                        
                                                </View>
                                            </View>
                                            :null
                                        }
                                        </View>
                                    )

                            }):null
                        }
                        </ScrollView>
                        
                        
                    <Modal animationType='slide' transparent={false} visible={this.state.modalVisible} >
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible)} style={styles.closeIcon}>
                                        <Icon name='ios-close' size={30} color='#212123'/>
                                    </TouchableOpacity>
                                    <Text style={styles.headerTitle_home}>{this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?'PDF':'Image'}</Text>
                                </View>
                                {
                                    this.state.PDFUrl.toLowerCase().indexOf('.pdf')>-1?
                                    <PDFView
                                        style={{ flex: 1 }}
                                        onError={(error) => console.log('onError', error)}
                                        onLoad={() => console.log('PDF rendered from base 64 data')}
                                        resource= {`${this.state.PDFUrl}`}
                                        resourceType= 'url'
                                    />
                                    :
                                    <Image source={{uri: this.state.PDFUrl}} style={styles.image}  ></Image>
                                }
                                
                            </View>
                    </Modal>
                </View>
                
        )
    }

    showDetails(id){
        let showArray=this.state.showarray
        let index = showArray.indexOf(id)
        if(index > -1)
            showArray.splice(index, 1)
        else
            showArray.push(id)

        this.setState({showarray: showArray})    
    }
    showPDFView(PDFUrl){
        if(PDFUrl==='') return
        this.setState({PDFUrl: encodeURI(PDFUrl)})
        this.setModalVisible(true)
    }

    attachfile(str){
        return  str.split(',');
    }




}