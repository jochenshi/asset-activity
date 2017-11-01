import React,{Component} from 'react'
import {Link} from 'react-router-dom'

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

class StoreInfo extends Component{
    constructor (props) {
        super(props);
        console.log('props',props)
    }
    handleData (data, keys) {
        let items = [];
        if (Object.keys(data).length < 1) {
            items.push(<div>no input data</div>);
            return;
        }
        for (var i in keys) {
            if (data.hasOwnProperty(i)) {
                items.push(<div key={i}><span>{keys[i]}</span><span>{data[i]}</span></div>);
            }
        }
        return items;
    }
    render () {
        const testData = {name: 'host1', ip: '192.168.1.1', size: 20};
        const testKey = {name: '名称', ip: 'IP地址', size: '大小'};
        //const showLabels = this.props.labels;
        const items = this.handleData(testData, testKey);
        console.log('items', items);
        return (
            <div>
                <div className="detail_wrapper">
                    {items}
                </div>
                {/*{this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}*/}
            </div>
        )
    }
}

export default StoreInfo