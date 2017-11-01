import React, {Component} from 'react'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'

import './style.styl'

import {RouteWithSubRoutes} from '../../common/component'
import StoreInfo from '../inventory/info'

const {Sider, Header, Content} = Layout;
const {SubMenu, Item} = Menu;


class MainHome extends Component {
    constructor (props) {
        super(props);
        this.handleClick.bind(this)
    }
    handleClick (e) {
        console.log(e);
        console.log(this.props)
    }
    render () {
        return (
            <Layout className="main_home">
                <Sider className={"main_left"}>
                    <div className="logo" />
                    <Menu theme="dark"
                          defaultOpenKeys={['store']}
                          defaultSelectedKeys={['store_info']}
                          onClick={this.handleClick}
                          mode="inline">
                        <SubMenu key="store" title="库存">
                            <Item key="store_info"><Link to='/storeinfo/info'>库存信息</Link></Item>
                            <Item key="store_history"><Link to='/storeinfo/asd'>库存记录</Link></Item>
                        </SubMenu>
                        <SubMenu key="device" title="设备信息">
                            <Item key="device_machine">机器</Item>
                            <Item key="device_equip">配件</Item>
                            <Item key="device_lend_return_history">领用/归还记录</Item>
                        </SubMenu>
                        <Item key="user_manage">用户管理</Item>
                        <Item key="health_history">健康记录</Item>
                        <Item key="operate_history">操作记录</Item>
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
                            {/*<StoreInfo></StoreInfo>*/}
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