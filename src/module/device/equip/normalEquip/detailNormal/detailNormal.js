import React, {Component} from 'react'

class DetailNormal extends Component {
    constructor (props) {
        super(props);
        console.log(props.match.params)
    }
    render () {
        return (
            <div>detail normal</div>
        )
    }
}

export default DetailNormal