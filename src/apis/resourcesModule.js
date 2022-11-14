import request from "../utils/request"

const RESOURCES_BASE_URL = "/resources"

export function handleFileListRequest(id, params) {
  return request({
    url: RESOURCES_BASE_URL,
    method: "GET",
    params: {
      id,
      ...params
    }
  })
}

export function handleResourceListById(id) {
  return request({
    url: `/resource-list/${id}`,
    method: "GET"
  })
}

export function handleAddResource(params) {
  return request({
    url: RESOURCES_BASE_URL,
    method: "POST",
    data: params
  })
}

export function handleDeleteResource(id) {
  return request({
    url: `${RESOURCES_BASE_URL}/${id}`,
    method: "DELETE",
  })
}

export function handlePathListById(id) {
  return request({
    url: `${RESOURCES_BASE_URL}/${id}/path`,
    method: "GET"
  })
}

export function handleFileRename(id, newName) {
  return request({
    url: `${RESOURCES_BASE_URL}/${id}`,
    method: "PUT",
    data: newName,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}