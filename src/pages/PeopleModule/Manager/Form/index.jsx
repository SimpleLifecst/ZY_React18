import React from 'react'
import { Modal, Form, Input, Select } from 'antd';
import { validateManagerForm } from '../../../../utils/validate';
import { roleTypeOfManager } from '../../../../utils/constant';

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
        <Form.Item name="name" label="姓名" rules={validateManagerForm.name}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="账号" rules={validateManagerForm.username}>
          <Input />
        </Form.Item>
        {
          disabledPasswordInput ? (
            <Form.Item name="password" label="密码" rules={validateManagerForm.password}>
              <Input />
            </Form.Item>
          ) : ''
        }
        <Form.Item name="phoneNumber" label="手机号" rules={validateManagerForm.phoneNumber}>
          <Input />
        </Form.Item>
        <Form.Item name="roleId" label="角色" rules={validateManagerForm.roleId}>
          <Select>
            {
              roleTypeOfManager.map(item => {
                return <Select.Option key={item.roleId} value={item.roleId}>{item.roleName}</Select.Option>
              })
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

CustomForm.defaultProps = {
  initialValues: { name: "root", password: '123456', phoneNumber: "18270893930", username: "12312313", roleId: "1" }
}