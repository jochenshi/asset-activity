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
                items.push(<div><span>{keys[i]}</span><span>{data[i]}</span></div>);
            }
        }
    }
    render ({routes}) {
        console.log('routes',routes)
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
                {this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}
            </div>
        )
    }
}

export default StoreInfo