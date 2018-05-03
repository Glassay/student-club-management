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
    visible: false,
    index: 0,
    modifyData: ''
  }

  componentDidMount() {
    console.log('current>>>>>>', this.props.current);
    this.props.dispatch({
      type: 'members/getMembers',
      payload: this.props.current
    })
  }

  handleDelete = (id) => {
    console.log('id>>>>>>>', id);
    this.props.dispatch({
      type: 'members/deleteMember',
      payload: id
    })
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      index: i
    })
    console.log('index>>>>>', i);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleModify = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // this.props.dispatch({
        //   type: 'login/adminLogin',
        //   payload: values,
        // })
        this.setState({
          modifyData: values
        })
        console.log('modifyData>>>>>>', this.state.modifyData);
      }
      form.resetFields();
      this.setState({
        visible: false
      })
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
        dataSource={data}
        itemLayout="horizontal"
        size="small"
        pagination={paginationProps}
        renderItem={(item, index) => (
          <List.Item actions={[<a onClick={() => this.showModal(index)}>修改</a>, <a onClick={() => this.handleDelete(item.id)}>删除</a>]}>
            <List.Item.Meta
              title={<a href="">{item.name}</a>}
              description={item.level}
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ margin: 15 }}>{item.sex}</div>
              <div style={{ margin: 15 }}>{item.studentNumber}</div>
              <div style={{ margin: 15 }}>{item.class}</div>
              <div>{item.club}</div>
            </div>
            <ModifyModal
              name={data[this.state.index].name}
              duty={data[this.state.index].level}
              sex={data[this.state.index].sex}
              studentNumber={data[this.state.index].studentNumber}
              class={data[this.state.index].class}
              club={data[this.state.index].club}
              visible={this.state.visible}
              onCancel={this.handleCancel}
              onCreate={this.handleModify}
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
