import React, {Component} from 'react'
import Header from '../../../../../common/header';
import NormalForm from './addNormalForm'

//添加普通配件的添加页面
class AddNormal extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className='form-panel'>
                <Header title={'添加普通配件'} backUrl={'/auth/main/deviceEquip/normalEquip'}/>
                <NormalForm/>
            </div>
        )
    }
}


export default AddNormal