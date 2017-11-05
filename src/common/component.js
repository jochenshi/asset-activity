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

/*const AuthRoute = ({component: Component,...rest}) => {
    const state = window.aaa;
    return (
        <Route {...rest} render={(props)=>{
            !state ? <Component {...props}/> : <Redirect to='/login'/>
        }}/>
    )
};*/

export {RouteWithSubRoutes/*, AuthRoute*/}