import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Form, Input, Select, Button} from 'antd'

const FormItem = Form.Item;

class DetailForm extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <Form></Form>
        )
    }
}

const detailForm = Form.create()(DetailForm);
export default withRouter(detailForm)