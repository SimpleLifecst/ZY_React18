import React from 'react'
import { Modal, Form, Input } from 'antd';
import { validateTeacherForm } from '../../../../utils/validate';

const layout = {
  labelCol: {
    span: 4,
  }
};
export default function CustomForm(props) {
  const { form, initialValues, disabledPasswordInput } = props;

  return (
    <Modal {...props} destroyOnClose>
      <Form autoComplete='off' form={form} initialValues={initialValues} {...layout} preserve={false}>
        <Form.Item name="name" label="姓名" rules={validateTeacherForm.name}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="账号" rules={validateTeacherForm.username}>
          <Input />
        </Form.Item>
        {
          disabledPasswordInput ? (
            <Form.Item name="password" label="密码" rules={validateTeacherForm.password}>
              <Input />
            </Form.Item>
          ) : ''
        }
        <Form.Item name="phoneNumber" label="手机号" rules={validateTeacherForm.phoneNumber}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

CustomForm.defaultProps = {
  initialValues: { name: "李逵", password: '131654165156', phoneNumber: "18270893930", username: "12312313" }
}