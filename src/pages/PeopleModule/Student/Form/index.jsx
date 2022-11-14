import React from 'react'
import { Modal, Form, Input, Radio, InputNumber } from 'antd';
import { Gender } from '../../../../utils/constant';
import { validateStudentForm } from '../../../../utils/validate';

const layout = {
  labelCol: {
    span: 4,
  }
};

export default function CustomForm(props) {
  const { form, initialValues } = props;

  return (
    <Modal
      {...props}
      destroyOnClose
    >
      <Form autoComplete='off' form={form} initialValues={initialValues} {...layout} preserve={false}>
        <Form.Item name="name" label="姓名" rules={validateStudentForm.name}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别" rules={validateStudentForm.gender}>
          <Radio.Group>
            <Radio value={Gender.male}>男</Radio>
            <Radio value={Gender.female}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="age" label="年龄" rules={validateStudentForm.age}>
          <InputNumber min={1} max={99} />
        </Form.Item>
        <Form.Item name="phoneNumber" label="手机号" rules={validateStudentForm.phoneNumber}>
          <Input />
        </Form.Item>
        <Form.Item name="idNumber" label="身份证号" rules={validateStudentForm.idNumber}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>

  )
}

CustomForm.defaultProps = {
  initialValues: { name: "123", gender: 1, age: 18, phoneNumber: "18270893930", idNumber: "123" }
}