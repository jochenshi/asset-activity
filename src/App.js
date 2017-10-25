import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.styl'
import Login from './module/login/login'

const Test = () => {
    return (<div>test page</div>)
};

const Nopage = () => {
    return (<div>no content</div>)
};

class App extends Component {
    render() {
        return (
            <div className="App">
                <Login />
                <Link to="/home">home</Link>
                <Route exact path="/" component={Nopage}/>
                <Route path="/home" component={Test} />
            </div>
        )
    }
}

export default App