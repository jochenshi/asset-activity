import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

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

const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin
    }
};

class routeAuth extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        console.log(111, this);
        let {component: Component, loginState , ...rest} = this.props;
        let a = 0;
        return (
            <Route {...rest} render={(props) => {
                if (loginState) {
                    return <Component {...props}/>
                } else {
                    alert('not login');
                    return <Redirect to='/login'/>
                }
            }}/>
        )
    }
}

// one customize route component used to check route authority
/*const AuthRoute = ({component: Component, ...rest}) => {
    let state = window.localStorage.aaa = 1;
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
};*/
const AuthRoute = connect(mapState)(routeAuth);

export {RouteWithSubRoutes, AuthRoute}