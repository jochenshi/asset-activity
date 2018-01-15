import React, { Component } from 'react'
import axios from 'axios'
import { Table, Button } from 'antd'
import {connect} from 'react-redux'
import {dateFormat, getAuthority} from '../../../common/methods'
import TitleOption from '../../../common/titleOption'

import './style.styl'

const testData = [
    /*{
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
    }*/
];

const titles = [
    {
        title: '设备类型',
        dataIndex: 'typeText'
    },
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: 'S/N号',
        dataIndex: 'serialNo',
        render : (text,record)=>{
            return text || '—';
        }
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
        dataIndex: 'size',
        render : (text,record)=>{
            return text || '—';
        }
    },
    {
        title: '数量',
        dataIndex: 'number',
        render : (text,record)=>{
            if(text ){
                return <span>{text+(record.unit||'')}</span>;
            }else{
                return '—';
            }
        }
    },
    {
        title: '使用状态',
        dataIndex: 'useStateText'
    },
    {
        title: '来源类型',
        dataIndex: 'outInTypeText'
    },
    {
        title: '发生时间',
        dataIndex: 'occurTime',
        render: (text, record) => {
            let time = dateFormat('YYYY-MM-DD hh:mm', text);
            return time
        }
    },
    {
        title: '描述',
        dataIndex: 'ascriptonDesc'
    }
];

/*const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }
};*/

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};
const auth = ['storeInfo']

class InventoryList extends Component {
    constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.state = {
            data : testData,
            titles : titles
        }
        this.getAscriptionData();
    }
    onSelectChange () {}
    onTreeChange = (titles)=>{
        this.setState({
            titles : titles
        })
    }
    getAscriptionData(){
        axios.get('/am/ascription?operate=storeInfo')
            .then((res)=>{
                if(res.data){
                    this.setState({
                        data : res.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    render () {
        const rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div className="list">
                <div className="list_operations">
                    <Button onClick={this.getAscriptionData.bind(this)}>刷新</Button>
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.data}/>
            </div>
        )
    }
}

export default connect(mapState)(InventoryList)