import React,{ Component } from 'react'

import { Modal,Button,Form,Select,Input } from 'antd'
const FormItem = Form.Item;

/*
class AddInventory extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }
    showModal =  () => {
        this.setState({visible: true})
    };
    handleCancel = () => {
        this.setState({visible: false})
    };
    render () {
        //const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const inputAfter = (
            <Select defaultValue='GB'>
                <Option value='GB'>GB</Option>
                <Option value='TB'>TB</Option>
            </Select>
        );
        return (
            <div>
                <Button type='primary' onClick={this.showModal}>添加</Button>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    maskClosable={false}
                    okText='增加'
                    title='增加库存'>
                    <Form>
                        <FormItem label='设备类型'>
                            {getFieldDecorator('type', {
                                rules: [{required: true, message: '请选择设备类型'}]
                            })(
                                <Select placeholder='请选择设备类型'>
                                    <Option key='1'>机器</Option>
                                    <Option key='2'>配件</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label='型号'>
                            {getFieldDecorator('modal')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='品牌'>
                            {getFieldDecorator('modal')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='数量'>
                            {getFieldDecorator('modal')(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem label='大小'>
                            {getFieldDecorator('modal')(
                                <Input addonAfter={inputAfter}/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
const AddInventoryForm = Form.create()(AddInventory);
export default AddInventoryForm*/

class AddInventoryPage extends Component{
    render () {
        return (
            <div></div>
        )
    }
}

export default AddInventoryPage
