import React,{Component} from 'react'

class StoreInfo extends Component{
    constructor (props) {
        super(props);
    }
    render () {
        //const showLabels = this.props.labels;
        const showDatas = {name: 'asd', age: '111'};
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