/**
 * 2018-04-19 Jifeng Cheng
 * 
 * 社团成员管理
 */

import React from 'react';
import { connect } from 'dva';
import { List, Form, Input, Modal, Radio } from 'antd';

const FormItem = Form.Item;

const ModifyModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="社团成员信息修改"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          maskStyle={{ opacity: 0.2 }}
        >
          <Form layout="vertical">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: '请输入姓名！'}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: this.props.sex
              })(
                <Radio.Group>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </Radio.Group>
              )
              }
            </FormItem>
            <FormItem label="学号">
              {getFieldDecorator('studentNumber', {
                initialValue: this.props.studentNumber,
                rules: [{ required: true, message: '请输入学号！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="班级">
              {getFieldDecorator('class', {
                initialValue: this.props.class,
                rules: [{ required: true, message: '请输入班级！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="社团">
              {getFieldDecorator('club', {
                initialValue: this.props.club,
                rules: [{ required: true, message: '请输入社团名！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="职务">
              {getFieldDecorator('level', {
                initialValue: this.props.level,
                rules: [{ required: true, message: '请输入职务！'}]
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)
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

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  handleCreate = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      console.log('Received values of form: ', values);
      this.props.dispatch({
        type: 'members/modifyMember',
        payload: values
      })
      console.log('modifyData>>>>>>', this.state.modifyData);
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
              wrappedComponentRef={this.saveFormRef}
              name={data[this.state.index].name}
              level={data[this.state.index].level}
              sex={data[this.state.index].sex}
              studentNumber={data[this.state.index].studentNumber}
              class={data[this.state.index].class}
              club={data[this.state.index].club}
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
