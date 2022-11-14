import { lazy } from "react";
import { UserSwitchOutlined } from "@ant-design/icons";
const PeopleModule = lazy(() => import("../../pages/PeopleModule"))
const Student = lazy(() => import("../../pages/PeopleModule/Student"));
const Teacher = lazy(() => import("../../pages/PeopleModule/Teacher"));
const Manager = lazy(() => import("../../pages/PeopleModule/Manager"));

export default {
  path: "people-management",
  element: <PeopleModule />,
  meta: {
    name: "人员管理",
    icon: <UserSwitchOutlined />,
  },
  children: [
    {
      path: "student",
      element: <Student />,
      meta: {
        name: "学生",
      },
    },
    {
      path: "teacher",
      element: <Teacher />,
      meta: {
        name: "老师",
      },
    },
    {
      path: "admin",
      element: <Manager />,
      meta: {
        name: "管理员",
      },
    },
  ],
};
