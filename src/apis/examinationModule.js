import request from "../utils/request";

const QUESTION_TAGS = "question-tags";
const QUESTIONS = "questions";

export function handleSubjectListRequest(q) {
  return request({
    url: QUESTION_TAGS,
    method: "GET",
    params: {
      q,
    },
  });
}

export function handleDeleteSubjectRequest(id) {
  return request({
    url: `${QUESTION_TAGS}/${id}`,
    method: "DELETE",
  });
}

export function handleAddSubjectRequest(params) {
  return request({
    url: QUESTION_TAGS,
    method: "POST",
    data: params.name,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

/**
  接口存在异常：修改数据会更新序列
 */
export function handleEditSubjectRequest(id, name) {
  return request({
    url: `${QUESTION_TAGS}/${id}`,
    method: "PUT",
    data: name,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export function handleGetQuestionTagList() {
  return request({
    url: "question-tags-list",
    method: "GET",
  });
}

export function handleQuestionBankListRequest(params) {
  return request({
    url: QUESTIONS,
    method: "GET",
    params,
  })
}

export function handlePutQuestionRequest(id, params) {
  return request({
    url: `${QUESTIONS}/${id}`,
    method: "PUT",
    data: params
  })
}

export function handleDeleteQuestionRequest(id) {
  return request({
    url: `${QUESTIONS}/${id}`,
    method: "DELETE"
  })
}
