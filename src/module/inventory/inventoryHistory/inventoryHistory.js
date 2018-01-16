import React, { Component } from 'react'
import {Table, Button} from 'antd'


import TitleOption from '../../../common/titleOption'
import './style.styl'

const titles = [
    {
        title: '操作类型',
        dataIndex: 'inventoryType'
    },
    {
        title: '设备类型',
        dataIndex: 'type'
    },
    {
        title: '数量',
        dataIndex: 'number'
    },
    {
        title: '源对象',
        dataIndex: 'sourceTarget'
    },
    {
        title: '目标对象',
        dataIndex: 'targetObject'
    },
    {
        title: '发生时间',
        dataIndex: 'createTime'
    },
    {
        title: '操作人',
        dataIndex: 'operateUser'
    },
    {
        title: '描述',
        dataIndex: 'description'
    }
];

class InventoryHistory extends Component {
    constructor (props) {
        super(props);
        this.state= {
            titles: titles,
            tableData: [],
            loading: false
        }
    }
    getData () {}
    refreshTable = () => {
        this.getData();
    };
    onTreeChange = (titles) => {
        this.setState({
            titles : titles
        })
    };
    render () {
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    <Button className={'refresh_inventoryHistory'} onClick={this.refreshTable}>刷新</Button>
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <div className={'table_content'}>
                    <Table columns={this.state.titles} dataSource={this.state.tableData} loading={this.state.loading}/>
                </div>
            </div>
        )
    }
}

export default InventoryHistory