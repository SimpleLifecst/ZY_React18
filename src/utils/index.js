import { layoutChildren } from "../routes";

/** TODO
 *
 * @param {菜单栏激活key} key
 */

export function getActiveMenu() {
  const arr = window.location.pathname.split("/").filter((i) => i);
  arr.length = arr.length - 1;

  return arr;
}

export function getActiveKey() {
  const arr = window.location.pathname.split("/");

  return arr.reverse()[0] || "student";
}

export function handleRouteTitle() {
  const title = new Map();

  function titleMap(routes) {
    routes.forEach((item) => {
      if (item.children) {
        titleMap(item.children);
      }

      title.set(item.path, item.meta.name);
    });
  }

  titleMap(layoutChildren);

  return title;
}

//#region 生成路由菜单
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const handleMenuByRoutes = (routesArr) => {
  const filterableRoutes = filterLayoutChildrenRoutes(routesArr);

  function routesToMenus(menus) {
    return menus.map((element) => {
      const { meta, path } = element;

      if (element.children && element.children.length > 0) {
        return getItem(
          meta.name,
          path,
          meta.icon,
          routesToMenus(element.children)
        );
      } else {
        return getItem(meta.name, path, meta.icon);
      }
    });
  }

  return routesToMenus(filterableRoutes);
};

function filterLayoutChildrenRoutes(routes) {
  return routes.filter((item) => {
    let fatherItem;
    if (item.meta && !item.meta.hidden) {
      fatherItem = item;
    }

    if (item.children && item.children.length > 0) {
      fatherItem.children = filterLayoutChildrenRoutes(item.children);
    }

    return fatherItem;
  });
}

//#endregion

// 字节转换单位函数
export const handleSwitchByte = (byte) => {
  if (byte <= 0) {
    return "";
  }

  let size = "";
  if (byte < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = `${byte.toFixed(2)}B`;
  } else if (byte < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = `${(byte / 1024).toFixed(2)}KB`;
  } else if (byte < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = `${(byte / (1024 * 1024)).toFixed(2)}MB`;
  } else {
    // 其他转化成GB
    size = `${(byte / (1024 * 1024 * 1024)).toFixed(2)}GB`;
  }

  const sizeStr = `${size}`; // 转成字符串
  const index = sizeStr.indexOf("."); // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2); // 获取小数点后两位的值
  // eslint-disable-next-line eqeqeq
  if (dou == "00") {
    // 判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
};

export const handleDownloadFile = (fileUrl, fileName, callback) => {
  const newUrl =
    "/v1" + fileUrl.split("https://zhongyan.cases.highsoft.ltd")[1];
  // 地址不存在时，禁止操作
  const downloadFileByBlob = (data) => {
    // 创建a标签，使用 html5 download 属性下载，
    const link = document.createElement("a"); // 创建url对象
    const objectUrl = window.URL.createObjectURL(new Blob([data]));
    link.style.display = "none";
    link.href = objectUrl; // 自定义文件名称， fileName
    link.download = fileName;
    document.body.appendChild(link);
    link.click(); // 适当释放url
    window.URL.revokeObjectURL(objectUrl);
  };
  const xhr = new XMLHttpRequest();
  xhr.open("get", newUrl, true);
  xhr.responseType = "blob";
  xhr.onload = () => {
    downloadFileByBlob(xhr.response);
    callback();
  };
  xhr.send();
};
