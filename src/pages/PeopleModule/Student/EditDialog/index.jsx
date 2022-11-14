import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Form, message } from 'antd';
import { handleEditStudentRequest } from '../../../../apis/peopleModule';
import PubSub from 'pubsub-js'
import CustomForm from '../Form';

const EditDialog = props => {

  const [instanceForm] = Form.useForm()

  const [id, setId] = useState('');
  const [editStatus, setEdit] = useState(false);

  async function handleOnFinish() {
    const { pagination: { pageSize, currentPage }, search } = props.editStateOfStore;
    const value = await instanceForm.validateFields()
    await handleEditStudentRequest(id, value);
    props.updateList({
      page: currentPage,
      size: pageSize,
      q: search
    });
    handleClose();
    message.success("编辑成功");
  }

  const handleClose = () => {
    setEdit(false)
  }

  function openEditDialog(_, value) {
    const { name, age, gender, idNumber, phoneNumber, id } = value
    setEdit(true)
    setId(id)
    instanceForm.setFieldsValue({
      name,
      age,
      gender: Number(gender),
      idNumber,
      phoneNumber
    })
  }

  useEffect(() => {
    const token = PubSub.subscribe("handleEditOfPubSub", openEditDialog)
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <CustomForm
      title="编辑学生信息"
      open={editStatus}
      onOk={handleOnFinish}
      onCancel={handleClose}
      form={instanceForm}
    />
  )
}

export default connect((state) => {
  return {
    editStateOfStore: state
  }
}, {})(EditDialog)