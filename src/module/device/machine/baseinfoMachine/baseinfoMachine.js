/**
 * Created by admin on 2017/12/7.
 */
import React,{ Component } from 'react'
import axios from 'axios'
import { Form, Input, DatePicker,Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class BaseinfoMachine extends Component {
    constructor (props){
        super(props);
        this.backUrl = this.props.backUrl || '/auth/main/storeInfo';
        this.rdNumber = '';
        this.rdbNumber = '';
        this.state = {
            outInType : [],
            originObject : [],
            targetObject : [],
            type : [],
            model : [],
            brand : [],
            cpu : [],
            prefixRdNumber : 'RD',
            rdNumber : '',
            rdbNumber : ''
        };
        this.getSelectData();
        this.getRdNumber();
    }
    getRdNumber(){
        axios.get('/am/machine/rdNumber')
            .then((res)=>{
                if(res.data){
                    let rdNumber = (res.data.rdCount+1).toString();
                    let i = 0,l = rdNumber.length;
                    while(i<4 - l){
                       rdNumber = '0'+ rdNumber;
                        i++;
                    }
                    let rdbNumber = (res.data.rdbCount+1).toString();
                    i = 0,l = rdbNumber.length;
                    while(i<4 - l){
                        rdbNumber = '0'+rdbNumber;
                        i++;
                    }
                    this.setState({
                        rdNumber : rdNumber,
                        rdbNumber : rdbNumber
                    });
                }
            })
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
                    cpu : data['cpu']
                });
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
             if (!err) {
                console.log('Received values of form: ', values);
             }
             console.log(values);
             values['rdNumber'] = this.state.prefixRdNumber + values['rdNumber'];
            axios.post('/am/machine?operate=addMachine',values)
                .then((res)=>{
                    this.context.router.history.replace(this.backUrl)
                })
                .catch((err)=>{
                    console.log(err);
                });
         });
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
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
                        label="DatePicker"
                    >
                        {getFieldDecorator('occurTime')(
                            <DatePicker />
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
                        {getFieldDecorator('ascriptionDesc',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ]
                        })(
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
                        {getFieldDecorator('type',{
                            rules : [{required: true, message: '必须选择一个类型。'}],
                            initialValue : 'server'
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
                            ],
                            initialValue : this.state.prefixRdNumber === 'RD' ? this.state.rdNumber : this.state.rdbNumber
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
                                { pattern : /^\S*$/, message : '不能输入非法字符！' }
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="S/N号"
                    >
                        {getFieldDecorator('serialNo',{
                            rules :[
                                { required: true, message: 'S/N号不能为空。'},
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="规格型号"
                    >
                        {getFieldDecorator('model',{
                            rules : [
                                {required: true,message: '规格型号不能为空。'}
                            ]
                        })(
                            <Select
                                mode="combobox"
                            >
                                {this.generateOption(this.state.model)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="品牌"
                    >
                        {getFieldDecorator('brand',{
                            rules : [
                                {required: true,message: '品牌不能为空。'}
                            ]
                        })(
                            <Select
                                mode="combobox"
                            >
                                {this.generateOption(this.state.brand)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="CPU"
                    >
                        {getFieldDecorator('cpu',{
                            rules : [
                                {required: true,message: 'CPU不能为空。'}
                            ]
                        })(
                            <Select
                                mode="combobox"
                            >
                                {this.generateOption(this.state.cpu)}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="位置"
                    >
                        {getFieldDecorator('location',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ]
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="机器描述"
                    >
                        {getFieldDecorator('machineDesc',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ]
                        })(
                            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button><Link to={this.backUrl}>取消</Link></Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
BaseinfoMachine.contextTypes = {
    router: PropTypes.object
};

const BaseinfoMachineWrap = Form.create()(BaseinfoMachine);

export default BaseinfoMachineWrap