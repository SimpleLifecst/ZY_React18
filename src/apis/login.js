import request from '../utils/request'

export function handleLoginRequest(formValues) {
  const { username, password } = formValues;
  return request({
    method: "POST",
    url: "/login",
    data: {
      username,
      password,
    },
  });
}