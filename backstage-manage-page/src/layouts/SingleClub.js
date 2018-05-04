/**
 * 2018-05-02 Jifeng Cheng
 * 社团单独管理页面
 */

import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link } from 'dva/router';
import { connect } from 'dva';

import styles from './BasicLayout.less';
import Activities from '../routes/Club/Activities';
import ApplyFor from '../routes/Club/ApplyFor';
import Members from '../routes/Club/Members';
import Public from '../routes/Club/Public';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SingleClub extends React.Component {
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
              <h1>次级权限</h1>
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>成员管理</span></span>}
            >
              <Menu.Item key="1">
                <Link to="/club/applyFor">入会申请</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to='/club/members'>成员一览</Link>
              </Menu.Item>
              <Menu.Item key="3">暂定</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>社团活动管理</span></span>}
            >
              <Menu.Item key="4">
                <Link to="/club/public">活动发布</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/club/activities">活动一览</Link>
              </Menu.Item>
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
                <Route path="/club/applyFor" render={() => <ApplyFor />} />
                <Route path="/club/members" render={() => <Members />} />
                <Route path="/club/public" render={() => <Public />} />
                <Route path="/club/activities" render={() => <Activities />} />
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

export default connect(state => ({
  status: state.login.status,
}))(SingleClub);
