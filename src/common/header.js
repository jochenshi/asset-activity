import React,{ Component } from 'react'
import {Link, Route, Redirect, Switch} from 'react-router-dom'

class Header extends Component {
    title = '';
    backUrl = '';
	constructor (props) {
        super(props);
        console.log(this.props);
        this.title = this.props.title;
        this.backUrl = this.props.backUrl;
    }
    render () {
        return (
            <header className='header'>
                <h1>{this.title || ''}</h1>
                <span><Link to={this.backUrl}>返回</Link></span>
            </header>
        )
    }
}

export default Header