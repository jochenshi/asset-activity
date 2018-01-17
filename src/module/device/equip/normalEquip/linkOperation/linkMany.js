import React, {Component} from 'react'
import {Modal, Form, Input, Button, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class ManyForm extends Component {
    constructor (props) {
        super(props);

    }
    generateOption (visible, val) {
        let arr = [];
        if (visible) {
            val.forEach((value) => {
                arr.push(<Option value={value.value.toString()} key={value.value}>{value.text}</Option>)
            });
        }
        return arr
    }
    render () {
        const {getFieldDecorator} = this.props.form;
        const {type, fittingData, visible, onConfirm, onCancel} = this.props;
        return (
            <Modal
                visible={visible}
                title={'批量关联'}
                okText={'确定'}
                cancelText={'取消'}
                onCancel={onCancel}
                onOk={onConfirm}
                maskClosable={false}
            >
                <Form>
                    <FormItem label={'配件'}>
                        {getFieldDecorator('fitting',{
                            rules: [
                                {required: true, message: '选择数据不能为空'}
                            ]
                        })(
                            <Select
                                mode={'tags'}
                            >
                                {this.generateOption(visible, fittingData)}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const ManyModal = Form.create()(ManyForm);

export default ManyModal