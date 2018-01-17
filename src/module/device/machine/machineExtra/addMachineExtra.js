import React, {Component} from 'react'
import {Modal, Form, Input, Button} from 'antd'
const FormItem = Form.Item;

class MachineExtraAdd extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {getFieldDecorator} = this.props.form;
        const {visible, onConfirm, onCancel} = this.props;
        return (
            <Modal visible={visible}
                   title={'添加附加信息'}
                   okText={'确定'}
                   cancelText={'取消'}
                   maskClosable={false}
                   onOk={onConfirm}
                   onCancel={onCancel}>
                <Form>
                    <FormItem label={'标签'}>
                        {getFieldDecorator('title', {
                            rules: [
                                {required: true, message: '附加信息的标签不能为空'}
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem label={'内容'}>
                        {getFieldDecorator('content', {
                            rules: [
                                {required: true, message: '附加信息的内容不能为空'}
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

const AddExtra = Form.create()(MachineExtraAdd);

export default AddExtra