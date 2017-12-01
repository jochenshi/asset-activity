import React,{ Component } from 'react'

const testData = [
    {
        type: '服务器1',
        serialNo: '111111111',
        rdNumber: 'RD201701',
        model: 'xxxmodel',
        sizee: '',
        availableNum: 1,
        totalNum: 1
    },
    {
        type: '服务器2',
        serialNo: '111111111',
        rdNumber: 'RD201701',
        model: 'xxxmodel',
        sizee: '',
        availableNum: 1,
        totalNum: 1
    },
    {
        type: '服务器3',
        serialNo: '111111111',
        rdNumber: 'RD201701',
        model: 'xxxmodel',
        sizee: '',
        availableNum: 1,
        totalNum: 1
    }
];

const titles = [
    {
        title: '设备类型',
        dataIndex: 'type'
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '可用数量',
        dataIndex: 'availableNum'
    },
    {
        title: '库存数量',
        dataIndex: 'totalNum'
    },
    {
        title: '故障数',
        dataIndex: 'faultNum'
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
            <div className="inventory_list">
                <div className="table_operations">
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