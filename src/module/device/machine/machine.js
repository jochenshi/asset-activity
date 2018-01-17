import React,{ Component } from 'react'
import { Table, Button } from 'antd'
import {Link} from 'react-router-dom'
import axios from 'axios'
import TitleOption from '../../../common/titleOption'
import {connect} from 'react-redux'
import {dateFormat, getAuthority} from '../../../common/methods'

const defaultData = [
    /*{
        id: 1,
        serialNo : 'aaaaaa',
        name : 'aaaaaa',
        rdNumber : 'aaaaaa',
        fixedNumber : 'aaaaaa',
        typeText : 'aaaaaa',
        ip : 'aaaaaa',
        model : 'aaaaaa',
        brand : 'aaaaaa',
        cpu : 'aaaaaa',
        useStateText : 'aaaaaa',
        healthState : 'aaaaaa',
    }*/
]

const titles = [
    {
        title: '名称',
        dataIndex: 'name',
        render: (text, record) => {
            return <Link to={"/auth/main/deviceMachine/"+record.id}>{text}</Link>
        }
    },
    {
        title: 'S/N号',
        dataIndex: 'serialNo',
        render : (text,record) =>{
            return text ? text : '-'
        }
    },
    {
        title: '研发部编号',
        dataIndex: 'rdNumber'
    },
    {
        title: '固定资产编号',
        dataIndex: 'fixedNumber',
        display: false
    },
    {
    	title: '类型',
    	dataIndex: 'typeText',
        display: false
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        display: false
    },
    {
        title: '型号',
        dataIndex: 'model'
    },
    {
        title: '品牌',
        dataIndex: 'brand',
    },
    {
        title: 'CPU',
        dataIndex: 'cpu'
    },
    {
        title: '使用状态',
        dataIndex: 'useStateText'
    },
    {
        title: '使用者',
        dataIndex: 'user',
        render : (text,record) =>{
            return text || '—';
        }
    },
    {
        title: '健康状态',
        dataIndex: 'healthState',
        render : (text,record) =>{
            return text==='noRecord'?'无记录':text;
        }
    },
    {
        title: '添加人',
        dataIndex: 'userName',
        display: false
    },
    {
        title: '添加时间',
        dataIndex: 'createdAt',
        render: (text, record) => {
            let time = dateFormat('YYYY-MM-DD hh:mm', text);
            return time
        }
    },
    {
        title: '描述',
        dataIndex: 'description'
    }
];

const auth = [
    'deviceMachine',
    'addMachine',
    'assignMachine',
    'withdrawMachine'
];

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class DeviceMachine extends Component {
	constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        if(titles[titles.length-1]['dataIndex']!=='action'){
            titles.push({
                title: '操作',
                dataIndex: 'action',
                render: (text,record)=>{
                    let path = {};
                    if(record.useState==='idle' && this.auth['assignMachine']){
                        record['relatedType'] = 'machine';
                        path = {
                            pathname:'/auth/main/assign',state:record
                        }
                        return <Link to={path}>分配</Link>;
                    }else if(record.useState==='using' && this.auth['withdrawMachine']){
                        record['relatedType'] = 'machine';
                        path = {
                            pathname:'/auth/main/withdraw',state:record
                        }
                        return <Link to={path}>收回</Link>;
                    }
                }
            });
        }
        this.state = {
            machineData : defaultData,
            titles : titles
        }
        this.getMachineData();
    }
    getMachineData(){
	    axios.get('/am/machine?operate=deviceMachine')
        .then((res)=>{
            if(res.data){
                this.setState({
                    machineData : res.data
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    onTreeChange = (titles)=>{
        this.setState({
            titles : titles
        })
    }
    onSelectChange () {}
    render () {
        const rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div className="list">
                <div className="list_operations">
                    {this.auth['addMachine']?<Button><Link to="/auth/main/addMachine">添加</Link></Button>:''}
                    {this.auth['deviceMachine']?<Button onClick={this.getMachineData.bind(this)}>刷新</Button>:''}
                    <TitleOption data={titles} onChange={this.onTreeChange}/>
                </div>
                <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.machineData}/>
            </div>
        )
    }
}

export default connect(mapState)(DeviceMachine)