import React,{ Component } from 'react'
import {Table, Button} from 'antd'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

import TitleOption from '../../common/titleOption'
import {dateFormat, getAuthority} from '../../common/methods'

import './user.styl'

const titles = [
    {
        title: '用户名',
        dataIndex: 'name',
        render: (text, record) => {
            let path = {
                pathname: '/auth/main/userManage/' + record.account,
                state: record
            };
            return <Link to={path}>{text}</Link>;
        }
    },
    {
        title: '账号',
        dataIndex: 'account'
    },
    {
        title: '角色',
        dataIndex: 'role'
    },
    {
        title: '电话',
        dataIndex: 'phone'
    },
    {
        title: '邮箱',
        dataIndex: 'email'
    },
    {
        title: '有效性',
        dataIndex: 'isValid',
        render: (text, record) => {
            return text ? '是' : '否';
        }
    },
    {
        title: '能否登录',
        dataIndex: 'canLogin',
        render: (text, record) => {
            return text ? '是' : '否';
        }
    },
    {
        title: '创建人',
        dataIndex: 'creator'
    },
    {
        title: '新增时间',
        dataIndex: 'createTime',
        render: (text, record) => {
            let time = dateFormat('YYYY-MM-DD hh:mm', text);
            return time
        }
    },
    {
        title: '描述',
        dataIndex: 'description'
    },
];
const fixedAuth = ['addUser'];

const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin,
        authority: state.authArray.authority
    }
};

class UserManage extends Component {
    constructor (props) {
        super(props);
        this.authority = getAuthority(this.props.authority, fixedAuth, this.props.passAuth);
        this.state = {
            titles: titles,
            tableData: [],
            loading: false
        }
    }
    componentDidMount () {
        this.getTableData();
    }
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addUser']) {
                arr.push(<Button key={'addUser'} className="add_user" onClick={ () => {this.props.history.push('/auth/main/addUser')}}>添加</Button>)
            }
            if (authority['modifyUser']) {
                arr.push(<Button key='modifyUser' className="modify_user">修改</Button>)
            }

        }
        arr.push(<Button key='refreshUser' className="refresh_user" onClick={() => {this.refreshTable()}}>刷新</Button>);
        console.log('qqqq');
        console.log(arr);
        return arr;
    }
    getTableData () {
        this.setState({
            loading: true
        });
        axios.get('/am/user/all')
            .then((val) => {
                console.log(val);
                val.data.length && this.setState({
                    tableData: val.data
                });
                this.setState({
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
    }
    refreshTable = () => {
        this.getTableData();
    };
    onTreeChange = (titles) => {
        this.setState({
            titles : titles
        })
    };
    render () {
        const rowSelection = {
            onChange: () => {}
        };
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    {this.generateButton()}
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <div className={'table_content'}>
                    <Table columns={this.state.titles} rowSelection={rowSelection} loading={this.state.loading} dataSource={this.state.tableData}/>
                </div>
            </div>
        )
    }
}

export default connect(mapState)(UserManage)