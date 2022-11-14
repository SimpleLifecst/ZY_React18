import React, { Fragment, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Footer from '../Footer';
import CustomNProgress from '../../components/NProgress';

const AppMain = () => {
  return (
    <Fragment>
      <Layout.Content
        style={{
          margin: '15px 15px 0 15px',
          padding: '15px',
          minHeight: "100vh - 100px",
          backgroundColor: "#fff"
        }}
      >
        <Suspense fallback={<CustomNProgress />}>
          <Outlet />
        </Suspense>
      </Layout.Content>
      <Footer />
    </Fragment>
  );
}

export default AppMain;