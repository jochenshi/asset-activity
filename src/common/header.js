import React,{ Component } from 'react'
import {Link} from 'react-router-dom'

class Header extends Component {
    title = '';
    backUrl = '';
	constructor (props) {
        super(props);
        console.log(this.props);
        this.title = this.props.title;
        this.backUrl = this.props.backUrl;
        this.onBack = this.props.onBack
    }
    handleBack = (e) => {
	    e.preventDefault();
	    this.onBack()
    };
    render () {
        return (
            <header className='header'>
                <span className="link">
                    {
                        this.onBack ?
                            <a onClick={this.handleBack}>返回</a> :
                            <Link to={this.backUrl}>返回</Link>
                    }
                </span>
                <span className="title">{this.title || ''}</span>
            </header>
        )
    }
}

export default Header