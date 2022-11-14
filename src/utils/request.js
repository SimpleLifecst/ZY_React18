import axios from "axios";
import { message } from "antd";
import { publish } from "pubsub-js";
import { setToken } from "./auth";
import { REDIRECT_LOGIN } from "./PubSubAllName";

export default function request(config) {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  instance.interceptors.request.use((config) => {
    return setToken(config);
  });

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    (err) => {
      const { status } = err.response.data;
      const messageInfo = err.response.data.message;
      if (
        status === 401 &&
        messageInfo === "Unauthorized" &&
        window.location.pathname !== "/login"
      ) {
        message.error("无权限访问，登陆过期");
        publish(REDIRECT_LOGIN);
        return Promise.reject();
      }

      message.error(messageInfo || "服务器繁忙，请稍后再试");
      return Promise.reject();
    }
  );

  return instance(config);
}
