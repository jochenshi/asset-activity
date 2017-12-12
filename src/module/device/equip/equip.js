import React,{ Component } from 'react';
import NormalEquip from './normalEquip';

import './equip.styl';

class DeviceEquip extends Component {
    render () {
        return (
            <div className="equip_content">
                <h1>
                    <div className="equip_title normal_equip">普通类配件</div>
                    <div className="equip_title supply_equip">耗材类配件</div>
                </h1>
                <div className="table_content">
                    <NormalEquip></NormalEquip>
                </div>
            </div>
        )
    }
}

export default DeviceEquip