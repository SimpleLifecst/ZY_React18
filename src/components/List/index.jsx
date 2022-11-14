import React from "react";
import PropTypes from 'prop-types';
import { Pagination, Table, Tag, Row, Col } from "antd";
import { connect } from 'react-redux'
import FilterSearcher from "./FilterSearcher";
import TableButtonGroup from "../TableButtonGroup";
import { pagination, search } from '../../redux/actions'

const List = (props) => {

  const { list: { tableList, totalElements, size, number }, listState, updateList, columns, openAdditionDialog } = props;

  const [loading, setLoading] = React.useState(true);

  function paginationUpdatePageOfSize(page, size) {

    props.pagination({
      pageSize: size,
      currentPage: page - 1
    })
    updateList({ page: page - 1, size, q: listState.search })
  }

  React.useEffect(() => {
    setLoading(false);

    return () => {
      setLoading(true)
    }
  }, [tableList])
  
  return (
    <div className='custom-component'>
      <Row>
        {/* 筛选查询 */}
        <Col span={12}>
          <FilterSearcher tip={props.tip} search={props.search} size={listState.pagination.pageSize} updateList={updateList} />
        </Col>
        {/* 按钮操作 */}
        <Col span={12}>
          <TableButtonGroup addBtnClick={openAdditionDialog} />
        </Col>
      </Row>

      <Table className="table-list" pagination={false} columns={columns} dataSource={tableList} loading={loading} rowKey="id" />

      <Pagination
        onChange={paginationUpdatePageOfSize}
        showSizeChanger
        total={totalElements}
        showTotal={total => <Tag style={{ padding: "4.5px", marginTop: "1px" }} color="processing">总数{total}</Tag>}
        pageSize={size}
        current={number + 1}
      />
    </div>
  )
}

List.propTypes = {
  list: PropTypes.object.isRequired
}

export default connect(
  state => ({listState: state }),
  {
    pagination,
    search
  }
)(List)