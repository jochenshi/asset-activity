import React, {Component} from 'react'
import {connect} from 'react-redux'

import Header from '../../../../../common/header'
import SupplyForm from './addSupplyForm'


class AddSupply extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className={'form-panel'}>
                <Header title={'添加耗材类配件'} backUrl={'/auth/main/deviceEquip/supplyEquip'}/>
                <SupplyForm/>
            </div>
        )
    }
}

export default AddSupply