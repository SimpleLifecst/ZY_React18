import { useState, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { subscribe, unsubscribe } from 'pubsub-js'
import { password } from '../../../../utils/validate'
import { handleResetPassword } from '../../../../apis/peopleModule'

export default function ResetPasswordDialog() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [id, setId] = useState('')
  const [instanceForm] = Form.useForm()

  async function handleOk() {
    const value = await instanceForm.validateFields();

    if (value.newPassword !== value.confirmPassword) {
      return message.warn("确认密码和新密码不一致")
    }

    await handleResetPassword(id, value);

    handleCancel()
  
    message.success("重置密码成功")
  }

  function handleCancel() {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const token = subscribe("handleOpenResetPasswordDialog", (_, record) => {
      setId(record.userId)
      setIsModalOpen(true)
    })

    return () => {
      unsubscribe(token)
    }
  }, [])

  return (
    <Modal title="重置密码" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        form={instanceForm}
        labelCol={{ span: 5 }}
        autoComplete="off"
      >
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={password}
        >
          <Input.Password placeholder='你输入新密码'/>
        </Form.Item>

        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          rules={password}
        >
          <Input.Password placeholder='你重复输入密码'/>
        </Form.Item>
      </Form>
    </Modal>
  )
}
