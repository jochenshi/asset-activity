import React, {Component} from 'react'
import {Form, Input, Select, Button} from 'antd'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

import './addUser.styl'

class UserForm extends Component {
    constructor (props) {
        super(props);
        this.state ={
            confirmDirty: false,
            role: []
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
    getSelectOption () {
        axios.get('/am/user/role')
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
            option.push({text: val.name, value: val.value})
        });
        return option;
    }
    //验证密码以及确认密码的一致性的
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        })
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('请确保两次输入的密码保持一致')
        } else {
            callback()
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let subData = Object.assign({}, values);
                if (this.props.mode === 'modify') {
                    console.log('modify')
                } else {
                    axios.post('/am/user/add?operate=addEquip',subData)
                        .then((msg) => {
                            this.props.history.go(-1)
                        })
                }
            }
        })
    };
    render () {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8}
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
                    offset: 8
                }
            }
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className={'add_user_form'} onSubmit={this.handleSubmit}>
                <h1 className={'form-field-title'}>用户信息</h1>
                <FormItem {...formItemLayout} label={'名称'}>
                    {getFieldDecorator('name',{
                        rules: [
                            {required: true, message: '名称不能为空'}
                        ]
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label={'角色'}>
                    {getFieldDecorator('role',{
                        rules: [
                            {required: true, message: '角色不能为空'}
                        ]
                    })(
                        <Select placeholder={'请选择用户角色'}>
                            {this.generateOption('role')}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'登录账户'}>
                    {getFieldDecorator('account', {
                        rules: [
                            {required: true, message: '登录账户不能为空'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'密码'}>
                    {getFieldDecorator('password',{
                        rules: [
                            {required: true, message: '密码不能为空'},
                            {validator: this.checkConfirm}
                        ]
                    })(
                        <Input type={'password'}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'确认密码'}>
                    {getFieldDecorator('confirm',{
                        rules: [
                            {required: true, message: '两次输入的密码不一致'},
                            {validator: this.checkPassword}
                        ]

                    })(
                        <Input type={'password'} onBlur={this.handleConfirmBlur}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'联系电话'}>
                    {getFieldDecorator('phone')(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'电子邮箱'}>
                    {getFieldDecorator('email',{
                        rules: [
                            {type: 'email', message: '请输入正确格式的邮箱'}
                        ]
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'备注'}>
                    {getFieldDecorator('description')(
                        <TextArea/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>确认</Button>
                    <Button style={{marginLeft: 8}} onClick={() => {this.props.history.replace('/auth/main/deviceEquip/supplyEquip')}}>取消</Button>
                </FormItem>
            </Form>
        )
    }
}

let exportForm = Form.create()(UserForm);
export default withRouter(exportForm)