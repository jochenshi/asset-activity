import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {getCookie} from "./methods";


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
        let {component: Component, ...rest} = this.props;
        let loginState = getCookie('am_user') || true;
        return (
            <Route {...rest} render={(props) => {
                if (loginState) {
                    return <Component {...props} {...rest}/>
                } else {
                    alert('not login');
                    return <Redirect to='/login'/>
                }
            }}/>
        )
    }
}
routeAuth.contextTypes = {
    router: PropTypes.object
};

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