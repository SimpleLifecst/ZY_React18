import { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from 'pubsub-js';
import { Button, Col, Row, Table, Space } from 'antd';
import { columnsOfFileResources } from '../table';
import { handleFileListRequest, handlePathListById } from '../../../apis/resourcesModule';
import FilterSearcher from './FilterSearcher';
import AdditionDirectoryDialog from './AdditionDirectoryDialog';
import PathHistory from './PathHistory';
import CustomUpload from './Upload';

const FileResources = (props) => {

  const [list, setList] = useState([]);
  const [pathList, setPathList] = useState([]);
  const [parentId, setParentId] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);


  const getTableList = async (parentId, params) => {
    setLoading(true);
    const { data } = await handleFileListRequest(parentId, params)
    setList(data)
    setLoading(false)
  }

  const openAddFolderDialog = () => {
    setIsModalOpen(true)
  }

  useEffect(() => {
    getTableList(parentId)

    const token = subscribe('handleUpdateListOfPubSub', async (_, parentId) => {
      setParentId(parentId)
      getTableList(parentId)

      const { data } = await handlePathListById(parentId)
      setPathList(data)
    })

    return () => {
      unsubscribe(token)
    }
  }, [])

  return (
    <div>
      <Row>
        <Col span="12">
          <FilterSearcher updateList={getTableList} parentId={parentId} />
        </Col>
        <Col span="12">
          <Space size='small' className='update-button-group'>
            <CustomUpload parentId={parentId} />
            <Button onClick={openAddFolderDialog}>新建文件夹</Button>
          </Space>
        </Col>
      </Row>

      <PathHistory pathList={pathList} />

      <Table pagination={false} loading={loading} dataSource={list} columns={columnsOfFileResources} rowKey="id" />

      <AdditionDirectoryDialog
        parentId={parentId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateList={getTableList}
      />
    </div>
  )
}

export default FileResources;
