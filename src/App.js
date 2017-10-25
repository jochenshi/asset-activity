import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import './App.styl'
import Login from './module/login/login'


class App extends Component {
    render() {
        return (
            <div className="App">
                <Login />
            </div>
        )
    }
}

export default App