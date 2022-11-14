import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { publish, subscribe, unsubscribe } from 'pubsub-js';
import { handleEditSubjectRequest } from '../../../../apis/examinationModule';
import CustomForm from '../Form';
import { TURN_ON_DIALOG } from '../../../../utils/PubSubAllName';

const EditSubjectDialog = (props) => {

  const [instanceForm] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState();

  const handleOk = async () => {
    const value = await instanceForm.validateFields()
    await handleEditSubjectRequest(id, value.name)
    handleCancel()
    publish("HandleTableListByPubSub")
    message.success("编辑成功")
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    instanceForm.setFieldValue('name', '')
  }

  useEffect(() => {
    const token = subscribe(TURN_ON_DIALOG, (_, record) => {
      const { id, name } = record
      setIsModalOpen(true)
      instanceForm.setFieldValue('name', name)
      setId(id)
    })

    return () => {
      unsubscribe(token)
    }
  }, []);

  return (
    <CustomForm title="编辑科目" onCancel={handleCancel} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onOk={handleOk} instanceForm={instanceForm} />
  );
}

export default EditSubjectDialog;
