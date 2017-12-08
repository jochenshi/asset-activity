import React,{ Component } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import Header from '../../../../common/header'
import BaseinfoMachineWrap from '../baseinfoMachine/baseinfoMachine'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class AddMachine extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        /*this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });*/
    }
    render () {
        return (
            <div className="form-panel">
                <Header title={'添加机器'} backUrl={'/auth/main/deviceMachine'}/>
                <BaseinfoMachineWrap/>
            </div>
        )
    }
}

export default AddMachine