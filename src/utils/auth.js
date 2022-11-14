const TOKEN = 'token'

function saveToken(token) {
  const newToken = `Bearer ${token}`;
  sessionStorage.setItem(TOKEN, newToken)
}

function getToken() {
  return sessionStorage.getItem(TOKEN)
}

function removeToken() {
  sessionStorage.removeItem(TOKEN)
}

function setToken(config) {
  if (!!getToken() && config.url !== "/login") {
    config.headers["Authorization"] = getToken()
  }

  return config
}

export {
  saveToken,
  getToken,
  removeToken,
  setToken
}