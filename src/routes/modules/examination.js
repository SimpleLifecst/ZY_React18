import { FileTextOutlined } from "@ant-design/icons";
import { lazy } from "react";

const ExaminationModule = lazy(() => import("../../pages/ExaminationModule"))
const Subjects = lazy(() => import("../../pages/ExaminationModule/Subjects"))
const QuestionBank = lazy(() => import("../../pages/ExaminationModule/QuestionBank"))

export default {
  path: "examination-management",
  element: <ExaminationModule/>,
  meta: {
    name: "考卷管理",
    icon: <FileTextOutlined />
  },
  children: [
    {
      path: "subjects",
      element: <Subjects/>,
      meta: {
        name: "科目分类"
      }
    },
    {
      path: "question-bank",
      element: <QuestionBank/>,
      meta: {
        name: "题库"
      }
    }
  ]
}