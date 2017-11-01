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
    render ({routes}) {
        console.log('routes',routes)
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
                {this.props.routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}
            </div>
        )
    }
}

export default StoreInfo