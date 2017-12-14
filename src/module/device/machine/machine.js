import React,{ Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'

const testData = [
    {
    	serialNo: 'ABCDEFG',
        name: '服务器1',
        rdNumber: 'RD201701',
        fixedNumber: '12345',
        type: 'service',
        ip: '192.168.232.10',
        model: 'xxxmodel',
        cpu: 'xxxxxxxxx',
        useState: 'using',
        createUser: 'admin',
        createTime: '2017-12-02',
        description: 'xxxxxxxxx'
    }
];

const titles = [
    {
        title: 'S/N号',
        dataIndex: 'serialNo'
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
    	dataIndex: 'type'
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
        dataIndex: 'useState'
    },
    {
        title: '健康状态',
        dataIndex: 'healthState'
    },
    {
        title: '添加人',
        dataIndex: 'createUser'
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
	    axios.get('/am/machine')
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