/**
 * Created by admin on 2017/12/20.
 */
import React,{ Component } from 'react'
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class AddressMachine extends Component {
    constructor (props) {
        super(props);
        this.machineId = props.machineId;
        this.type = props.type;
        this.state = {
            data : {}
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="form-field-title">{this.type.toUpperCase()}</h1>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('address',{
                            rules: [{ required : true, message : '地址必须填写。' },
                                { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,message:'请填写正确格式的IP地址。'}],
                            initialValue : this.state.data['address']||'',
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('userName',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ],
                            initialValue : this.state.data['userName'] || ''
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ],
                            initialValue : this.state.data['password'] || ''
                        })(
                            <Input type={'password'} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const AddressMachineWrap = Form.create()(AddressMachine);

export default AddressMachineWrap