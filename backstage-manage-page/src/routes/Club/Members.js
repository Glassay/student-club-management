/**
 * 2018-05-02 Jifeng Cheng
 * 社团成员信息
 */

import React from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'dva';

class Members extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'members/getAllMember'
    })
  }

  render() {
    const { loading, data } = this.props;
    console.log('cccccccccc', data);
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    }, {
      title: '学号',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    }, {
      title: '社团',
      dataIndex: 'club',
      key: 'club',
    }, {
      title: '职务',
      dataIndex: 'level',
      key: 'level',
    }, {
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
  loading: state.loading.models.members,
  data: state.members.data,
}))(Members);
