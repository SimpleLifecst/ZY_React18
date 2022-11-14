import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Space } from 'antd';
import { validateLoginForm } from "../../utils/validate";
import './index.scss'
import { handleLoginRequest } from '../../apis/login';
import { saveToken } from '../../utils/auth'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [instanceForm] = Form.useForm()

  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({ username: "teachingManager", password: "123456" });

  const navigate = useNavigate()

  async function onFinish(value) {
    setLoading(true)
    try {
      const { data } = await handleLoginRequest(value);
      saveToken(data.tokenId)
      navigate("/")
      sessionStorage.setItem('displayName', data.displayName)
      message.success(`${data.displayName} 欢迎您`)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
    // 测试登录
    // saveToken("false")
    // navigate("/")
  }

  return (
    <div className="login">
      <div className="main">
        <h1 className="title">React 后台管理项目</h1>
        <Form
          form={instanceForm}
          className="login-form"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={validateLoginForm.username}
          >
            <Input value="admin" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={validateLoginForm.password}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        <Space size="small">
          <span style={{ color: '#1890ff', fontWeight: "700" }}>点击测试账号切换：</span>
          <Button type="dashed" ghost onClick={() => instanceForm.setFieldsValue({ username: "teachingManager", password: "123456" })}>教务人员</Button>
          <Button type="dashed" ghost onClick={() => instanceForm.setFieldsValue({ username: "admin", password: "123456" })}>管理员</Button>
          <Button type="dashed" ghost onClick={() => instanceForm.setFieldsValue({ username: "1234567", password: "qq123456" })}>考务人员</Button>
        </Space>
      </div>
    </div>
  );
}