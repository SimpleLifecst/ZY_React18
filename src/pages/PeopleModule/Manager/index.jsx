import React from 'react'
import AdditionDialog from './AdditionDialog'
import EditDialog from './EditDialog'
import List from '../../../components/List'
import { handleManagerListRequest } from '../../../apis/peopleModule'
import { columnsOfManager } from '../table'
import { connect } from 'react-redux'
import { pagination } from '../../../redux/actions'
import PubSub, { unsubscribe } from 'pubsub-js'
import ResetPasswordDialog from './ResetPasswordDialog'

const Manager = (props) => {

  const { paginationState: { pageSize, currentPage }, search } = props

  const [list, setList] = React.useState({ tableList: [], totalElements: 0, size: 10, number: 0 });

  const [addition, setAddition] = React.useState(false);

  async function getTableList(params) {
    const { data: { content, totalElements, size, number } } = await handleManagerListRequest({ size: pageSize || 10, ...params })
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    getTableList()
  }, [])

  return (
    <div>
      {/* 数据列表 */}
      <List
        list={list}
        openAdditionDialog={openAdditionDialog}
        columns={columnsOfManager}
        updateList={getTableList}
        tip="请输入姓名的筛选条件"
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

      {/* 重置密码对话框 */}
      <ResetPasswordDialog />
    </div>
  )
}

export default connect(({ pagination, search }) => ({ paginationState: pagination, search }), {
  pagination
})(Manager)