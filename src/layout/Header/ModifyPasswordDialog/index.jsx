import { useState, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { subscribe, unsubscribe } from 'pubsub-js'
import { password } from '../../../utils/validate'
import { handleModifyPassword } from '../../../apis/peopleModule'
import history from '../../../routes/history'
import { useNavigate } from 'react-router-dom'

export default function ModifyPasswordDialog() {

  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [instanceForm] = Form.useForm()

  async function handleOk() {
    const value = await instanceForm.validateFields();

    if (value.newPassword !== value.confirmPassword) {
      return message.warn("确认密码和新密码不一致")
    }

    await handleModifyPassword(value);

    handleCancel()

    navigate('/login')

    message.success("修改密码成功，请进行重新登录")
  }

  function handleCancel() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const token = subscribe("handleOpenModifyPasswordDialogOfPubSub", () => {
      setIsModalOpen(true)
    })

    return () => {
      unsubscribe(token)
    }
  }, [])

  return (
    <Modal title="修改密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={instanceForm}
        labelCol={{ span: 5 }}
        autoComplete="off"
      >
        <Form.Item
          label="原密码"
          name="oldPassword"
          rules={password}
        >
          <Input.Password placeholder='你输入原密码' />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={password}
        >
          <Input.Password placeholder='你输入新密码' />
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          rules={password}
        >
          <Input.Password placeholder='你重复输入密码' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
