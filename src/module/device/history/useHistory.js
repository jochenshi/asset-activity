import React,{ Component } from 'react'
import {Table, Button} from 'antd'

import TitleOption from '../../../common/titleOption'


const titles = [
    {
        title: '设备类型',
        dataIndex: 'type'
    },
    {
        title: '领用用途',
        dataIndex: 'purpose'
    },
    {
        title: '归属项目',
        dataIndex: 'project'
    },
    {
        title: '领用人',
        dataIndex: 'lendUser'
    },
    {
        title: '领用数量',
        dataIndex: 'number'
    },
    {
        title: '领用时间',
        dataIndex: 'lendTime'
    },
    {
        title: '领用备注',
        dataIndex: 'lendDescription'
    },
    {
        title: '归还时间',
        dataIndex: 'returnTime'
    },
    {
        title: '归还数量',
        dataIndex: 'returnNumber'
    },
    {
        title: '归还备注',
        dataIndex: 'returnDescription'
    }
];

class UseHistory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tableData: [],
            titles: titles,
            loading: false
        }
    }
    getData (){}
    refreshTable = () => {
        this.getData()
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
                    <Button className={'refresh_history'} onClick={this.refreshTable}>刷新</Button>
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <div className={'table_content'}>
                    <Table columns={this.state.titles} dataSource={this.state.tableData} loading={this.state.loading} />
                </div>
            </div>
        )
    }
}

export default UseHistory