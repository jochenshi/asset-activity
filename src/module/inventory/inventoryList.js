import React, { Component } from 'react'
import { Table } from 'antd'

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
        title: 'S/N号',
        dataIndex: 'serialNo'
    },
    {
        title: '研发部编号',
        dataIndex: 'rdNumber'
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '大小',
        key: 'size'
    },
    {
        title: '可用数量',
        dataIndex: 'availableNum'
    },
    {
        title: '总数',
        dataIndex: 'totalNum'
    }
];

class InventoryList extends Component {
    constructor (props) {
        super(props);
    }
    onSelectChange () {}
    render () {
        const rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div>
                <Table columns={titles} dataSource={testData} rowSelection={rowSelection}/>
            </div>
        )
    }
}

export default InventoryList