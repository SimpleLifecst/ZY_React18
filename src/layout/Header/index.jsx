import React, { Fragment, } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Avatar, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { handleRouteTitle } from '../../utils';
import { menu } from './menu'
import ModifyPasswordDialog from './ModifyPasswordDialog';
import CustomBreadcrumb from './Breadcrumb';

const Header = (props) => {
  const titleMap = handleRouteTitle()
  const { collapsed, setCollapsed } = props;

  const { pathname, state } = useLocation()
  
  return (
    <Fragment>
      <Layout.Header
        style={{ padding: "15px" }}
        className="site-layout-background header">
        <div className="left">
          <div className='left-top'>
            <span onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined className='icon' /> : <MenuFoldOutlined className='icon' />}
            </span>
            <span className='title'>{titleMap.get(pathname.split('/').reverse()[0]) || state && state.name}</span>
          </div>
          <div className='left-bottom'>
            <CustomBreadcrumb />
          </div>
        </div>

        <div className="right">
          <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
          <Dropdown overlayStyle={{ width: "80px" }} placement="bottom" overlay={menu} arrow={{ pointAtCenter: true }} trigger={['click']}>
            <div className='dropdown' style={{ marginRight: "15px" }}>
              <span>&nbsp;{sessionStorage.getItem("displayName")}&nbsp;</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </Layout.Header>

      {/* 修改密码对话框 */}
      <ModifyPasswordDialog />
    </Fragment>
  );
}

export default Header;