/**
 * Created by admin on 2018/1/5.
 */
import React,{ Component } from 'react'
import axios from 'axios'
import { Form, Input, Select, Button, InputNumber } from 'antd'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import {connect} from 'react-redux'
import {getAuthority} from '../../../../common/methods'
import {withRouter} from 'react-router'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const auth = [
    'withdrawSupplyEquip'
]

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class WithdrawEquip extends Component {
    constructor (props) {
        super(props);
        this.backUrl = '/auth/main/deviceEquip/supplyEquip';
        this.record = this.props.location.state;
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.state = {
            useRecord : []
        }
        this.getNoReturn();
    }

    getNoReturn(){
        axios.get('/am/use?operate=getSelectList&action=partNoReturn&partId='+this.record.id)
            .then((res)=>{
                this.setState({
                    returnMax : 1,
                    useRecord : res.data
                })
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            axios.put('/am/use/withdrawEquip?operate=withdrawSupplyEquip',values)
                .then((res)=>{
                    this.props.history.replace(this.backUrl);
                })
                .catch((err)=>{
                    console.log(err);
                });
        });
    }
    handleChange = (value)=>{
        this.setState({
            returnMax : value.lendNumber - (value.returnNumber||0)
        });
    }
    generateOption(arr){
        return arr.map((item)=><Option key={item.name} value={item.name}>{item.name}</Option>);
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
            <div className="form-panel">
                <Header title={'收回耗材'} backUrl={this.backUrl}/>
                <div className="form">
                    <Form onSubmit={this.handleSubmit}>
                        <h1 className="form-field-title"></h1>
                        <FormItem
                            {...formItemLayout}
                            label="收回对象"
                        >
                            {getFieldDecorator('record',{
                                rules: [{ required : true, message : '必须选择收回对象。' }]
                            })(
                                <Select
                                    onChange={this.handleChange}
                                >
                                    {this.state.useRecord.map((item)=><Option key={item.id} value={item}>{item.name+'('+item.project+')'+(item.returnNumber||0)+'/'+item.lendNumber}</Option>)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="收回个数"
                        >
                            {getFieldDecorator('returnNumber',{
                                initialValue : 1,
                                rules: [
                                    { required : true, message : '必须填写收回个数。' },
                                    { pattern: /^[1-9]\d*$/, message: '请输入正整数。' }
                                ]
                            })(
                                <InputNumber min={1} max={this.state.returnMax}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="归还备注"
                        >
                            {getFieldDecorator('returnDetail',{
                                rules :[
                                    { pattern : /^\S*$/, message : '不能输入非法字符。' }
                                ]
                            })(
                                <TextArea autosize={{ minRows: 2, maxRows: 6 }}/>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">确定</Button>
                            <Button><Link to={this.backUrl}>取消</Link></Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
let WithdrawEquipWrap = Form.create()(WithdrawEquip);
WithdrawEquipWrap = withRouter(WithdrawEquipWrap)
export default connect(mapState)(WithdrawEquipWrap)