import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'

const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes}/>
    )}/>
);

/*class AuthRouter extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return ()
    }
}*/

// one customize route component used to check route authority
const AuthRoute = ({component: Component, ...rest}) => {
    let state = window.localStorage.aaa;
    // 0 represent not authentic, 1 represent authentic
    state ? state = Number(state) : state = false;
    return (
        <Route {...rest} render={(props)=>{
            if (state) {
                return <Component {...props}/>
            } else {
                alert('not login');
                return <Redirect to='/login'/>
            }
        }}/>
    )
};

export {RouteWithSubRoutes, AuthRoute}