import { useState, useEffect } from 'react'
import { Row, Col, Table } from 'antd'
import { columnsOfSubjects } from '../table';
import { handleSubjectListRequest } from '../../../apis/examinationModule';
import { publish, subscribe, unsubscribe } from 'pubsub-js';
import AdditionSubjectDialog from './AdditionSubjectDialog';
import TableButtonGroup from '../../../components/TableButtonGroup';
import EditSubjectDialog from './EditSubjectDialog';
import FilterSearcher from '../../../components/FilterSearcher';

export default function Subjects() {

  const [q, setQ] = useState('');
  const [tableLoading, setTableLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  const handleAddSubject = () => {
    publish("HandleOpenAdditionSubjectDialog")
  }

  const getTableList = async (q) => {
    setTableLoading(true)
    const { data } = await handleSubjectListRequest(q)
    setTableList(data)
    setTableLoading(false)
  }

  const handleGetSearchValue = async (q) => {
    setQ(q)
    setSearchLoading(true)
    await getTableList(q)
    setSearchLoading(false)
  }

  useEffect(() => {
    getTableList()

    const token = subscribe("HandleTableListByPubSub", (_, newQ = q) => {
      getTableList(newQ)
    })

    return () => {
      unsubscribe(token)
    }
  }, []);

  return (
    <>
      <Row>
        <Col span="12">
          <FilterSearcher getSearchValue={handleGetSearchValue} loading={searchLoading} />
        </Col>
        <Col span="12">
          <TableButtonGroup addBtnClick={handleAddSubject} />
        </Col>
      </Row>

      <Table loading={tableLoading} pagination={false} columns={columnsOfSubjects} rowKey="id" dataSource={tableList} />

      <AdditionSubjectDialog />

      <EditSubjectDialog />
    </>
  )
}
