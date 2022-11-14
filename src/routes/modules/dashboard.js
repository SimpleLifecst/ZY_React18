import { lazy } from "react";
import { PieChartOutlined } from "@ant-design/icons";

const Dashborad = lazy(() => import("../../pages/Dashboard"));

export default {
  path: "dashboard",
  element: <Dashborad />,
  meta: {
    name: "里程碑",
    icon: <PieChartOutlined />,
  },
};
