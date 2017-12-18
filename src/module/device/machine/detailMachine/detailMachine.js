/**
 * Created by admin on 2017/12/15.
 */
import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import axios from 'axios'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'

class DetailMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
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
                    <ul></ul>
                </div>
                <BaseinfoMachineWrap backUrl={this.backUrl} mode="modify" data={this.state.data}/>
            </div>
        )
    }
}

export default DetailMachine