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
      type: 'members/getMembers',
    })
  }

  handleDelete = (id) => {
    console.log('id>>>>>>>', id);
    this.props.dispatch({
      type: 'members/deleteMember',
      payload: id
    })
  }
  render() {
    const { data, loading, current } = this.props;
    const paginationProps = {
      pageSize: 5,
      count: 5,
      total: 100,
      current: current,
      onChange: (page) => {
        this.props.dispatch({
            type: 'members/changeCurrent',
            payload: page,
        });
      },
    }
    return (
      <List
        loading={loading}
        dataSource={data.slice((current - 1) * 7, current * 7)}
        itemLayout="horizontal"
        size="small"
        pagination={paginationProps}
        renderItem={item => (
          <List.Item actions={[<a>修改</a>, <a onClick={() => this.handleDelete(item.id)}>删除</a>]}>
            <List.Item.Meta
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
  current: state.members.current,
}))(ClubMember);
