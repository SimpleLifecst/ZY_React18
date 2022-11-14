import React from 'react';
import { Form, Input } from 'antd';
import { subscribe, unsubscribe } from 'pubsub-js';

const FilterSearcher = (props) => {

  const { parentId, updateList } = props;

  const [loading, setLoading] = React.useState(false);
  const [instanceForm] = Form.useForm()

  const handleSearch = async (value) => {
    setLoading(true)

    await updateList(parentId, {q: value})

    setLoading(false)
  }

  React.useEffect(() => {
    const token = subscribe("ClearFilterSearcherValueByPubSub", () => {
      instanceForm.setFieldValue("q",'')
    })

    return () => {
      unsubscribe(token)
    }
  },[])

  return (
    <Form autoComplete='off' form={instanceForm}>
      <Form.Item name='q'>
        <Input.Search
          allowClear
          size="large"
          onSearch={handleSearch}
          placeholder="请输入文件名筛选"
          loading={loading}
        />
      </Form.Item>
    </Form>
  );
}

export default FilterSearcher;
