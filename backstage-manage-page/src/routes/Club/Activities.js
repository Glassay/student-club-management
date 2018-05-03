/**
 * 2018-05-02 Jifeng Cheng
 * 社团活动总览
 */

import React from 'react';
import { connect } from 'dva';
import { Table, Divider } from 'antd';

class Activities extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'activities/getActivities'
    })
  }

  handleDelete = (id) => {
    console.log('id>>>>>>', id);
    this.props.dispatch({
      type: 'activities/deleteActivities',
      payload: id
    })
  }
  render() {
    const { loading, data } = this.props;
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <a href="">{text}</a>,
    }, {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }, {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
    }, {
      title: '社团',
      dataIndex: 'club',
      key: 'club',
    }, {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render: text => <span>{text === 0 ? '审核中' : '通过'}</span>
    }, {
      title: '时间',
      dataIndex: 'create_at',
      key: 'create_at',
      render: text => text.slice(0, 10)
    },{
      render: (text, record) => (
        <span>
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record.id)}>删除</a>
          <Divider type="vertical" />
        </span>
      ),
    }];
    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.activities,
  data: state.activities.data
}))(Activities);
