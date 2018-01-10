import React, {Component} from 'react'
import {Modal, Form, Input, Button, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class LinkForm extends Component {
    constructor (props) {
        super(props);
        //this.visible = this.props.visible;
        console.log('link constructor');
    }
    generateOption (visible, val) {
        let arr = [];
        if (visible) {
            val.forEach((value) => {
                arr.push(<Option value={value.value} key={value.value}>{value.text}</Option>)
            });
        }
        return arr
    }
    render () {
        console.log('link reder', this.props.visible);
        const {getFieldDecorator} = this.props.form;
        const {visible, onCancel, onConfirm, machineData} = this.props;
        return (
            <Modal
                visible={visible}
                title={'关联配件'}
                okText={'确定'}
                onCancel={onCancel}
                onOk={onConfirm}
                maskClosable={false}
            >
                <Form>
                    <FormItem label={'服务器'}>
                        {getFieldDecorator('machine',{
                            rules: [
                                {required: true, message: '请选择需要关联的服务器'}
                            ]
                        })(
                            <Select>
                                {this.generateOption(visible, machineData)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label={'备注'}>
                        {getFieldDecorator('description')(
                            <TextArea/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const LinkModal = Form.create()(LinkForm);

export default LinkModal