import React,{Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import Header from '../../../common/header'
import {getAuthority, dateFormat} from '../../../common/methods'

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class DetailUser extends Component {
    baseTitles = [
        {label: '新增人', key: 'creator'},
        {label: '新增时间', key: 'createTime', formatter: (value) => {return dateFormat('YYYY-MM-DD hh-mm', value)}}
    ];
    constructor (props) {
        super(props);
        this.backUrl = '/auth/main/userManage';
    }
    handleBack = () => {
        this.props.history.go(-1);
    };
    render () {
        return (
            <div className={'form-panel'}>
                <Header title={'用户详情'} onBack={this.handleBack}/>
                <div className={'form'}>
                    <h1 className={'form-field-title'}>创建信息</h1>
                    <ul className={'detail_list'}>
                        {this.baseTitles.map((item) => {
                            let txt = '-';
                            if (item.formatter) {
                                txt = item.formatter(this.props.location.state[item.key])
                            } else {
                                txt = this.props.location.state[item.key]
                            }
                            return <li key={item.key}><label>{item.label}<i>:</i></label><span>{txt}</span></li>
                        })}
                    </ul>
                    <h1 className={'form-field-title'}>基本信息</h1>
                </div>
            </div>
        )
    }
}

let NowDetail = connect(mapState)(DetailUser);

export default withRouter(NowDetail);