import React,{Component} from 'react';
import {withRouter} from 'react-router'

import axios from "axios";
import {Form, Input, Select, Button, DatePicker} from "antd";
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class SupplyForm extends Component {
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
        const {getFieldDecorator} = this.props.form;
        return (
            <Form className={'add_supply_form'}>
                <h1 className={'form-field-title'}>来源信息</h1>
                <FormItem {...formItemLayout} label={'来源类型'}>
                    {getFieldDecorator('origin',{
                        rules: [
                            {required: true, message: '来源类型不能为空'}
                        ]
                    })(
                        <Select>
                            {}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={'时间'}>
                    {getFieldDecorator('time', {
                        rules: [
                            {required: true, message: '请选择时间'}
                        ]
                    })()}
                </FormItem>
            </Form>
        )
    }
}

let exportForm = Form.create()(SupplyForm);
export default withRouter(exportForm)