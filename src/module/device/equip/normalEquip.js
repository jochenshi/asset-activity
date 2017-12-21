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
    constructor (props) {
        super(props);
        this.state = {
            titles: titles
        }
    }
    render () {
        return (
            <div>
                <div className="button_area">
                    <Button className="assign_add" onClick={ () => {this.props.history.replace('/auth/main/addNormal')}}>添加</Button>
                    <Button className="assign_equip">分配</Button>
                    <Button className="return_equip">归还</Button>
                    <Button className="apply_equip">申请</Button>
                </div>
                <div className="table_area">
                    <Table columns={this.state.titles} dataSource={data} />
                </div>
            </div>
        )
    }
}

export default NormalEquip