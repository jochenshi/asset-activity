/**
 * Created by admin on 2017/12/15.
 */
import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import axios from 'axios'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'
import NormalEquip from '../../equip/normalEquip';

class DetailMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
    baseTitles = [
        { label : '创建人', key : 'account'},
        { label : '使用状态', key : 'useStateText'},
        { label : '创建时间', key : 'createdAt'},
    ];
    constructor (props) {
        super(props);
        this.id = props.match.params.id;
        this.state = {
            data : {}
        }
        this.getBaseInfo();
    }
    getBaseInfo = ()=>{
        axios.get('/am/machine/'+this.id+'?operate=deviceMachine')
            .then((res)=>{
                if(res.data){
                    console.log(res.data);
                    console.log(typeof res.data);
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
                <div className="form">
                    <h1 className="form-field-title">基本信息</h1>
                    <ul className="detail_list">
                        {this.baseTitles.map((item)=>{
                            return <li key={item.key}><label>{item.label}<i>:</i></label><span>{this.state.data[item.key]}</span></li>
                        })}
                    </ul>
                </div>
                <BaseinfoMachineWrap backUrl={this.backUrl} mode="modify" data={this.state.data}/>
                <hr />
                <div className="form">
                    <h1 className="form-field-title">配件信息</h1>
                </div>
                <NormalEquip machineId={this.id} equipType={"netcard"}/>
                <NormalEquip machineId={this.id} equipType={"netcard"}/>
                <NormalEquip machineId={this.id} equipType={"memory"}/>
                {/*<Divider />*/}
            </div>
        )
    }
}

export default DetailMachine