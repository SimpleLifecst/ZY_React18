import React from 'react'
import AdditionDialog from './AdditionDialog'
import List from '../../../components/List'
import { handleStudentListRequest } from '../../../apis/peopleModule'
import { columnsOfStudent } from '../table'
import EditDialog from './EditDialog'
import { connect } from 'react-redux'
import { pagination } from '../../../redux/actions'

const Student = (props) => {

  const {paginationState: {pageSize}} = props

  const [list, setList] = React.useState({ tableList: [], totalElements: 0, size: 10, number: 0 });

  const [addition, setAddition] = React.useState(false);

  async function getTableList(params) {
    const { data: { content, totalElements, size, number } } = await handleStudentListRequest({size: pageSize || 10,...params})
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
  }, [])

  return (
    <div>
      {/* 数据列表 */}
      <List
        list={list}
        openAdditionDialog={openAdditionDialog}
        columns={columnsOfStudent}
        updateList={getTableList}
      />

      {/* 新增学生对话框 */}
      <AdditionDialog
        updateList={getTableList}
        isModelShow={addition}
        setAddition={setAddition}
      />

      {/* 编辑学生信息对话框 */}
      <EditDialog
        updateList={getTableList}
      />
    </div>
  )
}

export default connect(({pagination}) => ({ paginationState: pagination }), {
  pagination
})(Student)