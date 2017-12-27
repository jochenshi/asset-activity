import React,{ Component } from 'react'
import Header from '../../../../common/header'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'

const auth = [
    'addMachine'
]


class AddMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
    render () {
        return (
            <div className="form-panel">
                <Header title={'添加机器'} backUrl={this.backUrl}/>
                <BaseinfoMachineWrap backUrl={this.backUrl} mode="add"/>
            </div>
        )
    }
}

export default AddMachine