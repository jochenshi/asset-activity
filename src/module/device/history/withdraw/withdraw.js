/**
 * Created by admin on 2018/1/5.
 */
import React,{ Component } from 'react'
import axios from 'axios'
import { Form, Input, DatePicker,Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Modal } from 'antd'
import {Link} from 'react-router-dom'
import Header from '../../../../common/header'
import {connect} from 'react-redux'
import {getAuthority} from '../../../../common/methods'
import {withRouter} from 'react-router'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;

const auth = [
    'withdrawMachine',
    'withdrawNormalEquip'
]

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};

class Withdraw extends Component {
    constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        this.getHeader();
    }

    /**
     * 得到头部信息
     */
    getHeader(){
        let title = '收回物资';
        let backUrl = '/auth/main/storeInfo';
        let record = this.props.location.state;
        if(record){
            switch(record.relatedType){
                case 'machine':
                    title = '收回机器';
                    backUrl = '/auth/main/deviceMachine';
                    break;
                case 'fitting':
                    title = '收回配件';
                    backUrl = '/auth/main/deviceEquip/normalEquip';
                    break;
            }
            this.head = {title: title, backUrl: backUrl}
        }
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
            let operate = record.relatedType==='machine'?'withdrawMachine':'withdrawNormalEquip';
            axios.put('/am/use/withdraw?operate='+operate,values)
                .then((res)=>{
                    this.props.history.replace(this.head.backUrl);
                })
                .catch((err)=>{
                    console.log(err);
                });
        });
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
                <Header title={this.head.title} backUrl={this.head.backUrl}/>
                <div className="form">
                    <Form onSubmit={this.handleSubmit}>
                        <h1 className="form-field-title"></h1>
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
                            <Button><Link to={this.head.backUrl}>取消</Link></Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}
let WithdrawWrap = Form.create()(Withdraw);
WithdrawWrap = withRouter(WithdrawWrap)
export default connect(mapState)(WithdrawWrap)