/**
 * Created by admin on 2018/1/5.
 */
import React,{ Component } from 'react'
import axios from 'axios'
import { Form, Input, Select, InputNumber, Button} from 'antd'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import {connect} from 'react-redux'
import {getAuthority} from '../../../../common/methods'
import {withRouter} from 'react-router'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const auth = [
    'assignSupplyEquip'
]

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class AssignEquip extends Component {
    constructor (props) {
        super(props);
        this.backUrl = '/auth/main/deviceEquip/supplyEquip';
        this.record = this.props.location.state;
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.state = {
            users : [],
            projects : []
        }
        this.getAssignParam();
    }

    /**
     * 得到分配选项信息
     */
    getAssignParam(){
        axios.get('/am/use/assignParam')
            .then((res)=>{
                if(res.data){
                    this.setState({
                        projects : res.data['projects'],
                        users : res.data['users']
                    });
                }
            })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            console.log(values);
            let record = this.props.location.state;
            values['relatedId'] = record.id;
            values['relatedType'] = record.relatedType;
            axios.post('/am/use/assignEquip?operate=assignSupplyEquip',values)
                .then((res)=>{
                    this.props.history.replace(this.backUrl);
                })
                .catch((err)=>{
                    console.log(err);
                });
        });
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
            <div className="form-panel">
                <Header title={'分配耗材'} backUrl={this.backUrl}/>
                <div className="form">
                    <Form onSubmit={this.handleSubmit}>
                        <h1 className="form-field-title"></h1>
                        <FormItem
                            {...formItemLayout}
                            label="使用者"
                        >
                            {getFieldDecorator('userId',{
                                rules: [{ required : true, message : '必须选择使用者。' }]
                            })(
                                <Select>
                                    {this.generateOption(this.state.users)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="使用用途"
                        >
                            {getFieldDecorator('purpose')(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="使用个数"
                        >
                            {getFieldDecorator('lendNumber',{
                                initialValue : 1,
                                rules: [
                                    { required : true, message : '必须填写使用个数。' },
                                    { pattern: /^[1-9]\d*$/, message: '请输入正整数。' }
                                ]
                            })(
                                <InputNumber min={1} max={this.record.remainNumber}/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="归属项目"
                        >
                            {getFieldDecorator('project',{
                                rules: [{ required : true, message : '必须填写归属项目。' }]
                            })(
                                <Select
                                    mode="combobox"
                                >
                                    {this.generateOption(this.state.projects)}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="描述"
                        >
                            {getFieldDecorator('lendDetail',{
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
let AssignEquipWrap = Form.create()(AssignEquip);
AssignEquipWrap = withRouter(AssignEquipWrap)
export default connect(mapState)(AssignEquipWrap)