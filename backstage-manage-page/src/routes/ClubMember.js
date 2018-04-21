/**
 * 2018-04-19 Jifeng Cheng
 * 
 * 社团成员管理
 */

import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';

class ClubMember extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'members/getMembers'
    })
  }
  state={
    loading: true,
    loadMore: false,
  }
  render() {
    const { data, loading } = this.props;
    const { loadMore } = this.state.loading;
    console.log('data++++++++', data);
    console.log('loading++++++', loading);
    return (
      <List
        loading={loading}
        dataSource={data}
        itemLayout="horizontal"
        loadMore={loadMore}
        renderItem={item => (
          <List.Item actions={[<a>修改</a>, <a>删除</a>]}>
            <List.Item.Meta
              // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.level}
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ margin: 15 }}>{item.sex}</div>
              <div style={{ margin: 15 }}>{item.studentNumber}</div>
              <div>{item.class}</div>
            </div>
          </List.Item>
        )}
      />
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.members,
  data: state.members.data,
}))(ClubMember);
