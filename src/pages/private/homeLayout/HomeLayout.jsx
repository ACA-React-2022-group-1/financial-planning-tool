import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';
import {  signOut } from "firebase/auth";

import './HomeLayout.css'
import { useAuth } from  "../../../hooks/useAuth"
import HeaderComponent from '../../../components/header/header';

import {
  BarsOutlined,
  HistoryOutlined,
  PieChartOutlined,
  TransactionOutlined,
  AreaChartOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const menuItems = [
  {
      key: 'summary',
      icon: <PieChartOutlined />,
      label: 'Summary',
  },
  {
      key: 'history',
      icon: <HistoryOutlined />,
      label: 'History',
  },
  {
      key: 'categories',
      icon: <BarsOutlined />,
      label: 'Categories',
  },
  {
      key: 'charts',
      icon: <AreaChartOutlined />,
      label: 'Charts',
  },
  {
      key: 'changeCurrency',
      icon: <TransactionOutlined />,
      label: 'Change currency',
  },
  {
      key: 'manual',
      icon: <SettingOutlined />,
      label: 'Manual',
  },
  {
    key: 'logOut',
    icon: <PoweroffOutlined />,
    label: 'logOut',
},
]

 
const HomeLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState({});
    const { token: { colorBgContainer } } = theme.useToken();
    const { logout } = useAuth();
 
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              console.log("uid", uid)
              setUser(user)
            } else {
              console.log("user is logged out")
            }
          });
         
    }, [])


    function logOut() {
        signOut(auth).then(() => {
                logout();
                navigate("/signin");
            }).catch((error) => {
            // An error happened.
            });
    }

    function onNavItemSelect({item, key, keyPath, selectedKeys, domEvent}) {
      if(key === "logOut") {
        logOut()
      }
       navigate(key)
    }

 
    return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              onSelect = {(e) => onNavItemSelect(e)}
              items={menuItems}
            />
          </Sider>
          <Layout className="site-layout">
            <Header style={{ padding: 0, background: colorBgContainer }}>

              <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} logOut={logOut}/>

            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: colorBgContainer}}>

              <Outlet></Outlet>

            </Content>

            <Footer style={{ textAlign: 'center' }}>Financial Management Tool ©2023 Created by Ant UED & xumb1</Footer>

          </Layout>
        </Layout>
      );
}
 
export default HomeLayout