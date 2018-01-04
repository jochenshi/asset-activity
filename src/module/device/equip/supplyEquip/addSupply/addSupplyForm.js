import React,{Component} from 'react';
import {withRouter} from 'react-router'

import axios from "axios";
import {Form, Input, Select, Button, DatePicker} from "antd";
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

import './addSupply.styl'

class SupplyForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            type: [],
            model: [],
            brand: [],
            origin: [],
            data: props.data || {}
        }
    }
    componentDidMount () {
        this.getSelectOption();
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
    //获取添加耗材类配件时需要提供的相关的备选项
    getSelectOption () {
        axios.get('/am/select/supplyEquip')
            .then((val) => {
                let new_state = {};
                if (val.data) {
                    for (let i in val.data) {
                        val.data[i].length && (new_state[i] = this.transformOption(val.data[i]));
                    }
                    this.setState(new_state)
                }
            })
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
                let subData = Object.assign({}, values);
                //表单验证通过
                if (this.props.mode === 'modify') {
                    console.log('modify')
                } else {
                    axios.post('/am/equip/supplyEquip?operate=addEquip',subData)
                        .then((msg) => {
                            this.props.history.go(-1);
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
        return (
            <Form className={'add_supply_form'} onSubmit={this.handleSubmit}>
                <h1 className={'form-field-title'}>来源信息</h1>
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
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'目标对象'}>
                    {getFieldDecorator('targetObject',{
                        initialValue: this.state.data['targetObject'] || ''
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'来源描述'}>
                    {getFieldDecorator('ascDes',{
                        initialValue: this.state.data['ascDesc'] || ''
                    })(
                        <TextArea/>
                    )}
                </FormItem>
                <h1 className={'form-field-title'}>配件信息</h1>
                <FormItem {...formItemLayout} label={'名称'}>
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
                        initialValue: this.state.data['type'] || 'cable'
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
                <FormItem {...formItemLayout} label='数量'>
                    {getFieldDecorator('number',{
                        rules: [
                            {required: true, message: '数量不能为空'},
                            {pattern: /^[1-9]\d*$/, message: '请输入正整数'}
                        ],
                        initialValue: this.state.data['size'] || 1
                    })(
                        <Input style={{width: 200}}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='描述'>
                    {getFieldDecorator('description',{
                        initialValue: this.state.data['description'] || ''
                    })(<TextArea/>)}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>确认</Button>
                    <Button style={{marginLeft: 8}} onClick={() => {this.props.history.replace('/auth/main/deviceEquip/supplyEquip')}}>取消</Button>
                </FormItem>
            </Form>
        )
    }
}

let exportForm = Form.create()(SupplyForm);
export default withRouter(exportForm)