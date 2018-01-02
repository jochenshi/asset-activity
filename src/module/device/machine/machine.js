import React,{ Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TitleOption from '../../../common/titleOption'

const defaultData = [
    {
        id: 1,
        serialNo : 'aaaaaa',
        name : 'aaaaaa',
        rdNumber : 'aaaaaa',
        fixedNumber : 'aaaaaa',
        typeText : 'aaaaaa',
        ip : 'aaaaaa',
        model : 'aaaaaa',
        brand : 'aaaaaa',
        cpu : 'aaaaaa',
        useStateText : 'aaaaaa',
        healthState : 'aaaaaa',
    }
]

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
];

const auth = [
    'deviceMachine',
    'addMachine'
]

class DeviceMachine extends Component {
	constructor (props) {
        super(props);
        this.state = {
            machineData : defaultData,
            titles : titles
        }
        this.getMachineData();
    }
    getMachineData(){
	    axios.get('/am/machine?operate=deviceMachine')
        .then((res)=>{
            if(res.data){
                this.setState({
                    machineData : res.data
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    onTreeChange = (titles)=>{
        this.setState({
            titles : titles
        })
    }
    onSelectChange () {}
    render () {
        const rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div className="list">
                <div className="list_operations">
                    <Button><Link to="/auth/main/addMachine">添加</Link></Button>
                    <Button>刷新</Button>
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.machineData}/>
            </div>
        )
    }
}

export default DeviceMachine