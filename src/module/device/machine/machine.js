import React,{ Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'

const titles = [
    {
        title: 'S/N号',
        dataIndex: 'serialNo',
        render : (text,record) =>{
            return <Link to={"auth/main/deviceMachine"+record.id}>{text}</Link>
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
        dataIndex: 'fixedNumber'
    },
    {
    	title: '类型',
    	dataIndex: 'typeText'
    },
    {
        title: 'IP',
        dataIndex: 'ip'
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
        dataIndex: 'account'
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

class DeviceMachine extends Component {
	constructor (props) {
        super(props);
        this.state = {
            machineData : []
        }
        this.getMachineData();
    }
    getMachineData(){
	    axios.get('/am/machine?operate=deviceMachine')
        .then((res)=>{
            if(res.data){
                console.log(res.data);
                console.log(typeof res.data);
                this.setState({
                    machineData : res.data
                })
            }
        })
        .catch((err)=>{
            console.log(err);
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
                </div>
                <Table rowSelection={rowSelection} columns={titles} dataSource={this.state.machineData}/>
            </div>
        )
    }
}

export default DeviceMachine