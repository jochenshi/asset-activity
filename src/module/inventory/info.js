import React,{Component} from 'react'
import {Link} from 'react-router-dom'

import InventoryList from './inventoryList/inventoryList'
import './style.styl'

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

class StoreInfo extends Component{
    constructor (props) {
        super(props);
        //console.log('props',props)
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
        const total = 2;
        return (
            <div className="info">
                <div className="detail_wrapper">
                    <div className="servers">
                        <span className="label">服务器</span>
                        <span className="num">2</span>
                        /{total}
                    </div>
                    <div className="disks">
                        <span className="label">磁盘</span>
                        <span className="num">2</span>
                        /{total}
                    </div>
                </div>
                <InventoryList passAuth={['storeInfo']}/>
                {/*{this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}*/}
            </div>
        )
    }
}

export default StoreInfo