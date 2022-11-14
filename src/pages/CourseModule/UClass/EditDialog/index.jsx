import React, { useState } from 'react';
import { Form, message } from 'antd';
import PubSub from 'pubsub-js'
import { connect } from 'react-redux'
import moment from 'moment'
import { handleEditClassRequest } from '../../../../apis/courseModule';
import CustomForm from '../Form';

const EditDialog = (props) => {

  const [instanceForm] = Form.useForm()

  const [id, setId] = useState('');
  const [editStatus, setEdit] = useState(false);

  async function handleOnFinish() {

    const { pagination: { pageSize, currentPage }, search } = props.editStateOfStore;
    const value = await instanceForm.validateFields()
    await handleEditClassRequest(id, value);
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
    const { name, type, status, startDate, finishDate, id } = value
    setEdit(true)
    setId(id)
    instanceForm.setFieldsValue({
      name,
      type,
      status,
      learningCycle: [moment(startDate, 'YYYY/MM/DD'), moment(finishDate, 'YYYY/MM/DD')]
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
      title="编辑班级信息"
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