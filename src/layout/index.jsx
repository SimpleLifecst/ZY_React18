
import { Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AppMain from './AppMain';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { subscribe, unsubscribe } from 'pubsub-js';
import DrawerSidebar from './DrawerSidebar';
import { REDIRECT_LOGIN } from '../utils/PubSubAllName';


const App = props => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const token = subscribe(REDIRECT_LOGIN, () => {
      navigate('/login')
    })

    return () => {
      unsubscribe(token)
    }
  }, [])

  return (
    <Layout className='layout'>
      <DrawerSidebar collapsed={collapsed} setCollapsed={setCollapsed} className="media-drawer-sidebar" />
      <Sidebar collapsed={collapsed} className="media-sidebar" />
      <Layout className="site-layout">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <AppMain />
      </Layout>
    </Layout>
  );
};
export default App;