import React, {Component} from 'react'
import {Layout, Menu} from 'antd'
import {Link, Route, Redirect, Switch} from 'react-router-dom'

import './style.styl'

//import {RouteWithSubRoutes, AuthRoute} from '../../common/component'
import StoreInfo from '../inventory/info'
import InventoryHistory from '../inventory/inventoryHistory/inventoryHistory'
import DeviceMachine from '../device/machine/machine'
import DeviceEquip from '../device/equip/equip'
import UseHistory from '../device/history/useHistory'
import UserManage from '../usermanage/user'
import HealthRecord from '../healthRecord/healthRecord'
import OperateRecord from '../operateRecord/operateRecord'

const {Sider, Header, Content} = Layout;
const {SubMenu, Item} = Menu;

class MainHome extends Component {
    constructor (props) {
        super(props);
        console.log('routers',this.props.match);
        this.handleClicks = this.handleClick.bind(this);
        this.state = {
            selectNav: 'storeInfo'
        }
    }
    setDefaultSelect () {

    }
    handleClick (e) {
        console.log('e',e);
        console.log('props',this.props);
        this.setState({
            selectNav: e.key
        })
    }
    changeSelect (data) {
        console.log(data);
        if (data.location.pathname === data.match.path) return;
        const nowPath = data.location.pathname.split(data.match.path + '/');
        const nowSelect = nowPath[1].split('/')[0];
        this.setState({
            selectNav: nowSelect
        });
    }
    componentDidMount () {
        this.props && this.changeSelect(this.props);
    }
    render () {
        return (
            <Layout className="main_home">
                <Sider className={"main_left"}>
                    <div className="logo" />
                    <Menu theme="dark"
                          defaultOpenKeys={['store']}
                          defaultSelectedKeys={['storeInfo']}
                          selectedKeys={[this.state.selectNav]}
                          onClick={this.handleClicks}
                          mode="inline">
                        <SubMenu key="store" title="库存">
                            <Item key="storeInfo"><Link to='/auth/main/storeInfo'>库存信息</Link></Item>
                            <Item key="storeHistory"><Link to='/auth/main/storeHistory' key="storeHistory">库存记录</Link></Item>
                        </SubMenu>
                        <SubMenu key="device" title="设备信息">
                            <Item key="deviceMachine"><Link to='/auth/main/deviceMachine'>机器</Link></Item>
                            <Item key="deviceEquip"><Link to='/auth/main/deviceEquip'>配件</Link></Item>
                            <Item key="deviceUseHistory"><Link to='/auth/main/deviceUseHistory'>领用/归还记录</Link></Item>
                        </SubMenu>
                        <Item key="userManage"><Link to='/auth/main/userManage'>用户管理</Link></Item>
                        <Item key="healthRecord"><Link to='/auth/main/healthRecord'>健康记录</Link></Item>
                        <Item key="operateRecord"><Link to='/auth/main/operateRecord'>操作记录</Link></Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="main_header" style={{background: '#fff'}}>
                        <div className="header_user">
                            admin
                            <i className="iconfont icon-logout"></i>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px 0', display: 'flex', alignItems: 'stretch'}}>
                        <div className="main_content" style={{flex: 1, backgroundColor: '#fff'}}>
                            <Switch>
                                <Route path={`${this.props.match.path}/storeInfo`} component={StoreInfo}/>
                                <Route path={`${this.props.match.path}/storeHistory`} component={InventoryHistory}/>
                                <Route path={`${this.props.match.path}/deviceMachine`} component={DeviceMachine}/>
                                <Route path={`${this.props.match.path}/deviceEquip`} component={DeviceEquip}/>
                                <Route path={`${this.props.match.path}/deviceUseHistory`} component={UseHistory}/>
                                <Route path={`${this.props.match.path}/userManage`} component={UserManage}/>
                                <Route path={`${this.props.match.path}/healthRecord`} component={HealthRecord}/>
                                {/*<AuthRoute path={`${this.props.match.path}/userManage`} component={UserManage}/>
                                <AurhRoute path={`${this.props.match.path}/healthRecord`} component={HealthRecord}/>*/}
                                <Route path={`${this.props.match.path}/operateRecord`} component={OperateRecord}/>
                                <Redirect to={`${this.props.match.path}/storeInfo`}/>
                            </Switch>
                            {/*{this.props.routes.map((route,i) => (
                                <RouteWithSubRoutes key={i} {...route}/>
                            ))}*/}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default MainHome