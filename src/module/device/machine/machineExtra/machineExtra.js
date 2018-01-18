import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Table, Button, Input, Popconfirm, Divider} from 'antd'

import {dateFormat, getAuthority} from '../../../../common/methods'
import AddExtraModal from './addMachineExtra'

//生成可编辑的输入框的方法
const EditableCell = ({editable, value, onChange}) => {
    return (
        <div>
            {editable ?
                <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/> : value}
        </div>
    )
};



const testData = [
    {
        id: 1,
        key: 1,
        title: '网口',
        content: 'test1',
        createUser: 'user1'
    },
    {
        id: 2,
        key: 2,
        title: '网口',
        content: 'test1',
        createUser: 'user2'
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
        this.titles = [
            {
                title: '标签',
                dataIndex: 'title',
                render: (text, record) => {
                    return this.renderColumns(text, record, 'title')
                }
            },
            {
                title: '内容',
                dataIndex: 'content',
                render: (text, record) => {
                    return this.renderColumns(text, record, 'content')
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
        this.authority = getAuthority(this.props.authority, fixedAuth, this.props.passAuth);
        if (this.authority['modifyMachineExtra'] && this.titles[this.titles.length -1]['dataIndex'] !== 'action') {
            this.titles.push({
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => {
                    const {editable} = record;
                    return (
                        <div className={'editable_actions'}>
                            {
                                editable ?
                                    <span>
                                        <a onClick={() => {this.save(record.id)}}>保存</a>
                                        <Divider type={'vertical'}/>
                                        <Popconfirm
                                            title={'确定不保存修改吗？'}
                                            cancelText={'取消'}
                                            okText={'确认'}
                                            onConfirm={() => {this.cancel(record.id)}}>
                                            <a>取消</a>
                                        </Popconfirm>
                                    </span>
                                    : <a onClick={() => this.edit(record.id)}>修改</a>
                            }
                        </div>
                    )
                }
            })
        }
        this.state = {
            loading: false,
            tableData: [],
            cacheData: [],
            addExtraVisible: false,
            titles: this.titles
        };
        this.cacheData = testData.map(item => ({...item}))
    }
    componentDidMount () {
        this.refreshTable();
    }
    //生成表格上方的按钮的函数
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addMachineExtra']) {
                arr.push(<Button key={'addMachineExtra'} className="extra_add" onClick={this.handleExtraAdd}>添加</Button>)
            }
            /*if (authority['modifyMachineExtra']) {
                arr.push(<Button key={'modifyMachineExtra'} className="extra_modify" onClick={this.handleExtraModify}>修改</Button>)
            }*/
            /*if (authority['deleteMachineExtra']) {
                arr.push(<Button key={'deleteMachineExtra'} className="extra_delete" onClick={this.handleExtraDelete}>删除</Button>)
            }*/
        }
        arr.push(<Button key='refreshSupplyEquip' className="refresh_equip" onClick={this.refreshTable}>刷新</Button>);
        console.log(arr);
        return arr;
    }
    refreshTable = () => {
        this.setState({
            loading: true
        });
        axios.get('/am/extra')
            .then((msg) => {
                this.setState({
                    tableData: msg.data,
                    cacheData: msg.data.map(item => ({...item})),
                    loading: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    };
    handleExtraAdd = () => {
        this.setState({
            addExtraVisible: true
        })
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
                values['targetId'] = this.props.targetId;
                values['type'] = this.props.type;
                axios.post('/am/extra', values)
                    .then(msg => {
                        console.log('add extra', msg);
                        this.setState({
                            addExtraVisible: false
                        });
                        this.refreshTable();
                    })
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
                onChange={value => this.handleChange(value, record.id, column)}
            />
        )
    }
    handleChange (value, id, column) {
        const newData = [...this.state.tableData];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            this.setState({
                tableData: newData
            })
        }
    }
    edit (id) {
        const newData = [...this.state.tableData];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target.editable = true;
            this.setState({
                tableData: newData
            })
        }
    }
    save (id) {
        const newData = [...this.state.tableData];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            axios.put('/am/extra/' + id, {
                title: target.title,
                content: target.content
            })
                .then(msg => {
                    delete target.editable;
                    this.setState({
                        tableData: newData,
                        cacheData: newData.map(item => ({...item}))
                    })
                })
                .catch(err => {
                    Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
                    console.log(newData);
                    delete target.editable;
                    this.setState({
                        tableData: newData
                    })
                })
        }
    }
    cancel (id) {
        const newData = [...this.state.tableData];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            Object.assign(target, this.state.cacheData.filter(item => id === item.id)[0]);
            console.log(newData);
            delete target.editable;
            this.setState({
                tableData: newData
            })
        }
    }
    render () {
        return (
            <div className={'list'}>
                <div className={'list_operations'}>
                    {this.generateButton()}
                </div>
                <div className={'table_content'}>
                    <Table columns={this.state.titles} dataSource={this.state.tableData} loading={this.state.loading}/>
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