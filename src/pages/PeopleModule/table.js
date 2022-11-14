import { Space, Button, message, Tag } from "antd";
import { Gender, roleTypeOfManager } from "../../utils/constant";
import PubSub, { publish } from "pubsub-js";
import { handleDisableOrRecoverRequest } from "../../apis/peopleModule";

export const columnsOfStudent = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
    render: (_, record) => <span>{Gender[record.gender]}</span>,
  },
  {
    title: "手机号",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "身份证号",
    key: "idNumber",
    dataIndex: "idNumber",
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <Button danger disabled>
          删除
        </Button>
      </Space>
    ),
  },
];

export const columnsOfTeacher = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "账号",
    key: "username",
    dataIndex: "username",
  },
  {
    title: "手机号",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "状态",
    key: "state",
    dataIndex: "state",
    render: (status) => (
      <Tag color={status === "DISABLED" ? "error" : "processing"}>
        {status === "DISABLED" ? "停用中" : "使用中"}
      </Tag>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <Button onClick={() => handleDisbleOrRecover(record)} danger>
          {record.state === "ENABLED" ? "禁用" : "恢复"}
        </Button>
      </Space>
    ),
  },
];

// TODO
function handleEdit(record) {
  PubSub.publish("handleEditOfPubSub", record);
}

async function handleDisbleOrRecover(record) {
  const { userId, state } = record;

  const newState = state === "ENABLED" ? "DISABLED" : "ENABLED";

  await handleDisableOrRecoverRequest(userId, newState);

  PubSub.publish("handleDisableOrRecoverOfPubSub");

  message.success("状态更新成功");
}

export const columnsOfManager = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "账号",
    key: "username",
    dataIndex: "username",
  },
  {
    title: "手机号",
    key: "phoneNumber",
    dataIndex: "phoneNumber",
  },
  {
    title: "角色",
    key: "roleId",
    dataIndex: "roleId",
    render: (roldId) => (
      <Tag color="success">
        {roleTypeOfManager.filter((item) => item.roleId === roldId)[0].roleName}
      </Tag>
    ),
  },
  {
    title: "状态",
    key: "state",
    dataIndex: "state",
    render: (status) => (
      <Tag color={status === "DISABLED" ? "error" : "processing"}>
        {status === "DISABLED" ? "停用中" : "使用中"}
      </Tag>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <Button onClick={() => handleOpenResetDialog(record)}>重置密码</Button>
        <Button onClick={() => handleDisbleOrRecover(record)} danger>
          {record.state === "ENABLED" ? "禁用" : "恢复"}
        </Button>
      </Space>
    ),
  },
];

function handleOpenResetDialog(record) {
  publish('handleOpenResetPasswordDialog', record)
}
