/**
 * Created by admin on 2017/12/20.
 */
import React,{ Component } from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import {getAuthority} from '../../../../common/methods'

const FormItem = Form.Item;

const auth = [
    'address',
    'addAddress',
    'modifyAddress'
]

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class AddressMachine extends Component {
    constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.disabled = !this.auth['addAddress'];
        this.machineId = props.machineId;
        this.type = props.type;
        this.state = {
            data : {}
        }
        this.getAddressData();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err){
                return;
            }
            if(this.disabled) return;
            values['machineId'] = this.machineId;
            values['type'] = this.type;
            if(!this.state.data.id){
                axios.post('/am/address?operate=addAddress',values)
                    .then((res)=>{
                        console.log(res);
                        this.setState({
                            data: res.data
                        })
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
            }else{
                values['id'] = this.state.data.id;
                axios.put('/am/address?operate=modifyAddress',values)
                    .then((res)=>{
                        console.log(res);
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.setState({
                            data : this.state.data
                        });
                    });
            }
        })
    }
    getAddressData = () => {
        axios.get('/am/address/?operate=adress&machineId='+this.machineId+'&type='+this.type)
            .then((res)=>{
                if(res.data){
                    if(res.data.id){
                        this.disabled = !this.auth['modifyAddress'];
                    }
                    this.setState({
                        data : res.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
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
        if(!this.auth['address']){
            return (
                <p>没有查看权限！</p>
            )
        }
        return (
            <div className="form">
                <Form onSubmit={this.handleSubmit}>
                    <h1 className="form-field-title">{this.type.toUpperCase()}</h1>
                    <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('address',{
                            rules: [{ required : true, message : '地址必须填写。' },
                                { pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,message:'请填写正确格式的IP地址。'}],
                            initialValue : this.state.data['address']||'',
                        })(
                            <Input disabled={this.disabled}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户名"
                    >
                        {getFieldDecorator('username',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ],
                            initialValue : this.state.data['username'] || ''
                        })(
                            <Input  disabled={this.disabled}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                    >
                        {getFieldDecorator('password',{
                            rules :[
                                { pattern : /^\S*$/, message : '不能输入非法字符。' }
                            ],
                            initialValue : this.state.data['password'] || ''
                        })(
                            <Input  disabled={this.disabled}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" disabled={this.disabled}>确定</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const AddressMachineWrap = Form.create()(AddressMachine);

export default connect(mapState)(AddressMachineWrap)