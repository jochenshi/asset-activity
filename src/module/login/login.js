import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Icon, Button, Checkbox} from 'antd';
import axios from 'axios';
import './login.styl'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin
    }
};

const mapDispatch = (dispatch, ownProps) => {
    return {
        changeLogin: () => {dispatch({type: 'TOGGLE_LOGIN', value: true})}
    }
};

class Login extends Component {
    constructor (props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit (e) {
        e.preventDefault();
        console.log(this);
        let {changeLogin} = this.props;
        changeLogin();
        this.context.router.history.replace('/auth');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/am/user/login', values)
                    .then((msg) => {
                        changeLogin();
                        console.log('success', msg);
                        window.location.href = window.location.href.split('/login')[0] + '/auth';
                    })
                    .catch((error) => {
                        console.log('error', error)
                    });
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
                                {getFieldDecorator('account', {
                                    rules: [{required: true, message: 'Please input your account'}]
                                })(<Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="account" />)}
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

Login.contextTypes = {
    router: PropTypes.object
};

const WrappedNormalLoginForm = Form.create()(connect(mapState, mapDispatch)(Login));

export default WrappedNormalLoginForm