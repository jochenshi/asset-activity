import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './App.styl'
import Login from './module/login/login'
import MainHome from './module/mainHome/mainHome'
import StoreInfo from './module/inventory/info'
import {RouteWithSubRoutes} from './common/component'

const Info = () => {
    return (<div>info</div>)
};

const As = () => {
    return (<div>ddd</div>)
};

const Nopage = ({routes}) => {
    console.log(routes);
    return (
        <div>
            <h1>no content</h1>
            <ul>
                <li><Link to="/storeinfo/info">info</Link></li>
            </ul>
            {routes.map((route,i) => (
                <RouteWithSubRoutes key={i} {...route}/>
            ))}
        </div>
    )
};

/*const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/storeinfo',
        component: LeftTree,
        routes: [
            {
                path: '/storeinfo/info',
                component: StoreInfo
            },
            {
                path: '/storeinfo/asd',
                component: As
            }
        ]
    }
];*/

/*class AuthorizedRoute extends Component {
    compomentWillMount () {}
    render () {
        return (
            <Route render={}/>
        )
    }
}*/

class App extends Component {
    constructor (props) {
        super(props);
    }
    render() {
        console.log(this.props);
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
                    <Route path='/storeinfo' component={MainHome}/>
                    <Route path="/login" component={Login} />
                    <Redirect to='/storeinfo'/>
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

export default App