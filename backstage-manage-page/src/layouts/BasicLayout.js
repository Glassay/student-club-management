/**
 * 2018-04-19 Jifeng Cheng
 * 
 * 后台管理主界面
 */

import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './BasicLayout.less';
import Users from '../routes/Users';
import ClubMember from '../routes/ClubMember';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;



class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo}>
            <Link to="/">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/iwWyPinUoseUxIAeElSx.svg" alt="logo" />
              <h1>社团管理系统</h1>
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>用户管理</span></span>}
            >
              <Menu.Item key="1">
                <Link to="/management/users">登录账户管理</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/management/members">社团成员管理</Link>
              </Menu.Item>
              <Menu.Item key="3">暂定</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>社团管理</span></span>}
            >
              <Menu.Item key="4">活动一览</Menu.Item>
              <Menu.Item key="5">信息管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <Menu theme="dark" mode="horizontal">
              <SubMenu
                style={{
                  float: 'right',
                  right: 20,
                  top: 8
                }}
                title={
                  <span>
                    <Icon type="user" />
                    管理员
                  </span>
                }
              >
                <Menu.Item key="logout">
                  退出登录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>用户管理</Breadcrumb.Item>
              <Breadcrumb.Item>社团管理</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
              <Switch>
                <Route path="/management/users" render={() => <Users/>} />
                <Route path="/management/members" render={() => <ClubMember/>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright ©2018 Created by Jifeng Cheng
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
