/**
 * Created by admin on 2017/12/15.
 */
import React,{ Component } from 'react'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'

class DetailMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
    constructor (props) {
        super(props);
        this.state = {
            data : {}
        }
    }
    render () {
        return (
            <div className="form-panel">
                <Header title={'机器详情'} backUrl={this.backUrl}/>
                <div className="form">
                    <h1 className="form-field-title">基本信息</h1>
                    <ul></ul>
                </div>
                <BaseinfoMachineWrap backUrl={this.backUrl} mode="modify"/>
            </div>
        )
    }
}

export default DetailMachine