import React from 'react'
import { Button, Space, Row, Col } from 'antd'
import { publish } from 'pubsub-js'
import { CLEAR_SEARCHER_VALUE } from '../../../../utils/PubSubAllName'
import { InfoCircleOutlined } from '@ant-design/icons'

const Style = {"paddingLeft": "15px"}

const AdditionQuestionButtonGroup = (props) => {

  const handleResetSearcherValue = () => {
    publish(CLEAR_SEARCHER_VALUE)
  }

  return (
    <div>
      <Row justify="start" style={Style}>
        <Col>
          <Button type='danger' icon={<InfoCircleOutlined />} onClick={handleResetSearcherValue}>重置</Button>
        </Col>
      </Row>
      <Row justify="start" style={Style}>
        <Col style={{ marginTop: "24px" }}>
          <Space size='small'>
            <Button>添加单选题</Button>
            <Button>添加多选题</Button>
            <Button>添加简答题</Button>
            <Button>添加判断题</Button>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(AdditionQuestionButtonGroup)