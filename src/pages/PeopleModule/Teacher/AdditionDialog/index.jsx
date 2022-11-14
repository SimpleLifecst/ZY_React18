import React from 'react';
import { Form, message } from 'antd';
import { handleAdditionTeacherRequest } from '../../../../apis/peopleModule';
import PubSub from 'pubsub-js'
import CustomForm from '../Form';

const AdditionDialog = (props) => {
  const [instanceForm] = Form.useForm()

  const { updateList, isModelShow, setAddition } = props
  const [search, setSearch] = React.useState();

  async function handleOnFinish() {
    search.setFieldValue('q', '');
    const value = await instanceForm.validateFields()
    await handleAdditionTeacherRequest(value);
    updateList();
    handleClose();
    message.success("新增成功");
  }

  const handleClose = () => {
    setAddition(false)
  }

  React.useEffect(() => {
    const token = PubSub.subscribe("searchInput", (_, value) => {
      setSearch(value)
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [])

  return (
    <CustomForm
      title="新增老师"
      open={isModelShow}
      onOk={handleOnFinish}
      onCancel={handleClose}
      form={instanceForm}
      disabledPasswordInput
    />
  )
}

export default AdditionDialog