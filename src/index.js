import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import './assets/icon/iconfont.css'

ReactDom.render(
    <Router>
        <App></App>
    </Router>
    , document.getElementById('root')
);