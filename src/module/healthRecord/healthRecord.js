import React, { Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TitleOption from '../../common/titleOption'

const titles = [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '类型',
        dataIndex: 'typeText'
    },
    {
        title: '健康状态',
        dataIndex: 'healthState',
        render : (text,record) =>{
            return text==='noRecord'?'无记录':text;
        }
    },
    {
        title: '添加人',
        dataIndex: 'account',
        display: false
    },
    {
        title: '添加时间',
        dataIndex: 'createdAt'
    },
    {
        title: '是否存在',
        dataIndex: 'exist'
    },
    {
        title: '描述',
        dataIndex: 'description'
    }
];

class HealthRecord extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tableData: [],
            titles: titles,
            loading: false
        }
    }
    refreshTable = () => {};
    onTreeChange = (titles) => {
        this.setState({
            titles : titles
        })
    };
    render () {
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    <Button onClick={this.refreshTable} className={'refresh_health'}>刷新</Button>
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <div className={'table_content'}>
                    <Table columns={this.state.titles} dataSource={this.state.tableData} loading={this.state.loading}/>
                </div>
            </div>
        )
    }
}

export default HealthRecord
