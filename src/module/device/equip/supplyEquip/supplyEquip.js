import React, {Component} from 'react'
import {Table, Button} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import {dateFormat, getAuthority} from '../../../../common/methods';
import TitleOption from '../../../../common/titleOption';

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
        title: '总数量',
        dataIndex: 'number'
    },
    {
        title: '剩余数量',
        dataIndex: 'remainNumber'
    },
    {
        title: '规格',
        dataIndex: 'format'
    },
    {
        title: '使用者',
        dataIndex: 'user',
        render : (text,record) =>{
            console.log(text);
            let tt = text.length ? text.join() : '—';
            return tt;
        }
    },
    {
        title: '新增人',
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
/*    {
        title: '当前使用状态',
        dataIndex: 'useState'
    },*/
    {
        title: '描述',
        dataIndex: 'description'
    }
];
const fixedAuth = ['addSupplyEquip','assignSupplyEquip','refreshSupplyEquip',
    'withdrawSupplyEquip'
];
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
        if(titles[titles.length-1]['dataIndex']!=='action'){
            titles.push({
                title: '操作',
                dataIndex: 'action',
                render: (text,record)=>{
                    let pathAssign = {
                        pathname:'/auth/main/assignEquip',state:record
                    };
                    let pathWithdraw = {
                        pathname:'/auth/main/withdrawEquip',state:record
                    };
                    if(record.useState==='idle' && this.authority['assignSupplyEquip']){
                        record['relatedType'] = 'part';
                        return <Link to={pathAssign}>分配</Link>;
                    }else if(record.useState==='using' && this.authority['withdrawSupplyEquip']){
                        record['relatedType'] = 'part';
                        return <Link to={pathWithdraw}>收回</Link>;
                    }else if(record.useState==='partusing'){
                        record['relatedType'] = 'part';
                        return <span>
                            {this.authority['assignSupplyEquip'] ? <Link to={pathAssign}>分配</Link>:''}
                            {this.authority['assignSupplyEquip'] ? <i className="list_action_gap">|</i>:''}
                            {this.authority['withdrawSupplyEquip'] ? <Link to={pathWithdraw}>收回</Link>:''}
                            </span>;
                    }
                }
            });
        }
        this.state = {
            titles: titles,
            tableData: [],
            selectedRowKeys: [],
            loadingStatus: false
        }
    }
    componentDidMount () {
        this.getTableData();
    }
    getTableData () {
        this.setState({
            loadingStatus: true
        });
        axios.get('/am/equip/supplyEquip',{
            params: {
                type: 'all'
            }
        })
            .then((data) => {
            this.setState({
                tableData: data.data
            });
            this.setState({
                loadingStatus: false
            });
        })
            .catch(err => {
                this.setState({
                    loadingStatus: false
                });
            })
    }
    //刷新列表
    refreshTable = () => {
        this.getTableData();
        this.setState({
            selectedRowKeys: [],
            selectData: []
        })
    };
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addSupplyEquip']) {
                arr.push(<Button key={'addSupplyEquip'} className="assign_add" onClick={ () => {this.props.history.push('/auth/main/addSupply')}}>添加</Button>)
            }

        }
        arr.push(<Button key='refreshSupplyEquip' className="refresh_equip" onClick={this.refreshTable}>刷新</Button>);
        console.log(arr);
        return arr;
    }
    onTreeChange = (titles) => {
        this.setState({
            titles : titles
        })
    };
    render () {
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys, rows) => {
                console.log('select');
                console.log(rowKeys, rows);
                this.setState({
                    selectedRowKeys: rowKeys,
                    selectData: rows
                })
            }
        };
        return (
            <div className="supply_render list">
                <div className="button_area list_operations">
                    {this.generateButton()}
                    <TitleOption data={this.state.titles} onChange={this.onTreeChange}/>
                </div>
                <div className="table_area">
                    <Table rowSelection={rowSelection} loading={this.state.loadingStatus} columns={this.state.titles} dataSource={this.state.tableData} />
                </div>
            </div>
        )
    }
}

export default connect(mapState)(SupplyEquip)