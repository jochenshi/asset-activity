import React,{Component} from 'react'

class StoreInfo extends Component{
    constructor (props) {
        super(props);
    }
    handleData (data, keys) {
        let items = [];
        if (Object.keys(data).length < 1) {
            items.push(<div>no input data</div>);
            return;
        }
        for (var i in keys) {
            if (data.hasOwnProperty(i)) {
                items.push(<div><span>{keys[i]}</span><span>{data[i]}</span></div>);
            }
        }
    }
    render () {
        //const showLabels = this.props.labels;
        const showDatas = {};
        var items = [];
        for (var i in showDatas) {
            items.push(<div>{showDatas[i]}</div>)
        }
        return (
            <div>
                <div className="detail_wrapper">
                    {items}
                </div>
            </div>
        )
    }
}

export default StoreInfo