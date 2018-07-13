import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
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
        const { user_info }= params.user_info;
        this.state={
            email: '',
            password: '',
            showarray:[],
            drawer: false,
            modalVisible: false,
            PDFUrl:'',
            PropsData: params.user_info,
            ReportsData: null,
            NowYear:'',
            dataload:false
        }
    }
    componentWillMount(){
        let NowDate = new Date()
        let Year = NowDate.getFullYear()
        let Month = NowDate.getMonth() + 1;
        this.setState({NowYear:Year})

        console.log(this.state.PropsData); 
        fetch('http://mergetransit.com/api/api_invoice', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.state.PropsData.token}`,
                }
            })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.error){
                this.props.navigation.goBack()
            }
            //console.log(responseJson.data.invoices); 
            
            this.setState({ReportsData:responseJson.data,dataload:true})
        })
        .catch((error) => {
            alert(error);
        });





    }


    setModalVisible(visible){
        this.setState({modalVisible:visible})
    }

    render(){
        console.log(this.state.ReportsData)
        return(
                 <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.backIcon}>
                            <View style={{width:60}}>
                            <Icon name='ios-arrow-back' size={30} color='#212123'/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle_home}>Billing History</Text>
                        
                    </View>
                    <View style={styles.statecotainer}>
                    <Text style={styles.CompanyTitle}>{this.state.PropsData.companyname}</Text>
                        <View  style={styles.SelYear}>
                            <TouchableOpacity  onPress={()=>this.YearDec()}>
                                <Icon name='ios-arrow-dropleft-circle' size={20} style={{marginRight:10,color:'#C7C7C7'}} />
                            </TouchableOpacity>
                            <Text style={styles.YearText}>{this.state.NowYear}</Text>
                            <TouchableOpacity  onPress={()=>this.YearInc()}>
                                <Icon name='ios-arrow-dropright-circle' size={20} style={{marginLeft:10,color:'#C7C7C7'}} />
                            </TouchableOpacity>
                        </View>
                    
                    </View>

                        <View style={styles.tableTitle}>
                            <View style={styles.tableCols2}>
                                <Text style={styles.titleName}>Invoice No</Text>
                            </View>
                            <View style={styles.tableCols1}>
                                <Text style={styles.titleName}>Due Date</Text>
                            </View>
                            <View style={styles.tableCols2}>
                                <Text style={styles.titleName}>Amount</Text>
                            </View>
                            <View style={styles.tableCols2}>
                                <Text style={styles.titleName}>Status</Text>
                            </View>
                        </View>
                        <ScrollView style={{marginBottom:35}} >
                        {
                            this.state.ReportsData && this.state.ReportsData.invoices.length>0?
                            this.state.ReportsData.invoices.map(item=>{
                                return(
                                        
                                        <View>
                                        {
                                            item.invoice.due_date.indexOf(this.state.NowYear)>-1?
                                                <View>
                                                            <View style={styles.tableView}>
                                                                <View style={styles.tableCols3}>
                                                                    <TouchableOpacity onPress={()=>this.showDetails(item.invoice.id)}>
                                                                        {
                                                                            this.state.showarray.indexOf(item.invoice.id) > -1?
                                                                            <Icon name='ios-arrow-dropdown-circle' size={20} style={{marginRight:10,color:'#d33333'}} />
                                                                            :<Icon name='ios-arrow-dropright-circle' size={20} style={{marginRight:10,color:'#31b131'}} />
                                                                        }
                                                                    </TouchableOpacity>
                                                                    <Text style={styles.tableText}>{item.invoice.invoice_no}</Text>
                                                                </View>
                                                                <View style={styles.tableCols1}>
                                                                    <Text style={styles.tableText}>{item.invoice.due_date}</Text>
                                                                </View>
                                                                <View style={styles.tableCols2}>
                                                                    <Text style={styles.tableText}>{`$${item.invoice.bill_amount}`}</Text>
                                                                </View>
                                                                <View style={styles.tableCols2}>
                                                                    <Text style={styles.tableText}>{item.invoice.paid_status===1?'Paid':'No'}</Text>
                                                                </View>                                                                
                                                            </View>
                                                            {
                                                            this.state.showarray.indexOf(item.invoice.id) > -1?
                                                                <View>
                                                                        {
                                                                            item.invoice_details.length>0?
                                                                            item.invoice_details.map(detail=>{
                                                                            return(
                                                                                <View style={styles.DetailView}>
                                                                                    <View style={styles.DetailRow}>
                                                                                        <Text>{detail.tra_company} </Text>
                                                                                    </View>
                                                                                    <View style={styles.DetailRow}>
                                                                                        <Text style={styles.DetailTitle}>{detail.revenue>=1000?'Over $1000':'Under $1000'}</Text>
                                                                                        <Text style={styles.DetailTitle}>{detail.pu_date}</Text>
                                                                                        <Text style={styles.DetailTitle}>{detail.driver_name}</Text>
                                                                                        <Text style={styles.DetailTitle}>{`$${detail.revenue}`} / {detail.billing_amount}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                            })
                                                                            :null
                                                                        }
                                                                        {
                                                                            item.invoice_specials.length>0?
                                                                            item.invoice_specials.map(detail=>{
                                                                            return(
                                                                                <View style={styles.DetailView}>
                                                                                    <View style={styles.DetailRow}>
                                                                                        <Text style={styles.DetailTitle}>{detail.activity}</Text>
                                                                                        <Text style={styles.DetailTitle}></Text>
                                                                                        <Text style={styles.DetailTitle}></Text>
                                                                                        <Text style={[styles.DetailTitle,{marginLeft: 40}]}>{detail.amount}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            )
                                                                            })
                                                                            :null                                                                            
                                                                        }

                                                                        <View style={styles.totalDetailRow}>
                                                                                <Text style={styles.totalDetailTitle}>Balance Due:</Text>
                                                                                <Text style={styles.totalDetailTitle}>{`$${item.invoice.bill_amount}`}</Text>
                                                                        </View> 
                                                                </View>
                                                            :null
                                                            }

                                                </View>
                                            :null
                                        }
                                        </View>
                                    )

                            })
                            :
                            !this.state.dataload?
                                <View style={styles.horizontal}>
                                    <ActivityIndicator size='small'color='#0000ff' />
                                </View>
                            :null
                        }
                        </ScrollView>
                    <Modal animationType='slide' transparent={false} visible={this.state.modalVisible} >
                            <View style={{ flex: 1 }}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={()=>this.setModalVisible(!this.state.modalVisible)} style={styles.closeIcon}>
                                        <Icon name='ios-close' size={30} color='#212123'/>
                                    </TouchableOpacity>
                                    <Text style={styles.headerTitle_home}>PDF</Text>
                                </View>
                                <PDFView
                                    style={{ flex: 1 }}
                                    onError={(error) => console.log('onError', error)}
                                    onLoad={() => console.log('PDF rendered from base 64 data')}
                                    resource= {`${this.state.PDFUrl}`}
                                    resourceType= 'url'
                                />
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
    YearDec(){
        let NowYear = this.state.NowYear -1
        this.setState({NowYear: NowYear})  
    }
    YearInc(){
        let NowYear = this.state.NowYear + 1
        this.setState({NowYear: NowYear})  
    }



    showPDFView(PDFUrl){
        if(PDFUrl==='') return
        console.log(PDFUrl)
        this.setState({PDFUrl: encodeURI(PDFUrl)})

        this.setModalVisible(true)
    }




}