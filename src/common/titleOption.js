/**
 * Created by admin on 2017/12/14.
 */
import React,{ Component } from 'react'
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

class TitleOption extends Component {
    constructor (props) {
        super(props);
        this.data = {};
        this.backTitle = this.props.onChange || ((titles) => {console.log(titles)});
        let value = [];
        this.props.data.forEach((item)=>{
            this.data[item.dataIndex] = item;
            if(item.display!==false) {
                value.push(item.dataIndex);
            }
        });
        this.refreshTitle(value);
        this.state = {
            value : value
        }
        this.treeData = this.props.data.map((item)=>{
            return {
                label : item.title,
                value : item.dataIndex,
                key : item.dataIndex
            }
        });
    }
    onChange = (value)=>{
        console.log('onChange ', value, arguments);
        this.setState({ value });
        this.refreshTitle(value);
    }
    refreshTitle =(value)=>{
        let newTitles = value.map((item)=>{
            return this.data[item];
        })
        this.backTitle(newTitles);
    }
    render () {
        const tProps = {
            treeData: this.treeData,
            value: this.state.value,
            onChange: this.onChange,
            treeCheckable: true,
            showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择',
            dropdownMatchSelectWidth : false,
            style: {
                width: 87,
            },
        };
        return<div className="list_title">
            <TreeSelect {...tProps} />
            <span className="list_title_text">选择展示列</span>
        </div>;
    }
}

export default TitleOption