import React, {Component} from 'react'

import Header from '../../../common/header'
import UserForm from './addUserForm'

class AddUser extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className={'form-panel'}>
                <Header title={'添加用户'} backUrl={'/auth/main/userManage'}/>
                <UserForm/>
            </div>
        )
    }
}

export default AddUser