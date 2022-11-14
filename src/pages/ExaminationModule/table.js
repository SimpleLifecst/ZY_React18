import { Button, Space, Tag } from "antd";
import { publish } from "pubsub-js";
import { handleDeleteQuestionRequest, handleDeleteSubjectRequest } from "../../apis/examinationModule";
import CustomPopconfirm from "../../components/Popconfirm";
import { ExaminationQuestionType } from "../../utils/constant";
import { TURN_ON_DIALOG, UPDATE_LIST } from "../../utils/PubSubAllName";

export const columnsOfSubjects = [
  {
    title: "科目",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button onClick={() => handleEditOfSubjects(record)}>编辑</Button>
        <CustomPopconfirm handleDelete={() => handleDeleteOfSubjects(record)} />
      </Space>
    ),
  },
];

function handleEditOfSubjects(record) {
  publish(TURN_ON_DIALOG, record);
}

async function handleDeleteOfSubjects({ id }) {
  await handleDeleteSubjectRequest(id);

  publish("HandleTableListByPubSub");
}

export const columnsOfQuestionBank = [
  {
    title: "题目",
    dataIndex: "stem",
    key: "stem",
  },
  {
    title: "题型",
    key: "type",
    render: (_, record) => (
      <Tag color="#2db7f5">
        {ExaminationQuestionType.find((i) => i.value === record.type).label}
      </Tag>
    ),
  },
  {
    title: "科目",
    key: "tags",
    render: (_, record) => (
      <>
        {record.tags.map((item) => (
          <Tag color="#87d068" key={item.id}>
            {item.name}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "分值",
    dataIndex: "score",
    key: "score",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button onClick={() => handleEditOfQuestionBank(record)}>编辑</Button>
        <CustomPopconfirm
          handleDelete={() => handleDeleteOfQuestionBank(record)}
        />
      </Space>
    ),
  },
];

function handleEditOfQuestionBank(record) {
  publish(TURN_ON_DIALOG, record);
}

async function handleDeleteOfQuestionBank(record) {
  await handleDeleteQuestionRequest(record.id)
  publish(UPDATE_LIST)
}
