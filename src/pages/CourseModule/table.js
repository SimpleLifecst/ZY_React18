import { Button, Space, Tag, message } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { publish } from "pubsub-js";
import { ClassType, ClassStatus } from "../../utils/constant";
import { handleDeleteClassRequeset } from "../../apis/courseModule";
import { Link } from "react-router-dom";
import CustomPopconfirm from "../../components/Popconfirm";

export const columnsOfUClass = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "类型",
    key: "type",
    render: (_, record) => (
      <Tag color="#2db7f5">
        {ClassType.find((i) => i.type === record.type)["name"]}
      </Tag>
    ),
  },
  {
    title: "学习周期",
    key: "learningCycle",
    render: (_, record) => (
      <>
        {record.startDate} <MinusOutlined /> {record.finishDate}
      </>
    ),
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: (_, { status }) => (
      <Tag color={ status === 'FINISHED' ? '#f50': '#87d068' }>
        {ClassStatus.find((i) => i.status === status)["label"]}
      </Tag>
    )
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Button type="primary">
          <Link to={`${record.id}`} state={record}>管理</Link>
        </Button>
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <CustomPopconfirm handleDelete={() => handleDeleteOfClass(record)}/>
      </Space>
    ),
  },
];

function handleEdit(record) {
  publish("handleEditOfPubSub", record);
}

async function handleDeleteOfClass({id}) {
  await handleDeleteClassRequeset(id)

  publish("handleDisableOrRecoverOfPubSub");

  message.success("删除成功");
}