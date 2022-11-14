import React, { useState } from 'react';
import { Form, message } from 'antd';
import { handleEditTeacherRequest } from '../../../../apis/peopleModule';
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import CustomForm from '../Form';

const EditDialog = (props) => {

  const [instanceForm] = Form.useForm()

  const [id, setId] = useState('');
  const [editStatus, setEdit] = useState(false);

  async function handleOnFinish() {
    const { pagination: { pageSize, currentPage }, search } = props.editStateOfStore;
    const value = await instanceForm.validateFields()
    await handleEditTeacherRequest(id, value);
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
    const { name, username, phoneNumber, id } = value
    setEdit(true)
    setId(id)
    instanceForm.setFieldsValue({
      name,
      username,
      phoneNumber
    })
  }

  React.useEffect(() => {
    const token = PubSub.subscribe("handleEditOfPubSub", openEditDialog)
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <CustomForm
      title="编辑老师信息"
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