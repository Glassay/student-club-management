/**
 * 2018-04-19 Jifeng Cheng
 * 
 * 社团成员管理
 */

import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';

import ModifyModal from '../components/ModifyModal';

class ClubMember extends React.Component {
  state = {
    visible: false
  }

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

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleModify = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
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
          <List.Item actions={[<a onClick={this.showModal}>修改</a>, <a onClick={() => this.handleDelete(item.id)}>删除</a>]}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.level}
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ margin: 15 }}>{item.sex}</div>
              <div style={{ margin: 15 }}>{item.studentNumber}</div>
              <div style={{ margin: 15 }}>{item.class}</div>
              <div>{item.club}</div>
            </div>
            <ModifyModal
              wrappedComponentRef={this.saveFormRef}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
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
