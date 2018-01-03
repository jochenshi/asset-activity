import React, {Component} from 'react'
import {Table, Button} from 'antd'


const titles = [
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
        title: '数量',
        dataIndex: 'number'
    },
    {
        title: '剩余数量',
        dataIndex: 'remainNumber'
    },
/*    {
        title: '当前使用状态',
        dataIndex: 'useState'
    },*/
    {
        title: '描述',
        dataIndex: 'description'
    }
];
const fixedAuth = ['addSupplyEquip'];
const data =[];
class SupplyEquip extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div>
                <div className="tableArea">
                    <Table columns={titles} dataSource={data}/>
                </div>
            </div>
        )
    }
}

export default SupplyEquip