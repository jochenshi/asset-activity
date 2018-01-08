import React, {Component} from 'react'
import {Modal, Form, Input, Button, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class ManyForm extends Component {
    constructor (props) {
        super(props);

    }
    render () {
        const {getFieldDecorator} = this.props.form;
        return (
            <Modal
                title={'批量关联'}
                okText={'确定'}
            >
                <Form>
                    <FormItem label={'配件'}></FormItem>
                </Form>
            </Modal>
        )
    }
}

const ManyModal = Form.create()(ManyForm);

export default ManyModal