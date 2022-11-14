import React from 'react'
import { Spin, Alert } from 'antd'

export default function Loading() {
  return (
    <Spin tip="Loading...">
      <Alert
        message="页面加载"
        description="页面正在飞速加载, 请等待~~~"
        type="info"
      />
    </Spin>
  )
}
