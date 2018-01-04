import React, {Component} from 'react'
import {Table, Button} from 'antd'
import {connect} from 'react-redux'
import axios from 'axios'

import {getAuthority} from '../../../../common/methods'

import './supplyEquip.styl'


const titles = [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '类型',
        dataIndex: 'equipType'
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '品牌',
        dataIndex: 'brand'
    },
    {
        title: '数量',
        dataIndex: 'number'
    },
    {
        title: '剩余数量',
        dataIndex: 'remainNumber'
    },
    {
        title: '新增人',
        dataIndex: 'creator'
    },
    {
        title: '新增时间',
        dataIndex: 'createTime'
    },
/*    {
        title: '当前使用状态',
        dataIndex: 'useState'
    },*/
    {
        title: '描述',
        dataIndex: 'description'
    }
];
const fixedAuth = ['addSupplyEquip','assignSupplyEquip','refreshSupplyEquip'];
const data =[];
const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin,
        authority: state.authArray.authority
    }
};


class SupplyEquip extends Component {
    constructor (props) {
        super(props);
        this.authority = getAuthority(props.authority, fixedAuth, props.passAuth);
        this.state = {
            titles: titles,
            tableData: []
        }
    }
    componentDidMount () {
        this.getTableData();
    }
    getTableData () {
        axios.get('/am/equip/supplyEquip',{
            params: {
                type: 'all'
            }
        }).then((data) => {
            data.data.length && this.setState({
                tableData: data.data
            })
        })
    }
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addSupplyEquip']) {
                arr.push(<Button key={'addSupplyEquip'} className="assign_add" onClick={ () => {this.props.history.push('/auth/main/addSupply')}}>添加</Button>)
            }
            if (authority['assignSupplyEquip']) {
                arr.push(<Button key='assignSupplyEquip' className="assign_equip">分配</Button>)
            }

        }
        arr.push(<Button key='refreshSupplyEquip' className="refresh_equip">刷新</Button>);
        console.log(arr);
        return arr;
    }
    render () {
        const rowSelection = {
            onChange: (rowKeys, rows) => {
                console.log('select');
                console.log(rowKeys, rows)
            }
        };
        return (
            <div className="supply_render">
                <div className="button_area">
                    {this.generateButton()}
                </div>
                <div className="table_area">
                    <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.tableData} />
                </div>
            </div>
        )
    }
}

export default connect(mapState)(SupplyEquip)