import React,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getAuthority} from '../../common/methods'

import InventoryList from './inventoryList/inventoryList'
import './style.styl'

const mapState = (state) => {
    return {
        authority: state.authArray.authority
    }
};
const auth = ['storeInfo']

class StoreInfo extends Component{
    constructor (props) {
        super(props);
        this.auth = getAuthority(this.props.authority, auth, this.props.passAuth);
        console.log('storeinfo');
        this.state = {
            data : []
        }
        this.getBriefInfo();
    }
    getBriefInfo(){
        axios.get('/am/ascription/brief?operate=storeInfo')
            .then((res)=>{
                if(res.data){
                    this.setState({
                        data : res.data
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    render () {
        if(!this.auth['storeInfo']){
            return <p>没有查看权限！</p>
        }
        return (
            <div className="info">
                <div className="detail_wrapper">
                    {this.state.data.map((item,i)=>{
                        return <div className="servers" key={i}>
                            <span className="label">{item.typeText}</span>
                            <span className="num">{item.remainder}</span>
                            /{item.total}
                        </div>
                    })}
                </div>
                <InventoryList passAuth={['storeInfo']}/>
            </div>
        )
    }
}

export default connect(mapState)(StoreInfo)