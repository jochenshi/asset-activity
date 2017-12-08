/**
 * Created by admin on 2017/12/7.
 */
import React,{ Component } from 'react'
import axios from 'axios'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class BaseinfoMachine extends Component {
    constructor (props){
        super(props);
        this.state = {
            outInType : [],
            originObject : [],
            targetObject : [],
            type : [],
            model : [],
            brand : [],
            prefixRdNumber : 'RD'
        };
        this.getSelectData();
    }
    getSelectData(){
        axios.get('/am/select/machine')
        .then((res)=>{
            if(res.data){
                let data = res.data;
                this.setState({
                    outInType : data['inType'],
                    originObject : data['inOrigin'],
                    targetObject : data['inTarget'],
                    type : data['type'],
                    model : data['model'],
                    brand : data['brand'],
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        /*this.props.form.validateFieldsAndScroll((err, values) => {
         if (!err) {
         console.log('Received values of form: ', values);
         }
         });*/
    }
    handleChange = (value) => {
        console.log(`Selected: ${value}`);
        value = value==='borrow'?'RDB':'RD';
        this.setState({
            prefixRdNumber : value
        })
    }
    generateOption(arr){
        return arr.map((item)=><Option key={item.value} value={item.value}>{item.text}</Option>);
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
                        {getFieldDecorator('outInType',{
                            rules: [{ required : true, message : '必须选择来源类型。' }],
                            initialValue : 'buyin'
                        })(
                            <Select
                                onChange={this.handleChange}
                            >
                                {this.generateOption(this.state.outInType)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="来源对象"
                    >
                        {getFieldDecorator('originObject')(
                            <Select
                                mode="combobox"
                            >
                                {this.generateOption(this.state.originObject)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="入库对象"
                    >
                        {getFieldDecorator('targetObject')(
                            <Select
                                mode="combobox"
                            >
                                {this.generateOption(this.state.targetObject)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="来源描述"
                    >
                        {getFieldDecorator('ascriptionDesc')(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <h1 className="form-field-title">机器信息</h1>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('name',{
                            rules :[
                                { required : true, whitespace: true, message : '名称不可为空。'},
                                { pattern : /^[0-9a-zA-Z_-]+$/, message : '名称不能输入非法字符！'}
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                    >
                        {getFieldDecorator('targetObject',{
                            rules : [{required: true, message: '必须选择一个类型。'}],
                            initValue : 'server'
                        })(
                            <Select>
                                {this.generateOption(this.state.type)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="研发部编号"
                    >
                        {getFieldDecorator('rdNumber',{
                            rules :[
                                { required : true, whitespace: true, message : '研发部编号不可为空。'},
                                { pattern : /^[0-9]{4,}$/, message : '必须填写四位以上的数字。'}
                            ]
                        })(
                            <Input addonBefore={this.state.prefixRdNumber}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="固定资产编号"
                    >
                        {getFieldDecorator('fixedNumber',{
                            rules :[
                                { pattern : /^\w+$/, message : '不能输入非法字符！' }
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}

const BaseinfoMachineWrap = Form.create()(BaseinfoMachine);

export default BaseinfoMachineWrap