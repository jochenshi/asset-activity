import React, {Component} from 'react'
import {Form, Input, Select, Button} from 'antd'
import {withRouter} from 'react-router-dom'

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class UserForm extends Component {
    constructor (props) {
        super(props)
    }
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
            <Form>
                <h1 className={'form-field-title'}>用户信息</h1>
                <FormItem {...formItemLayout} label={'名称'}>
                    {getFieldDecorator('name',{
                        rules: [
                            {required: true, message: '名称不能为空'}
                        ]
                    })(<Input/>)}
                </FormItem>
            </Form>
        )
    }
}

let exportForm = Form.create()(UserForm);
export default withRouter(exportForm)