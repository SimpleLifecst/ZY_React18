import { Menu } from "antd";
import PubSub from "pubsub-js";
import { REDIRECT_LOGIN } from "../../utils/PubSubAllName";

export const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: <a rel="noopener noreferrer" onClick={handleUserModifyPassword}>修改密码</a>,
      },
      {
        key: "2",
        label: (
          <a rel="noopener noreferrer" onClick={handleUserLogout}>
            退出登录
          </a>
        ),
      },
    ]}
  />
);

export function handleUserLogout() {
  window.sessionStorage.clear();
  PubSub.publish(REDIRECT_LOGIN)
}

export function handleUserModifyPassword() {
  PubSub.publish("handleOpenModifyPasswordDialogOfPubSub")
}
