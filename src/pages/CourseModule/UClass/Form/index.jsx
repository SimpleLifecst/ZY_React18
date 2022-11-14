import React from 'react'
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { validateClassForm } from '../../../../utils/validate';
import { ClassType, ClassStatus } from '../../../../utils/constant';

const layout = {
  labelCol: {
    span: 4,
  }
};

export default function CustomForm(props) {
  const { form } = props;

  return (
    <Modal {...props} destroyOnClose>
      <Form autoComplete='off' form={form} {...layout} preserve={false}>
        <Form.Item name="name" label="名称" rules={validateClassForm.name}>
          <Input placeholder='你输入班级名称'/>
        </Form.Item>
        <Form.Item name="type" label="类型" rules={validateClassForm.type}>
          <Select placeholder="你选择班级类型">
            {
              ClassType.map(i => <Select.Option key={i.type} value={i.type}>{i.name}</Select.Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item name="learningCycle" label="学习周期" rules={validateClassForm.learningCycle}>
          <DatePicker.RangePicker style={{width: "100%"}}/>
        </Form.Item>
        <Form.Item name="status" label="状态" rules={validateClassForm.status}>
          <Select placeholder="请选择班级状态">
            {
              ClassStatus.map(i => <Select.Option key={i.status} value={i.status}>{i.label}</Select.Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

CustomForm.defaultProps = {
  // initialValues: {  }
}