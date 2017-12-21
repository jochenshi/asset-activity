import React, { Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TitleOption from '../../../common/titleOption'

const titles = [
    {
        title: 'S/N号',
        dataIndex: 'serialNo',
        render : (text,record) =>{
            return <Link to={"/auth/main/deviceMachine/"+record.id}>{text}</Link>
        }
    },
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '研发部编号',
        dataIndex: 'rdNumber'
    },
    {
        title: '固定资产编号',
        dataIndex: 'fixedNumber',
        display: false
    },
    {
        title: '类型',
        dataIndex: 'typeText'
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        display: false
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '品牌',
        dataIndex: 'brand',
    },
    {
        title: 'CPU',
        dataIndex: 'cpu'
    },
    {
        title: '使用状态',
        dataIndex: 'useStateText'
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
        title: '描述',
        dataIndex: 'description'
    }
]

class HealthRecord extends Component {
    render () {
        return (
            <div>
                <h1>This is Health record page</h1>
            </div>
        )
    }
}

export default HealthRecord
