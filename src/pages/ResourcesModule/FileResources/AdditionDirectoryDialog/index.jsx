import React from 'react';
import { Form, Input, message, Modal } from 'antd';
import { publish } from 'pubsub-js';
import { handleAddResource } from '../../../../apis/resourcesModule';

const AdditionDirectoryDialog = (props) => {

  const { parentId, updateList } = props

  const [instanceForm] = Form.useForm()

  const { isModalOpen, setIsModalOpen } = props;

  const handleCancel = () => {
    setIsModalOpen(false)
    instanceForm.setFieldValue('name','')
  }

  const handleOk = async () => {
    const value = await instanceForm.validateFields()
    await handleAddResource({ parentId, type: "DIRECTORY", ...value })

    publish('ClearFilterSearcherValueByPubSub')

    updateList(parentId)
    handleCancel()
    message.success("新建成功")
  }

  return (
    <Modal title="新建文件夹" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={instanceForm} autoComplete="off">
        <Form.Item name='name' rules={[{ required: true, message: "文件夹名称不能为空" }]}>
          <Input placeholder='请输入文件夹名称' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AdditionDirectoryDialog;
