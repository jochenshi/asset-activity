import React, {Component} from 'react'
import {withRouter} from 'react-router'

import axios from "axios";
import {Form, Input, Select, Button, DatePicker} from "antd";
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import './addNormal.styl'

//添加普通配件的表单区域
class FormArea extends Component {
    constructor (props) {
        super(props);
        let unit;
        if (props.data && props.data.unit) {
            unit = props.data.unit
        }
        this.state = {
            unit: unit || 'GB',
            brand: [],
            type: [],
            model: [],
            origin: [],
            data: props.data || {}
        };
        console.log('addnormal constructor', props);
        let pathState = this.props.location.state;
        if (pathState.type) {
            this.equipType = pathState.type === 'all' ? 'disk' : pathState.type;
        } else {
            this.equipType = 'disk';
        }
    }
    componentDidMount () {
        this.getSelectOption();
    }
    //获取添加普通的配件时需要提供的相关选项的备选项
    getSelectOption () {
        axios.get('/am/select/normalEquip')
            .then((val) => {
                let new_state = {};
                if (val.data) {
                    for (let i in val.data) {
                        val.data[i].length && (new_state[i] = this.transformOption(val.data[i]));
                    }
                    this.setState(new_state)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    generateOption (type) {
        let option = [];
        if (this.state[type] && this.state[type].length) {
            this.state[type].forEach((val) => {
                option.push(<Option value={val.value} key={val.value}>{val.text}</Option>)
            })
        }
        return option;
    }
    transformOption (data) {
        let option = [];
        data.forEach((val) => {
            option.push({text: val.text, value: val.value})
        });
        return option;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let subData = Object.assign({}, values, {unit: this.state.unit});
                console.log(subData);
                if (this.props.mode === 'modify') {
                    subData['ascriptionId'] = this.state.data.ascriptionId;
                    axios.put('/am/equip/normalEquip/' + this.state.data.id + '?operate=modifyEquip', subData).
                        then((msg) => {
                            console.log(msg)
                    })
                } else {
                    //此处判断出来为添加配件的请求，并传入机器的ID，由后台判断该ID是否存在以及是否建立关系
                    let pathState = this.props.location.state;
                    subData.machineId = pathState.machineId;
                    axios.post('/am/equip/normalEquip?operate=addEquip',subData)
                        .then((msg) => {
                            this.props.history.go(-1);
                            //this.props.history.push('/auth/main/deviceEquip/normalEquip');
                        })
                        .catch()
                }

            }
        })
    };
    render () {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 2}
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16}
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 2
                }
            }
        };
        const {getFieldDecorator} = this.props.form;
        const selectUnit = (
            <Select defaultValue={this.state.unit} onChange={(val) => {this.setState({unit: val})}}>
                <Option value='GB'>GB</Option>
                <Option value='TB'>TB</Option>
            </Select>
        );
        console.log('rerender');
        return (
            <Form className='add_normal_form' onSubmit={this.handleSubmit}>
                <h1 className="form-field-title">来源信息</h1>
                <FormItem {...formItemLayout} label={'来源类型'}>
                    {getFieldDecorator('origin',{
                        rules: [
                            {required: true, message: '来源类型不能为空'}
                        ],
                        initialValue: this.state.data['outInType'] || 'buyin'
                    })(
                        <Select>
                            {this.generateOption('origin')}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'时间'}>
                    {getFieldDecorator('time', {
                        rules: [
                            {required: true, message: '请选择时间'}
                        ],
                        initialValue: this.state.data['occurTime'] ? moment(new Date(this.state.data['occurTime']),'yyyy/MM/dd') : moment(new Date(), 'yyyy/MM/dd')
                    })(<DatePicker/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'源对象'}>
                    {getFieldDecorator('originObject',{
                        initialValue: this.state.data['originObject'] || ''
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'目标对象'}>
                    {getFieldDecorator('targetObject',{
                        initialValue: this.state.data['targetObject'] || ''
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='来源描述'>
                    {getFieldDecorator('originDes', {
                        initialValue: this.state.data['ascDesc'] || ''
                    })(<TextArea/>)}
                </FormItem>
                <h1 className="form-field-title">配件信息</h1>
                <FormItem {...formItemLayout} label='S/N号'>
                    {getFieldDecorator('serialNo',{
                        rules: [
                            {required: true, message: 'S/N号不能为空'}
                        ],
                        initialValue: this.state.data['serialNo'] || ''
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label='名称'>
                    {getFieldDecorator('name',{
                        rules: [
                            {required: true, message: '名称不能为空'}
                        ],
                        initialValue: this.state.data['name'] || ''
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label='类型'>
                    {getFieldDecorator('type',{
                        rules: [
                            {required: true, message: '类型不能为空'}
                        ],
                        initialValue: this.state.data['type'] || this.equipType
                    })(
                        <Select>
                            {this.generateOption('type')}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='型号'>
                    {getFieldDecorator('model',{
                        rules: [
                            {required: true, message: '型号不能为空'}
                        ],
                        initialValue: this.state.data['model'] || ''
                    })(
                        <Select mode='combobox'>
                            {this.generateOption('model')}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='品牌'>
                    {getFieldDecorator('brand',{
                        rules: [
                            {required: true, message: '品牌不能为空'}
                        ],
                        initialValue: this.state.data['brand'] || ''
                    })(
                        <Select mode='combobox'>
                            {this.generateOption('brand')}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='大小'>
                    {getFieldDecorator('size',{
                        rules: [
                            {pattern: /^[1-9]\d*$/, message: '请输入正整数'}
                        ],
                        initialValue: this.state.data['size'] || ''
                    })(
                        <Input style={{width: 200}} addonAfter={selectUnit}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='描述'>
                    {getFieldDecorator('description',{
                        initialValue: this.state.data['description'] || ''
                    })(<TextArea/>)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>确认</Button>
                    <Button style={{marginLeft: 8}} onClick={() => {this.props.history.go(-1)}}>取消</Button>
                </FormItem>
            </Form>
        )
    }
}

const NormalForm = Form.create()(FormArea);

export default withRouter(NormalForm)