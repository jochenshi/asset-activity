/**
 * Created by admin on 2017/12/14.
 */
import React,{ Component } from 'react'
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class TitleOption extends Component {
    constructor (props) {
        super(props);
        this.data = this.props.data;
        this.state = {

        }
    }
    onChange(){}
    render () {
        const tProps = {
            treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: 'Please select',
            style: {
                width: 300,
            },
        };
        return <TreeSelect {...tProps} />;
    }
}

export default TitleOption