/**
 * 2018-04-19 Jifeng Cheng
 * 
 * 管理人员账户管理
 */

import React from 'react';
import { connect } from 'dva';
import reqwest from 'reqwest';
import { List, Button, Spin, Avatar } from 'antd';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class Users extends React.Component {
  state = {
    loading: true,
    loadingMore: false,
    showLoadingMore: true,
    data: [],
  }
  componentDidMount() {
    this.getData((res) => {
      this.setState({
        loading: false,
        data: res.results,
      });
    });
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  onLoadMore = () => {
    this.setState({
      loadingMore: true,
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState({
        data,
        loadingMore: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  render() {
    const { loading } = this.props;
    const { loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
    return (
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={data}
        size="small"
        renderItem={item => (
          <List.Item actions={[<a>修改</a>, <a>删除</a>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="主席"
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ margin: 15 }}>{item.name.last}</div>
              <div style={{ margin: 15 }}>141909020102</div>
              <div>软件14k1</div>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.users,
}))(Users);
