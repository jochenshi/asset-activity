import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Icon, Button, Checkbox} from 'antd';
import './login.styl'

const FormItem = Form.Item;

class Login extends Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (e) {
        e.preventDefault();
        console.log(this);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
            } else {
                console.log(values)
            }
        });
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login">
                <div className="logo" />
                <div className="login_content">
                    <h1 className="title">欢迎使用内部资产管理系统</h1>
                    <div className="input_area">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: 'Please input your username'}]
                                })(<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="username" />)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your password!'}]
                                })(
                                    <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="Password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm