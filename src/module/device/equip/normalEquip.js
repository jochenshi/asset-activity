import React, {Component} from 'react';
import {Button, Table} from 'antd'


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
        title: '类型',
        dataIndex: 'type'
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
        title: '大小',
        dataIndex: 'size'
    },
    {
        title: '当前使用状态',
        dataIndex: 'useState'
    },
    {
        title: '新增人',
        dataIndex: 'creator'
    },
    {
        title: '新增时间',
        dataIndex: 'createTime'
    },
    {
        title: '描述',
        dataIndex: 'description'
    }
];
const data = [];

class NormalEquip extends Component {
    render () {
        return (
            <div>
                <div className="button_area">
                    <Button className="assign_add">添加</Button>
                    <Button className="assign_equip">分配</Button>
                    <Button className="return_equip">归还</Button>
                    <Button className="apply_equip">申请</Button>
                </div>
                <div className="table_area">
                    <Table columns={titles} dataSource={data}></Table>
                </div>
            </div>
        )
    }
}

export default NormalEquip