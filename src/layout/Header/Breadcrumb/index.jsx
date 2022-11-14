import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { handleRouteTitle } from '../../../utils'

export default function CustomBreadcrumb() {

  const titleMap = handleRouteTitle()

  const { pathname, state } = useLocation()

  const pathSnippets = pathname.split('/').filter((i) => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    return (
      <Fragment key={Date.now()}>
        <Breadcrumb.Item key={url}>
          {/* TODO: 存在隐患，目前没有问题 */}
          <Link to={url}>{titleMap.get(url.split('/').reverse()[0]) || state && state.name}</Link>
        </Breadcrumb.Item>
      </Fragment>
    );
  });

  return (
    <Breadcrumb>
      {
        pathname === "/dashboard" ? '' : (
          <Breadcrumb.Item key='dashboard'>
            <Link to="/dashboard">{titleMap.get('dashboard')}</Link>
          </Breadcrumb.Item>
        )
      }
      {extraBreadcrumbItems}
    </Breadcrumb>
  )
}
