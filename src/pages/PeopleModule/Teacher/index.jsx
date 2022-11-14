import React, { useEffect } from 'react'
import AdditionDialog from './AdditionDialog'
import EditDialog from './EditDialog'
import List from '../../../components/List'
import { handleTeacherListRequest } from '../../../apis/peopleModule'
import { columnsOfTeacher } from '../table'
import { connect } from 'react-redux'
import { pagination } from '../../../redux/actions'
import PubSub, { unsubscribe } from 'pubsub-js'

const Teacher = (props) => {

  const { paginationState: { pageSize, currentPage }, search } = props

  const [list, setList] = React.useState({ tableList: [], totalElements: 0, size: 10, number: 0 });

  const [addition, setAddition] = React.useState(false);

  async function getTableList(params) {
    const { data: { content, totalElements, size, number } } = await handleTeacherListRequest({ size: pageSize || 10, ...params })
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

  function openAdditionDialog() {
    setAddition(true)
  }

  useEffect(() => {
    const token = PubSub.subscribe("handleDisableOrRecoverOfPubSub", () => {
      getTableList({
        size: pageSize,
        page: currentPage,
        q: search
      })
    })

    return () => {
      unsubscribe(token)
    }
  }, [search])

  useEffect(() => {
    getTableList()

  }, [])

  return (
    <div>
      {/* 数据列表 */}
      <List
        list={list}
        openAdditionDialog={openAdditionDialog}
        columns={columnsOfTeacher}
        updateList={getTableList}
        tip={'你输入姓名/手机号进行筛选查询'}
      />

      {/* 新增对话框 */}
      <AdditionDialog
        updateList={getTableList}
        isModelShow={addition}
        setAddition={setAddition}
      />

      {/* 编辑信息对话框 */}
      <EditDialog
        updateList={getTableList}
      />
    </div>
  )
}

export default connect(({ pagination, search }) => ({ paginationState: pagination, search }), {
  pagination
})(Teacher)