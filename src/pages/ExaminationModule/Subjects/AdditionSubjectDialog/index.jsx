import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { publish, subscribe, unsubscribe } from 'pubsub-js';
import { handleAddSubjectRequest } from '../../../../apis/examinationModule';
import CustomForm from '../Form';
import { CLEAR_SEARCHER_VALUE } from '../../../../utils/PubSubAllName';

const AdditionSubjectDialog = (props) => {

  const [instanceForm] = Form.useForm()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const value = await instanceForm.validateFields()
    await handleAddSubjectRequest(value)
    handleCancel()
    publish(CLEAR_SEARCHER_VALUE)
    publish("HandleTableListByPubSub","")
    message.success("新增成功")
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    instanceForm.setFieldValue('name', '')
  }

  useEffect(() => {
    const token = subscribe("HandleOpenAdditionSubjectDialog", () => {
      setIsModalOpen(true)
    })

    return () => {
      unsubscribe(token)
    }
  }, []);

  return (
    <CustomForm title="新增科目" onCancel={handleCancel} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onOk={handleOk} instanceForm={instanceForm} />
  );
}

export default AdditionSubjectDialog;
