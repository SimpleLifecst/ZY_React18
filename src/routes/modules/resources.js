import { lazy } from 'react';
import { DeliveredProcedureOutlined } from '@ant-design/icons';

const ResourcesModule = lazy(() => import("../../pages/ResourcesModule"))
const FileResources = lazy(() => import("../../pages/ResourcesModule/FileResources"))

export default {
  path: "resources-management",
  element:  <ResourcesModule/>,
  meta: {
    name: "资源管理",
    icon: <DeliveredProcedureOutlined />,
  },
  children: [
    {
      path: "file-resources",
      element: <FileResources/>,
      meta: {
        name: "文件资源"
      }
    }
  ],
};
