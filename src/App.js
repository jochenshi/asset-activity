import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './App.styl'
import Login from './module/login/login'
import MainHome from './module/mainHome/mainHome'
import StoreInfo from './module/inventory/info'
import {RouteWithSubRoutes} from './common/component'
import axios from 'axios'
import store from './store/store'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types';
import { message } from 'antd';


const initAxios = () => {
    axios.interceptors.response.use(function (response) {  
        // token 已过期，重定向到登录页面  
        /*if (response.data.code == 4){  
            localStorage.clear()  
            router.replace({  
                            path: '/signin',  
                            query: {redirect: router.currentRoute.fullPath}  
                        })  
        }  */
        console.log(JSON.stringify(response));
        if(response.config.method!=='get'){
            message.success(response.data.msg);
        }
        return response.data;  
    }, function (error) {  
        // Do something with response error
        message.error(error.response.data['error']);
        return Promise.reject(error.response.data)  
    }) 
};

const mapState = (state) => {
    return {
        loginState: state.userLoginState.isLogin
    }
};

class App extends Component {
    constructor (props) {
        super(props);
        initAxios();
    }
    render() {
        console.log('app props', this.props);
        console.log(this.context);
        return (
            <Router>
                {/*<div className="App">*/}
                {/*<Login />*/}
                {/*<LeftTree></LeftTree>*/}
                {/*<Link to="/home">home</Link>*/}
                {/*<Route exact path='/:id' render={({match}) => {
                console.log(match);
                return (
                    flag ? (<Redirect to='/home'/>) : (<Redirect to="/login"/>)
                )
            }}/>
            <Route exact path="/login" component={Login}/>
            <Route path="/home" component={LeftTree} />*/}
                <Switch>
                    <Route path='/auth/main' component={MainHome}/>
                    <Route path="/login" component={Login} />
                    <Redirect to='/auth/main'/>
                </Switch>
                {/*https://css-tricks.com/react-router-4/*/}
                {/*{routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route}/>
                ))}*/}
                {/*</div>*/}
            </Router>
        )
    }
}

export default connect(mapState)(App)