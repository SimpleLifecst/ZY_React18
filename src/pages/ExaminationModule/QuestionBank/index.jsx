import { useState, useEffect, useCallback } from 'react'
import { Row, Col, Table } from 'antd'
import { columnsOfQuestionBank } from '../table'
import { handleQuestionBankListRequest } from '../../../apis/examinationModule'
import { pagination, searcher } from '../../../redux/actions'
import { connect } from 'react-redux'
import FilterSearcherGroup from './FilterSearcherGroup'
import AdditionQuestionButtonGroup from './AdditionQuestionButtonGroup'
import CustomPagination from '../../../components/Pagination'
import { subscribe, unsubscribe } from 'pubsub-js'
import { UPDATE_LIST } from '../../../utils/PubSubAllName'

const QuestionBank = (props) => {

  const { paginationState: { pageSize, currentPage }, searcher, searchState } = props

  const [list, setList] = useState({ tableList: [], totalElements: 0, size: 10, number: 0 });

  async function getTableList(params) {
    const { data: { content, totalElements, size, number } } = await handleQuestionBankListRequest({ size: pageSize || 10, ...params })
    setList({
      tableList: content,
      totalElements,
      size,
      number
    })
    props.pagination({
      pageSize: size,
      currentPage: number
    })
  }

  const paginationUpdatePageOfSize = (page, size) => {
    getTableList({ page: page - 1, size ,...searchState})
  }

  const getSearcherValue = (value) => {
    searcher(value)
    getTableList({ page: currentPage, size: pageSize, ...value })
  }

  const resetSearcherValue = () => {
    console.log(searchState);
  }

  useEffect(() => {
    const token = subscribe(UPDATE_LIST, () => {
      getTableList({ page: currentPage, size: pageSize, ...searchState })
    })

    return () => {
      unsubscribe(token)
    }
  },[searchState, currentPage, pageSize])

  useEffect(() => {
    getTableList()
  }, [])

  return (
    <div>
      <Row>
        <Col span={12}>
          <FilterSearcherGroup getSearcherValue={getSearcherValue}  pageSize={pageSize} reset={resetSearcherValue} />
        </Col>
        <Col span={12}>
          <AdditionQuestionButtonGroup />
        </Col>
      </Row>

      <Table pagination={false} columns={columnsOfQuestionBank} rowKey="id" dataSource={list.tableList} />

      <CustomPagination list={list} updateList={paginationUpdatePageOfSize} />
    </div>
  )
}

export default connect((state) => ({ paginationState: state.pagination, searchState: state.searcher }), {
  pagination,
  searcher
})(QuestionBank)