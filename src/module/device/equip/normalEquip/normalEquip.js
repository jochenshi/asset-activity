import React, {Component} from 'react';
import {Button, Table} from 'antd';

import axios from 'axios';

import './normalEquip.styl'


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
        dataIndex: 'equipType'
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '品牌',
        dataIndex: 'brand'
    },
    // {
    //     title: '大小',
    //     dataIndex: 'size'
    // },
    {
        title: '当前使用状态',
        dataIndex: 'equipUseState'
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


//可接收的prop
//machineId = ''表示获取该机器下的配件,type = ''获取的配件的类型,operations = []用户需要的操作
class NormalEquip extends Component {
    constructor (props) {
        super(props);
        this.state = {
            titles: titles,
            tableData: []
        };
    }
    componentDidMount () {
        this.getTableData();
    }
    //根据传入的prop里面的
    getTableData () {
        let dataType = this.props.type,
            machineId = this.props.machineId,
            urlType = 'all',
            tArray = ['memory','disk','netcard'];
        console.log('equip component', dataType);
        //根据从prop传进来的dataType来决定获取数据的类型是什么
        if (tArray.indexOf(dataType) > -1) {
            urlType = dataType
        } else {
            urlType = 'all'
        }
        //根据传进来的machineId来判断是获取某个机器下的配件信息还是获取全部的配件信息
        axios.get('/am/equip/normalEquip', {
            params: {
                type: urlType,
                machineId: machineId
            }
        }).then((data) => {
            data.data.length && this.setState({
                tableData: data.data
            })
        }).catch((err) => {

        })
    }
    render () {
        const rowSelection = {
            onChange: (rowKeys, rows) => {
                console.log('select');
                console.log(rowKeys, rows)
            }
        };
        return (
            <div className="normal_render">
                <div className="button_area">
                    <Button className="assign_add" onClick={ () => {this.props.history.replace('/auth/main/addNormal')}}>添加</Button>
                    <Button className="assign_equip">分配</Button>
                    <Button className="return_equip">归还</Button>
                    {/*<Button className="apply_equip">申请</Button>*/}
                </div>
                <div className="table_area">
                    <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.tableData} />
                </div>
            </div>
        )
    }
}

export default NormalEquip