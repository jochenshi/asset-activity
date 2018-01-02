import React,{ Component } from 'react'
import Header from '../../../../common/header'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'

const auth = [
    'addMachine'
]


class AddMachine extends Component {
    backUrl = '/auth/main/deviceMachine';
    constructor (props){
        super(props);
    }
    render () {
        return (
            <div className="form-panel">
                <Header title={'添加机器'} backUrl={this.backUrl}/>
                {this.auth['addMachine'] ? <BaseinfoMachineWrap backUrl={this.backUrl} mode="add"/>:'没有添加机器的权限。'}
            </div>
        )
    }
}

export default AddMachine