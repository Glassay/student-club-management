/**
 * 2018-04-20 Jifeng Cheng
 */

import React from 'react';
import { Layout, Button } from 'antd';

import styles from './BasicLayout.less';

const { Content } = Layout;

class WelcomePage extends React.Component {
  render() {
    return (
      <Layout className={styles.layout}>
        <Content className={styles.bgimage}>
          <h1>欢迎使用，请选择登录权限</h1>
        </Content>
      </Layout>
    );
  }
}

export default WelcomePage;
