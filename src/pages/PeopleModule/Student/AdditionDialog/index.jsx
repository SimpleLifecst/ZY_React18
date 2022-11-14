import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { handleAdditionStudentRequest } from '../../../../apis/peopleModule';
import PubSub from 'pubsub-js'
import CustomForm from '../Form';

const AdditionDialog = props => {

  const [instanceForm] = Form.useForm()

  const { updateList, isModelShow, setAddition } = props

  const [search, setSearch] = useState();

  async function handleOnFinish() {
    search.setFieldValue('q', '');
    const value = await instanceForm.validateFields()
    await handleAdditionStudentRequest(value);
    updateList();
    handleClose();
    message.success("新增成功");
  }

  const handleClose = () => {
    setAddition(false)
  }

  useEffect(() => {
    const token = PubSub.subscribe("searchInput", (_, value) => {
      setSearch(value)
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <CustomForm
      title="新增学生"
      open={isModelShow}
      onOk={handleOnFinish}
      onCancel={handleClose}
      form={instanceForm} 
    />
  )
}

export default AdditionDialog