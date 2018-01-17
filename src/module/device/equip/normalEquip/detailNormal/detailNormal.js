import React, {Component} from 'react';
import {connect} from 'react-redux'

import Header from '../../../../../common/header'
import {getAuthority,dateFormat} from '../../../../../common/methods'
import NormalForm from '../addNormal/addNormalForm'

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};
const fixAuth = ['deviceEquip'];

class DetailNormal extends Component {
    baseTitles = [
        {label: '新增人', key: 'creator'},
        {label: '当前使用状态', key: 'equipUseState'},
        {label: '新增时间', key: 'createTime',formatter: (value) => {return dateFormat('YYYY-MM-DD hh:mm', value)}}
    ];
    constructor (props) {
        super(props);
        this.backUrl = '/auth/main/deviceEquip/normalEquip';
        this.auth = getAuthority(this.props.authority, fixAuth, this.props.passAuth);
        this.state = {
            data: props.location.state || {}
        };
        console.log(props.location);
        console.log(props.match.params)
    }
    render () {
        return (
            <div className={'form-panel'}>
                <Header title={'普通配件详情'} backUrl={this.backUrl}/>
                {
                    this.auth['deviceEquip'] ?
                        <div className={'form'}>
                            <h1 className={'form-field-title'}>基本信息</h1>
                            <ul className={'detail_list'}>
                                {this.baseTitles.map((item) => {
                                    let txt = '-';
                                    let val = this.props.location.state[item.key];
                                    if (val) {
                                        if (item.formatter) {
                                            txt = item.formatter(val)
                                        } else {
                                            txt = val
                                        }
                                    }
                                    return <li key={item.key}><label>{item.label}<i>:</i></label><span>{txt}</span></li>
                                })}
                            </ul>
                        </div> :
                        ''
                }
                <NormalForm data={this.state.data} mode={'modify'}/>
            </div>
        )
    }
}

export default connect(mapState)(DetailNormal)