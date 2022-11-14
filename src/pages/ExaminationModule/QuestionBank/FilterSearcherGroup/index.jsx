import { useEffect, useState } from 'react'
import { Col, Form, Input, Row, Select } from 'antd'
import { ExaminationQuestionType } from '../../../../utils/constant'
import { handleGetQuestionTagList } from '../../../../apis/examinationModule'
import { subscribe, unsubscribe } from 'pubsub-js'
import { CLEAR_SEARCHER_VALUE } from '../../../../utils/PubSubAllName'

export default function FilterSearcherGroup(props) {

  const { getSearcherValue, loading, reset } = props;

  const [instanceForm] = Form.useForm()

  const [tagList, setTagList] = useState([]);

  const getQuestionTagList = async () => {
    const { data } = await handleGetQuestionTagList();
    setTagList(data)
  }

  const handleSearch = async () => {
    const value = await instanceForm.getFieldsValue()
    getSearcherValue(value)
  }

  const handleResetSearch = () => {
    // instanceForm.setFieldsValue({
    //   q: "",
    //   questionTagIds: [],
    //   types: []
    // })
    console.log(props.pageSize);
    reset()
  }

  useEffect(() => {
    getQuestionTagList()

    const token = subscribe(CLEAR_SEARCHER_VALUE, handleResetSearch)

    return () => {
      unsubscribe(token)
    }
  }, []);

  return (
    <Form autoComplete='off' form={instanceForm}>
      <Form.Item label="题目" name='q'>
        <Input.Search
          placeholder="请输入题目名称进行筛选"
          size="middle"
          loading={loading}
          onSearch={handleSearch}
        />
      </Form.Item>
      <Row>
        <Col span="12">
          <Form.Item label="科目" name='questionTagIds'>
            <Select mode="multiple" placeholder="请选择科目进行分类题库">
              {
                tagList.map(({ id, name }) => <Select.Option key={id} value={id}>{name}</Select.Option>)
              }
            </Select>
          </Form.Item>
        </Col>
        <Col span="11" offset={1}>
          <Form.Item label="题型" name='types'>
            <Select mode="multiple" placeholder="请选择题型" options={ExaminationQuestionType} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

FilterSearcherGroup.defaultProps = {
  loading: false
}