import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import "normalize.css/normalize.css";
import { Provider } from "react-redux";
import "./style/index.scss";
import store from "./redux";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </BrowserRouter>
);
