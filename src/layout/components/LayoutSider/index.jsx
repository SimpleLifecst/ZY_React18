import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import { layoutChildren } from '../../../routes';
import Logo from '../Logo'
import DrawerLogo from '../DrawerLogo'
import { getActiveKey, handleMenuByRoutes } from '../../../utils';

export default function LayoutSider(props) {
  const { siderType, collapsed, siderTheme, handleItemClick } = props;

  const [openKeys, setOpenKeys] = useState([]);

  const sidebarMenu = handleMenuByRoutes(layoutChildren)

  function handleOpenChange(keys) {
    setOpenKeys(keys)
  }
  return (
    <>
      <Layout.Sider collapsed={collapsed} className={props.className}>
        {
          siderType === "DrawerSidebar" ?
            <DrawerLogo /> :
            <Logo collapsed={collapsed} />
        }
        <Menu onOpenChange={handleOpenChange} onClick={handleItemClick} theme={siderTheme} openKeys={openKeys} selectedKeys={getActiveKey()} mode="inline" items={sidebarMenu} />
      </Layout.Sider>
    </>
  )
}
