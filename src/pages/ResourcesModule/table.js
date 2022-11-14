import { Button, message, Space, Tag, Popover } from "antd";
import dayjs from "dayjs";
import { publish } from "pubsub-js";
import { handleDeleteResource } from "../../apis/resourcesModule";
import CustomPopconfirm from "../../components/Popconfirm";
import { handleSwitchByte, handleDownloadFile } from "../../utils";
import RenameInput from "./FileResources/RenameInput";

const content = (
  <>
    <sapn>点击文件夹名可进入它的内部， 查看子文件，其它文件无效</sapn>
    <br />
    <sapn>
      双击文件附近空白处，可进行重命名或点击重命名按钮，<br/>
      按键Enter(回车)或取消焦点进行确认修改
    </sapn>
  </>
);

export const columnsOfFileResources = [
  {
    title: (
      <Popover title="文件名操作提示" trigger="hover" content={content}>
        文件名
      </Popover>
    ),
    key: "name",
    width: "250px",
    render: (_, record) => <RenameInput record={record} />,
  },
  {
    title: "类型",
    dataIndex: "resourceType",
    key: "resourceType",
    render: (_, { resourceType, ext }) => (
      <Tag color="#2db7f5" className="flex-center">
        {resourceType === "DIRECTORY"
          ? "文件夹"
          : String(ext).toLocaleUpperCase()}
      </Tag>
    ),
  },
  {
    title: "大小",
    dataIndex: "size",
    key: "size",
    render: (_, { size }) => handleSwitchByte(size),
  },
  {
    title: "上传人",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "上传时间",
    key: "createdAt",
    render: (_, { createdAt }) => dayjs(createdAt).format("YYYY/MM/DD"),
  },
  {
    title: "操作",
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Button onClick={() => handleRenameFile(record)}>重命名</Button>
        {record.resourceType === "DIRECTORY" ? (
          ""
        ) : (
          <Button onClick={() => handleDownload(record)}>下载</Button>
        )}
        <CustomPopconfirm
          handleDelete={() => handleDeleteOfFileResources(record)}
        />
      </Space>
    ),
  },
];

async function handleDeleteOfFileResources(record) {
  const { id, parentId } = record;
  await handleDeleteResource(id);

  publish("handleUpdateListOfPubSub", parentId);

  message.success("删除成功");
}

function handleRenameFile(record) {
  publish("RenameFileByPubSub", record);
}

function handleDownload(record) {
  const { fileUrl, fullFileName } = record;
  const closeMessage = message.loading(`正在下载 ${record.fullFileName}`, 0);
  handleDownloadFile(fileUrl, fullFileName, () => {
    closeMessage()
  });
}
