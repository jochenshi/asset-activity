/**
 * Created by admin on 2017/12/7.
 */
import React,{ Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
    console.log(`Selected: ${value}`);
}

class BaseinfoMachine extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        /*this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
         console.log('Received values of form: ', values);
         }
         });*/
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
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="form-field-title">来源信息</h1>
                    <FormItem
                        {...formItemLayout}
                        label="来源类型"
                    >
                        {getFieldDecorator('OutInType',{
                            rules: [{ required : true, message : '必须选择来源类型。' }]
                        })(
                            <Select defaultValue="1">
                                <Option value="1">购入</Option>
                                <Option value="2">借入</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="来源对象"
                        hasFeedback
                    >
                        {getFieldDecorator('originObject')(
                            <Select
                                mode="combobox"
                                onChange={handleChange}
                            >
                                {children}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const BaseinfoMachineWrap = Form.create()(BaseinfoMachine);

export default BaseinfoMachineWrap