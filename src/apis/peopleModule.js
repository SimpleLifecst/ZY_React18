import request from "../utils/request";

const STUDENT_BASE_URL = "/students";
const TEACHER_BASE_URL = "/teachers";
const MANAGER_BASE_URL = "/managers";
const USER_BASE_URL = "/users";

const STUDENT_INFO = {
  level: "null",
  place: "null",
  org: "null",
};

export function handleStudentListRequest(params = {}) {
  return request({
    url: STUDENT_BASE_URL,
    method: "GET",
    params: {
      ...params,
    },
  });
}

export function handleAdditionStudentRequest(params = {}) {
  return request({
    url: STUDENT_BASE_URL,
    method: "POST",
    data: {
      ...params,
      ...STUDENT_INFO,
    },
  });
}

export function handleEditStudentRequest(id, params = {}) {
  return request({
    url: `${STUDENT_BASE_URL}/${id}`,
    method: "PUT",
    data: {
      ...params,
      ...STUDENT_INFO,
    },
  });
}

// teacher apis
export function handleTeacherListRequest(params = {}) {
  return request({
    url: TEACHER_BASE_URL,
    method: "GET",
    params,
  });
}

export function handleAdditionTeacherRequest(params = {}) {
  return request({
    url: TEACHER_BASE_URL,
    method: "POST",
    data: params,
  });
}

export function handleEditTeacherRequest(id, params = {}) {
  return request({
    url: `${TEACHER_BASE_URL}/${id}`,
    method: "PUT",
    data: params,
  });
}

//   roleId: string
export function handleManagerListRequest(params) {
  return request({
    method: "GET",
    url: MANAGER_BASE_URL,
    params,
  });
}

export function handleAdditionManagerRequest(params = {}) {
  return request({
    url: MANAGER_BASE_URL,
    method: "POST",
    data: params,
  });
}

export function handleEditManagerRequest(id, params = {}) {
  return request({
    url: `${MANAGER_BASE_URL}/${id}`,
    method: "PUT",
    data: params,
  });
}

// 对账号进行禁用和恢复操作
export function handleDisableOrRecoverRequest(id, state) {
  return request({
    url: `${USER_BASE_URL}/${id}`,
    method: "PUT",
    data: state,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export function handleResetPassword(id, params) {
  return request({
    url: `${USER_BASE_URL}/${id}/password`,
    method: "PUT",
    data: params,
  });
}

export function handleModifyPassword(params) {
  return request({
    url: USER_BASE_URL,
    method: "PUT",
    data: params
  })
}