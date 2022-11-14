import React from 'react'
import { Button, Popconfirm } from 'antd'

export default function CustomPopconfirm(props) {

  const { title, handleDelete, deleteBtnTitle } = props;

  const confirm = () => {
    handleDelete()
  }

  return (
    <Popconfirm
      title={title}
      onConfirm={confirm}
      forceRender={true}
    >
      <Button danger>{deleteBtnTitle}</Button>
    </Popconfirm>
  )
}

CustomPopconfirm.defaultProps = {
  title: "你确定要执行该操作吗",
  deleteBtnTitle: "删除"
}
