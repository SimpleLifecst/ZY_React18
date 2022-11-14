import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { publish } from 'pubsub-js';
import { handleAddResource, handleFileListRequest } from '../../../../apis/resourcesModule';
import { getToken } from '../../../../utils/auth';
import { RESOURCE_UPLOAD_FILE } from '../../../../utils/constant';

const config = {
  action: RESOURCE_UPLOAD_FILE,
  headers: {
    authorization: getToken(),
  }
};

const CustomUpload = (props) => {

  const { parentId } = props;

  const [fileList, setFileList] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleOnChange = async (info) => {
    setBtnLoading(true)
    setFileList([info.file])

    if (!info.fileList.length) setBtnLoading(false)


    if (info.file.status === "done") {
      const { file: { name, size, response: { url } } } = info;

      let [newName, ext] = name.split('.')
      /**
       * 接口是存在问题是，名字若重复则会上传失败，故通过搜索api进行判断是否要追加随机数
       */
      const { data } = await handleFileListRequest(parentId, { q: newName })

      if (data.length > 0) {
        newName = newName + Date.now()
        message.warn("上传文件名重复，已自动追加随机数")
      }

      await handleAddResource({
        parentId,
        name: newName,
        ext,
        size,
        type: "FILE",
        fileUrl: url
      })

      setBtnLoading(false)
      publish('handleUpdateListOfPubSub', parentId)
    }
  }

  return (
    <Upload
      {...config}
      className="custom-upload"
      defaultFileList={[...fileList]}
      onChange={handleOnChange}  >
      <Button loading={btnLoading} type='primary' icon={<UploadOutlined />}>上传</Button>
    </Upload >
  )
}
export default CustomUpload;