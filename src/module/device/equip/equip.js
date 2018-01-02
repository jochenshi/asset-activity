import React,{ Component } from 'react';
import {Switch, Redirect} from 'react-router-dom';
import {AuthRoute} from "../../../common/component";
import PropTypes from 'prop-types';

import NormalEquip from './normalEquip/normalEquip';
import SupplyEquip from './supplyEquip/supplyEquip'
import AddNormal from './normalEquip/addNormal/addNormal'
import './equip.styl';
import UseHistory from "../history/useHistory";


class DeviceEquip extends Component {
    constructor (props) {
        super(props);
        console.log('constructor');
        this.state = {
            selected: 'normal_equip'
        }
    }
    componentDidMount () {
        console.log('did mount', this.props);
        let match = this.props.match.path;
        let pathname = this.props.location.pathname;
        if (pathname === match) {
            return
        } else {
            let nowUrl = pathname.substring(match.length + 1);
            nowUrl = nowUrl === 'normalEquip' ? 'normal_equip' : 'supply_equip';
            this.setState({
                selected: nowUrl
            })
        }
        //this.props.history.replace('/auth')
    }
    handleTitleClick  = (e) => {
        let target = e.target.getAttribute('data-value');
        if (target !== this.state.selected) {
            console.log('change selected');
            let des = target === 'normal_equip' ? 'normalEquip' : 'supplyEquip';
            this.setState({
                selected: target
            });
            this.props.history.replace('/auth/main/deviceEquip/' + des);
        }
    };
    render () {
        return (
            <div className="equip_content">
                <h1 className="title_content">
                    <div className={this.state.selected === 'normal_equip' ? 'equip_title normal_equip selected': 'equip_title normal_equip'} data-value="normal_equip" onClick={this.handleTitleClick}>普通类配件</div>
                    <div className={this.state.selected === 'supply_equip' ? 'equip_title supply_equip selected': 'equip_title supply_equip'} data-value="supply_equip" onClick={this.handleTitleClick}>耗材类配件</div>
                </h1>
                <div className="table_content">
                    <Switch>
                        <AuthRoute path={`${this.props.match.path}/normalEquip`} type={'all'} component={NormalEquip}/>
                        <AuthRoute path={`${this.props.match.path}/supplyEquip`} data={'all'} component={SupplyEquip}/>
                        <Redirect to={`${this.props.match.path}/normalEquip`}/>
                    </Switch>
                </div>
            </div>
        )
    }
}
/*DeviceEquip.contextTypes = {
    router: PropTypes.object
};*/

export default DeviceEquip