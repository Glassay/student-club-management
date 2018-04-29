/**
 * 2018-04-29 Jifeng Cheng
 * members 信息修改
 */

import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;

class ModifyModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="社团成员信息修改"
        okText="提交"
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
            {getFieldDecorator('duty', {
              initialValue: this.props.duty,
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

export default Form.create()(ModifyModal);
