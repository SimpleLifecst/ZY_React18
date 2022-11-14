import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import PubSub from 'pubsub-js'

const FilterSearcher = (props) => {

  const { size, search, updateList } = props

  const [instanceForm] = Form.useForm()

  const [loading, setLoading] = React.useState(false);

  async function handleSearch(value) {

    setLoading(true)

    search(value)

    await updateList({ q: value, size })

    setLoading(false)
  }

  React.useEffect(() => {
    setTimeout(() => {
      PubSub.publish("searchInput", instanceForm)
    }, 100)
  }, [])

  return (
    <Form autoComplete='off' form={instanceForm}>
      <Form.Item name='q'>
        <Input.Search
          allowClear
          size="large"
          onSearch={handleSearch}
          placeholder={props.tip}
          loading={loading}
        />
      </Form.Item>
    </Form>
  )
}

FilterSearcher.propTypes = {
  updateList: PropTypes.func.isRequired
}

FilterSearcher.defaultProps = {
  tip: "你输入筛选条件"
}

export default FilterSearcher
