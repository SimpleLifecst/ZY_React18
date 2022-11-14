import React from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

export default function TableButtonGroup(props) {

  const { addBtnClick, addBtnTitile } = props;

  return (
    <div className='table-button-group'>
      <Space>
        {
          addBtnClick ? <Button onClick={addBtnClick} type='primary' icon={<PlusOutlined />}>{addBtnTitile}</Button> : ''
        }
        {/* <Button icon={<RedoOutlined />}>重置</Button> */}
        {
          props.children
        }
      </Space>
    </div>
  )
}

TableButtonGroup.propTypes = {
  addBtnClick: PropTypes.func.isRequired,
}

TableButtonGroup.defaultProps = {
  addBtnTitile: "新增"
}