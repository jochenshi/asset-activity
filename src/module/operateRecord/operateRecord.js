import React,{ Component } from 'react'
import {Table, Button} from 'antd'
import axios from 'axios'
import moment from 'moment'

import TitleOption from '../../common/titleOption'
import {connect} from 'react-redux'
import {getAuthority} from '../../common/methods'
import {dateFormat} from '../../common/methods'

const titles = [
    {
        title: '操作类型',
        dataIndex: 'authority',
        key: 'authority',
        render: (text, record) => {
            return text.name
        }
    },
    {
        title: '机器',
        dataIndex: 'machines',
        key: 'machines',
        render: (text, record) => {
            let arr = [];
            if (text.length) {
                text.forEach((val) => {
                    arr.push(val.name)
                });
                return arr.join()
            } else {
                return '—'
            }
        }
    },
    {
        title: '普通配件',
        dataIndex: 'fittings',
        key: 'fittings',
        render: (text, record) => {
            let arr = [];
            if (text.length) {
                text.forEach((val) => {
                    arr.push(val.name)
                });
                return arr.join()
            } else {
                return '—'
            }
        }
    },
    {
        title: '耗材配件',
        dataIndex: 'parts',
        fitting: 'parts',
        render: (text, record) => {
            let arr = [];
            if (text.length) {
                text.forEach((val) => {
                    arr.push(val.name)
                });
                return arr.join()
            } else {
                return '—'
            }
        }
    },
    {
        title: '目标对象',
        dataIndex: 'users',
        key: 'users',
        render: (text, record) => {
            let arr = [];
            if (text.length) {
                text.forEach((val) => {
                    arr.push(val.name)
                });
                return arr.join()
            } else {
                return '—'
            }
        }
    },
    {
        title: '操作人',
        dataIndex: 'operateUser',
        key: 'operateUser',
        render: (text, record) => {
            return text.name
        }
    },
    {
        title: '操作时间',
        dataIndex: 'occurTime',
        key: 'occurTime',
        render: (text, record) => {
            let time = dateFormat('YYYY-MM-DD hh:mm', text);
            return time
        }
    },
    {
        title: '描述',
        dataIndex: 'description',
        key: 'description'
    }
];

const auth = [
    'showOperationRecord'
];

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class OperateRecord extends Component {
    constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.state = {
            records: [],
            titles: titles,
            loading: true
        }
    }
    componentDidMount () {
        this.getOperationRecord();
    }
    getOperationRecord () {
        this.setState({
            loading: true
        });
        axios.get('/am/operation')
            .then((res) => {
                this.setState({
                    records: res.data,
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
            })
    }
    generateButton () {
        let arr = [], authority = this.authority;
        /*if (Object.getOwnPropertyNames(authority).length) {

        }*/
        arr.push(<Button key={'refreshRecord'} className={'refresh_record'} onClick={this.refreshTable}>刷新</Button>);
        return arr;
    }
    refreshTable = () => {
        this.getOperationRecord()
    };
    onTreeChange = (titles)=>{
        this.setState({
            titles : titles
        })
    };
    render () {
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    {this.generateButton()}
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <Table columns={this.state.titles} dataSource={this.state.records} loading={this.state.loading}/>
            </div>
        )
    }
}

export default connect(mapState)(OperateRecord)