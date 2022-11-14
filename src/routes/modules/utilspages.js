import { lazy } from "react";
import { AppstoreAddOutlined } from "@ant-design/icons";
import Color from "../../pages/UtilsPages/Color";
import Maps from "../../pages/UtilsPages/Maps";
import Qrcode from "../../pages/UtilsPages/Qrcode";
import RightMenu from "../../pages/UtilsPages/RightMenu";

const UtilsPages = lazy(() => import("../../pages/UtilsPages"));
const RichText = lazy(() => import("../../pages/UtilsPages/RichText"));

export default {
  path: "utils",
  element: <UtilsPages />,
  meta: {
    name: "工具管理",
    icon: <AppstoreAddOutlined />,
  },
  children: [
    {
      path: "rich-text",
      element: <RichText/>,
      meta: {
        name: "富文本",
      }
    },
    {
      path: "color",
      element: <Color/>,
      meta: {
        name: "取色器",
      }
    },
    {
      path: "maps",
      element: <Maps/>,
      meta: {
        name: "地图",
      }
    },
    {
      path: "qrcode",
      element: <Qrcode/>,
      meta: {
        name: "二维码",
      }
    },
    {
      path: "right-menu",
      element: <RightMenu/>,
      meta: {
        name: "右键菜单",
      }
    }
  ]
};
