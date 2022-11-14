import React from 'react'
import AdditionDialog from './AdditionDialog'
import EditDialog from './EditDialog'
import List from '../../../components/List'
import { handleClassListRequest } from '../../../apis/courseModule'
import { columnsOfUClass } from '../table'
import { connect } from 'react-redux'
import { pagination } from '../../../redux/actions'
import PubSub, { unsubscribe } from 'pubsub-js'

const UClass = (props) => {

  const {paginationState: {pageSize, currentPage}, search} = props

  const [list, setList] = React.useState({ tableList: [], totalElements: 0, size: 10, number: 0 });

  const [addition, setAddition] = React.useState(false);

  async function getTableList(params) {
    const { data: { content, totalElements, size, number } } = await handleClassListRequest({size: pageSize || 10,...params})
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
    getTableList()
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
  }, [])

  return (
    <div>
      {/* 数据列表 */}
      <List
        list={list}
        openAdditionDialog={openAdditionDialog}
        columns={columnsOfUClass}
        updateList={getTableList}
        tip={'你输入班级名称进行筛选查询'}
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

export default connect(({pagination,search}) => ({ paginationState: pagination,search }), {
  pagination
})(UClass)