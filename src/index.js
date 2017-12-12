import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import './assets/icon/iconfont.css'
import store from './store/store'
import { toggleLogin } from './store/action'

/*let unsubscribe = store.subscribe(() => {
    console.log('update', store.getState())
});
store.dispatch(toggleLogin(true));
store.dispatch(toggleLogin(1));
store.dispatch(toggleLogin(2));
store.dispatch(toggleLogin(3));

unsubscribe();
store.dispatch(toggleLogin(4));*/

ReactDom.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    , document.getElementById('root')
);