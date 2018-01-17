/**
 * Created by admin on 2017/12/15.
 */
import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import axios from 'axios'

import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'
import NormalEquip from '../../equip/normalEquip/normalEquip'
import AddressMachineWrap from '../addressMachine/addressMachine'
import {connect} from 'react-redux'
import {getAuthority} from '../../../../common/methods'
import MachineExtra from '../machineExtra/machineExtra'

const auth = [
    'deviceMachine',
    'address',
    'deviceEquip'
]

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class DetailMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
    baseTitles = [
        { label : '创建人', key : 'userName'},
        { label : '使用状态', key : 'useStateText'},
        { label : '创建时间', key : 'createdAt'},
    ];
    constructor (props) {
        super(props);
        this.id = props.match.params.id;
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.state = {
            data : {}
        }
        this.getBaseInfo();
    }
    getBaseInfo = ()=>{
        axios.get('/am/machine/'+this.id+'?operate=deviceMachine')
            .then((res)=>{
                if(res.data){
                    this.setState({
                        data : res.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    render () {
        return (
            <div className="form-panel">
                <Header title={'机器详情'} backUrl={this.backUrl}/>
                {this.auth['deviceMachine']?<div className="form">
                    <h1 className="form-field-title">基本信息</h1>
                    <ul className="detail_list">
                        {this.baseTitles.map((item)=>{
                            return <li key={item.key}><label>{item.label}<i>:</i></label><span>{this.state.data[item.key]}</span></li>
                        })}
                    </ul>
                </div>:''}
                <BaseinfoMachineWrap backUrl={this.backUrl} mode="modify" data={this.state.data} passAuth={['deviceMachine','modifyMachine']}/>
                <hr />
                <div className="form">
                    <h1 className="form-field-title">地址信息</h1>
                </div>
                {this.auth['address']?<AddressMachineWrap machineId={this.id} type="ip" passAuth={['address','addAddress','modifyAddress']}/>:'没有权限。'}
                {this.auth['address']?<AddressMachineWrap machineId={this.id} type="ipmi" passAuth={['address','addAddress','modifyAddress']}/>:'没有权限。'}
                <hr />
                <div className="form">
                    <h1 className="form-field-title">附加设备信息</h1>
                </div>
                <MachineExtra/>
                <div className="form">
                    <h1 className="form-field-title">配件信息</h1>
                </div>
                {this.auth['deviceEquip']?<NormalEquip machineId={this.id} page={'detailMachine'} passAuth={['addNormalEquip','linkManyNormal','unlinkNormalEquip']}/>:'没有权限。'}
            </div>
        )
    }
}

export default connect(mapState)(DetailMachine)