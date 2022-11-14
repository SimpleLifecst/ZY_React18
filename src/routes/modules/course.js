import { lazy } from "react";
import { SlackOutlined } from "@ant-design/icons";

const CourseModule = lazy(() => import("../../pages/CourseModule"));
const UClass = lazy(() => import("../../pages/CourseModule/UClass"));
const UClassDetails = lazy(() =>
  import("../../pages/CourseModule/UClass/UClassDetails")
);
const ClassSchedule = lazy(() =>
  import("../../pages/CourseModule/ClassSchedule")
);
const CourseCalendar = lazy(() =>
  import("../../pages/CourseModule/CourseCalendar")
);
const ClassAssignment = lazy(() =>
  import("../../pages/CourseModule/ClassAssignment")
);

export default {
  path: "course-management",
  element: <CourseModule />,
  meta: {
    name: "课程管理",
    icon: <SlackOutlined />,
  },
  children: [
    {
      path: "uclass",
      element: <UClass />,
      meta: {
        name: "班级",
      },
    },
    {
      path: "uclass/:id",
      element: <UClassDetails />,
      meta: {
        name: "班级详情",
        hidden: true,
      },
    },
    {
      path: "class-schedule",
      element: <ClassSchedule />,
      meta: {
        name: "课程表",
      },
    },
    {
      path: "course-calendar",
      element: <CourseCalendar />,
      meta: {
        name: "课程日历",
      },
    },
    {
      path: "class-assignment",
      element: <ClassAssignment />,
      meta: {
        name: "作业",
      },
    },
  ],
};
