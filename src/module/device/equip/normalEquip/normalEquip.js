import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link, withRouter}  from 'react-router-dom'
import PropTypes from 'prop-types';

import {Button, Table, Modal} from 'antd';
import axios from 'axios';

import './normalEquip.styl'

import {getAuthority} from '../../../../common/methods'
import TitleOption from '../../../../common/titleOption'
import LinkModal from './linkOperation/linkNormal'

const titles = [
    {
        title: 'S/N号',
        dataIndex: 'serialNo',
        render: (text, record) => {
            let path = {
                pathname: '/auth/main/deviceEquip/normalEquip/' + record.id,
                state: record
            };
            return <Link to={path}>{text}</Link>
        }
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
const fixedAuth = [
    'addNormalEquip',
    'refreshNormalEquip',
    'assignNormalEquip',
    'linkNormalEquip',
    'unLinkNormalEquip',
    'linkManyNormal'
];

const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin,
        authority: state.authArray.authority
    }
};

//可接收的prop,props下有machineId即表示是位于机器详情下的页面
//machineId = ''表示获取该机器下的配件,type = ''获取的配件的类型,operations = []用户需要的操作,page表示用户当前位于的页面
class NormalEquip extends Component {
    constructor (props) {
        super(props);
        this.state = {
            titles: titles,
            tableData: [],
            linkDisable: true,
            selectData: [],
            linkModalVisible: false,
            modalMachine: [],
            selectFittingId: [],
            page: this.props.page || 'normalList'
            //authority: {}
        };
        this.authority = this.generateAuthority();
        console.log('normal', props);
        let dataType = this.props.type,
            tArray = ['memory','disk','netcard'];
        this.machineId = this.props.machineId;
        console.log('equip component', dataType);
        //根据从prop传进来的dataType来决定获取数据的类型是什么
        if (tArray.indexOf(dataType) > -1) {
            this.urlType = dataType
        } else {
            this.urlType = 'all'
        }
    }
    componentDidMount () {
        this.getTableData();
    }
    generateAuthority () {
        let resAuth = getAuthority(this.props.authority, fixedAuth, this.props.passAuth);
        return resAuth
    }
    //根据传入的prop里面的
    getTableData () {
        //根据传进来的machineId来判断是获取某个机器下的配件信息还是获取全部的配件信息
        axios.get('/am/equip/normalEquip', {
            params: {
                type: this.urlType,
                machineId: this.machineId
            }
        }).then((data) => {
            data.data.length && this.setState({
                tableData: data.data
            })
        }).catch((err) => {

        })
    }
    generateButton () {
        let arr = [];
        let authority = this.authority;
        if (Object.getOwnPropertyNames(authority).length) {
            console.log(authority);
            if (authority['addNormalEquip']) {
                let path = {
                    pathname: '/auth/main/addNormal',
                    state: {
                        machineId: this.machineId,
                        type: this.urlType
                    }
                };
                arr.push(<Button key={'addNormalEquip'} className="add_normal" onClick={ () => {this.props.history.push(path)}}>添加</Button>)
            }
            if (authority['linkNormalEquip'] && (this.state.page === 'normalList')) {
                arr.push(<Button key='linkNormalEquip' disabled={this.state.linkDisable} onClick={this.linkNormalEquip} className="link_equip">关联</Button>)
            }
            if (authority['linkManyNormal'] && (this.state.page === 'detailNormal')) {
                arr.push(<Button key='linkManyNormal' onClick={this.linkManyNormal} className="link_many">批量关联</Button>)
            }
        }
        arr.push(<Button key='refreshNormalEquip' className="refresh_equip" onClick={() => {this.getTableData()}}>刷新</Button>);
        console.log(arr);
        return arr;
    }
    linkNormalEquip = () => {
        console.log('link normal equip');
        let selects = this.state.selectData,valid = 0,temp = [];
        selects.length && selects.forEach((val) => {
            val.useState === 'idle' && valid ++;
            temp.push(val.id);
        });
        if (valid !== selects.length) {
            Modal.warning({
                title: '提示',
                content: '只能关联状态为库存中的配件'
            })
        } else {
            this.setState({
                linkModalVisible: true,
                selectFittingId: temp
            });
            this.getMachine();
        }
    };
    linkManyNormal = () => {};
    //设置列表展示哪些条目
    onTreeChange = (titles) => {
        this.setState({
            titles : titles
        })
    };
    //展示列表关联配件的弹框的取消
    handleModalCancel = () => {
        this.setState({
            linkModalVisible: false,
            modalMachine: []
        });
        this.form.resetFields();
    };
    //展示列表关联配件的弹框的确定
    handleModalConfirm = () => {
        const form = this.form;
        console.log(form);
        form.validateFields((err, values) => {
            if (!err) {
                //表单的数据验证成功,即发送相关的关联的请求的操作
                let {machine, description} = values;
                let subData = Object.assign({}, {fittingId: this.state.selectFittingId, machineId: machine, description});
                console.log(values);
                axios.post('/am/relate/add', subData).then((val) => {
                    console.log(val)
                })
            } else {
                return
            }
        })
    };
    saveFormRef = (form) => {
        this.form = form
    };
    getMachine () {
        axios.get('/am/machine?operate=deviceMachine')
            .then((val) => {
                console.log(val);
                let machines = [];
                val.data.length && val.data.forEach((vaule) => {
                    machines.push({text: vaule.name, value: vaule.id})
                });
                setTimeout(() => {
                    this.state.linkModalVisible && this.setState({
                        modalMachine: machines
                    })
                }, 3000)
            })
    }
    render () {
        const rowSelection = {
            onChange: (rowKeys, rows) => {
                console.log('select');
                console.log(rowKeys, rows);
                let flag,selected;
                if (rows.length) {
                    flag = false;
                    selected = rows;
                } else {
                    flag = true;
                    selected = []
                }
                this.setState({
                    linkDisable: flag,
                    selectData: selected
                })
            }
        };
        return (
            <div className="normal_render list">
                <div className="button_area list_operations">
                    {this.generateButton()}
                    {/*<Button className="assign_equip">分配</Button>*/}
                    {/*<Button className="return_equip">归还</Button>*/}
                    {/*<Button className="apply_equip">申请</Button>*/}
                    <TitleOption data={this.state.titles} onChange={this.onTreeChange}/>
                </div>
                <div className="table_area">
                    <Table rowSelection={rowSelection} columns={this.state.titles} dataSource={this.state.tableData} />
                </div>
                <LinkModal
                    ref={this.saveFormRef}
                    visible={this.state.linkModalVisible}
                    onCancel={this.handleModalCancel}
                    onConfirm={this.handleModalConfirm}
                    machineData={this.state.modalMachine}
                />
            </div>
        )
    }
}

/*NormalEquip.contextTypes = {
    router: PropTypes.object
};*/

export default connect(mapState)(withRouter(NormalEquip))