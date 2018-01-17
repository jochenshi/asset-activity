import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Table, Button, Input} from 'antd'

import {dateFormat, getAuthority} from '../../../../common/methods'
import AddExtraModal from './addMachineExtra'

//生成可编辑的输入框的方法
const EditableCell = ({editable, value, onChange}) => {
    return (
        <div>
            {editable ?
                <Input style={{margin: '-5px 0'}} value={value}/> : value}
        </div>
    )
};

const titles = [
    {
        title: '标签',
        dataIndex: 'title',
        render: (text, record) => {
            this.renderColumns(text, record, 'title')
        }
    },
    {
        title: '内容',
        dataIndex: 'content',
        render: (text, record) => {
            this.renderColumns(text, record, 'content')
        }
    },
    {
        title: '新增人',
        dataIndex: 'createUser'
    },
    {
        title: '新增时间',
        dataIndex: 'createTime'
    }
];

const fixedAuth = ['addMachineExtra', 'modifyMachineExtra', 'deleteMachineExtra'];


const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};
class MachineExtra extends Component {
    constructor (props) {
        super(props);
        this.authority = getAuthority(this.props.authority, fixedAuth, this.props.passAuth);
        this.state = {
            loading: false,
            tableData: [],
            addExtraVisible: false,
            titles: titles
        }
    }
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addMachineExtra']) {
                arr.push(<Button key={'addMachineExtra'} className="extra_add" onClick={this.handleExtraAdd}>添加</Button>)
            }
            if (authority['modifyMachineExtra']) {
                arr.push(<Button key={'modifyMachineExtra'} className="extra_modify" onClick={this.handleExtraModify}>修改</Button>)
            }
            if (authority['deleteMachineExtra']) {
                arr.push(<Button key={'deleteMachineExtra'} className="extra_delete" onClick={this.handleExtraDelete}>删除</Button>)
            }
        }
        arr.push(<Button key='refreshSupplyEquip' className="refresh_equip" onClick={this.refreshTable}>刷新</Button>);
        console.log(arr);
        return arr;
    }
    refreshTable = () => {

    };
    handleExtraAdd = () => {
        this.setState({
            addExtraVisible: true
        })
    };
    handleExtraModify = () => {
        alert('modify')
    };
    handleExtraDelete = () => {
        alert('delete')
    };
    //处理创建的针对弹框的相关的方法
    addExtraForm = (form) => {
        this.ExtraAddForm = form
    };
    handleAddConfirm = () => {
        this.ExtraAddForm.validateFields((err, values) => {
            if (!err) {
                console.log('received values', values);
            }
        })
    };
    handleAddCancel = () => {
        this.setState({
            addExtraVisible: false
        });
        console.log('aa');
        this.ExtraAddForm.resetFields();
    };
    //处理修改列表信息的方法
    renderColumns (text, record, column) {
        return (
            <EditableCell
                editable={!!record.editable}
                value={text}
            />
        )
    }
    render () {
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    {this.generateButton()}
                </div>
                <div className={'table_content'}>
                    <Table columns={titles} dataSource={this.state.tableData} loading={this.state.loading}/>
                </div>
                <AddExtraModal
                    ref={this.addExtraForm}
                    visible={this.state.addExtraVisible}
                    onConfirm={this.handleAddConfirm}
                    onCancel={this.handleAddCancel}
                />
            </div>
        )
    }
}

export default connect(mapState)(MachineExtra)