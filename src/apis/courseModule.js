import request from "../utils/request";
import dayjs from 'dayjs'

const CLASS_BASE_URL = "/class";

export function handleClassListRequest(params) {
  return request({
    url: CLASS_BASE_URL,
    method: "GET",
    params,
  });
}

export function handleAdditionClassRequest(params) {

  const startDate = params.learningCycle[0]
  const finishDate = params.learningCycle[1]

  return request({
    url: CLASS_BASE_URL,
    method: "POST",
    data: { ...params, startDate, finishDate },
  });
}

export function handleEditClassRequest(id, params) {

  const startDate = dayjs(params.learningCycle[0]).format("YYYY-MM-DD[T]HH:mm:ss[Z]")
  const finishDate = dayjs(params.learningCycle[1]).format("YYYY-MM-DD[T]HH:mm:ss[Z]")

  return request({
    url: `${CLASS_BASE_URL}/${id}`,
    method: "PUT",
    data: { ...params, startDate, finishDate },
  })
}

export function handleDeleteClassRequeset(id) {
  return request({
    url: `${CLASS_BASE_URL}/${id}`,
    method: "DELETE"
  })
}