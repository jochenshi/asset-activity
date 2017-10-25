import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom'

class Home extends Component {
    render () {
        return (
            <div>
                <h1>This is home page</h1>
                <Switch>
                    <Route path="test"></Route>
                </Switch>
            </div>
        )
    }
}

export default Home