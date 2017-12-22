import React, {Component} from 'react';
import {Button, Table} from 'antd';

import axios from 'axios';


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
            titles: titles,
            tableData: []
        };
    }
    componentDidMount () {
        //this.getTableData();
    }
    getTableData () {
        let  dataType = this.props.type, urlType = 'all',tArray = ['cpu','disk','netcard'];
        console.log('equip component', dataType);
        if (tArray.indexOf(urlType) > -1) {
            urlType = dataType
        }
        axios.get('/am/equip/normalEquip', {
            params: {
                type: urlType
            }
        }).then((data) => {
            data.data.length && this.setState({
                tableData: data.data
            })
        }).catch((err) => {

        })
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