import React,{ Component } from 'react';
import NormalEquip from './normalEquip';
import SupplyEquip from './supplyEquip'
import {Switch} from 'react-router-dom';
import {AuthRoute} from "../../../common/component";
import PropTypes from 'prop-types';

import './equip.styl';
import UseHistory from "../history/useHistory";

class DeviceEquip extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selected: 'normal_equip'
        }
    }
    handleTitleClick  = (e) => {
        let target = e.target.getAttribute('data-value');
        if (target !== this.state.selected) {
            console.log('change selected');
            this.setState({
                selected: target
            })
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
                        <AuthRoute path={`${this.props.match.path}/normalEquip`} component={NormalEquip}/>
                        <AuthRoute path={`${this.props.match.path}/supplyEquip`} component={SupplyEquip}/>
                    </Switch>
                </div>
            </div>
        )
    }
}
DeviceEquip.contextTypes = {
    router: PropTypes.object
};

export default DeviceEquip