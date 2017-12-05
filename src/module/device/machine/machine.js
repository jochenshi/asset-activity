import React,{ Component } from 'react'
import { Table, Button } from 'antd'
import Header from '../../../common/header'

const testData = [
    {
    	serialNo: 'ABCDEFG',
        name: '服务器1',
        rdNumber: 'RD201701',
        fixedNumber: '12345',
        type: 'service',
        ip: '192.168.232.10',
        model: 'xxxmodel',
        healthState: 'healthState',
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
        title: '健康状态',
        dataIndex: 'healthState'
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
        title: '增加人',
        dataIndex: 'createUser'
    },
    {
        title: '增加时间',
        dataIndex: 'createTime'
    },
    {
        title: '描述',
        dataIndex: 'description'
    }
];

class DeviceMachine extends Component {
	constructor (props) {
        super(props);
    }
    onSelectChange () {}
    render () {
        const rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div className="list">
            	<Header title={'机器列表'} backUrl={'/auth/main/optionSet'}/>
                <div className="list_operations">
                    <Button>添加</Button>
                    {/*<AddInventory/>*/}
                    <Button>刷新</Button>
                </div>
                <Table rowSelection={rowSelection} columns={titles} dataSource={testData}/>
            </div>
        )
    }
}

export default DeviceMachine