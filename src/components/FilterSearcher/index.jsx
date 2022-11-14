import React from 'react';
import PropTypes from 'prop-types'
import { Form, Input } from 'antd';
import { subscribe, unsubscribe } from 'pubsub-js';
import { CLEAR_SEARCHER_VALUE } from '../../utils/PubSubAllName';

const FilterSearcher = (props) => {

  const { getSearchValue, loading, searchTip } = props;

  const [instanceForm] = Form.useForm()

  const onSearch = (value) => {
    getSearchValue(value)
  }

  React.useEffect(() => {
    const token = subscribe(CLEAR_SEARCHER_VALUE, () => {
      instanceForm.setFieldValue("q", '')
    })

    return () => {
      unsubscribe(token)
    }
  }, [])

  return (
    <Form autoComplete='off' form={instanceForm}>
      <Form.Item name='q'>
        <Input.Search
          allowClear
          size="large"
          onSearch={onSearch}
          placeholder={searchTip}
          loading={loading}
        />
      </Form.Item>
    </Form>
  );
}

FilterSearcher.propTypes = {
  getSearchValue: PropTypes.func.isRequired
}

FilterSearcher.defaultProps = {
  searchTip: "请输入条件筛选",
  loading: false,
}

export default FilterSearcher;