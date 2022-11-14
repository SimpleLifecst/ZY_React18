import React from 'react'
import { Pagination,Tag } from 'antd';

export default function CustomPagination(props) {
  const { list: { totalElements, size, number }, updateList } = props;

  return (
    <Pagination
      style={{"marginTop": "20px"}}
      className={props.className}
      onChange={updateList}
      showSizeChanger
      total={totalElements}
      showTotal={total => <Tag style={{padding: "4.5px",marginTop: "1px"}} color="processing">总数{total}</Tag>}
      pageSize={size}
      current={number + 1}
    />
  )
}
