/**
 * 发送请求Api
 */
export const RESOURCE_UPLOAD_FILE = "/api/upload-with-size";

export const Gender = {
  female: 0,
  male: 1,
  1: "男",
  0: "女",
};

// 教务人员：即老师，负责班级课程作业等；
// 考务人员：负责发布考试，和问卷；
export const roleTypeOfManager = [
  { roleId: "1", roleName: "超级管理员" },
  { roleId: "2", roleName: "审批人员" },
  { roleId: "3", roleName: "总务人员" },
  { roleId: "6", roleName: "考务人员" },
  { roleId: "7", roleName: "教务人员" },
];

export const ClassType = [
  { name: "公共课", type: "GENERAL" },
  { name: "专业课", type: "SPECIALIZED" },
];

export const ClassStatus = [
  { label: "已结束", status: "FINISHED" },
  { label: "进行中", status: "STARTED" },
];

export const ExaminationQuestionType = [
  { label: "单选题", value: "SINGLE_CHOICE" },
  { label: "多选题", value: "MULTI_CHOICE" },
  { label: "简答题", value: "SIMPLE_QUESTION" },
  { label: "判断题", value: "JUDGMENT_QUESTION" },
];
