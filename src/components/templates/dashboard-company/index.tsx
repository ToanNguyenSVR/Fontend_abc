import React, { useState } from 'react';
import { Layout, Menu, Card, Row, Col, Tag, Avatar } from 'antd';
import { DesktopOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { ManageCandidateForm } from '../../organisms/manage-candidate-form';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Content, Sider } = Layout;

const DashboardCompany: React.FC = props => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const location = useLocation();

  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  let content = null;
  switch (selectedMenuItem) {
    case '1':
      content = <ManageCandidateForm />;
      break;
    default:
      break;
    case '2':
      content = (
        <div>
          <h1>Devices</h1>
          <p>This is the devices content.</p>
        </div>
      );
      break;
    case '3':
      content = (
        <div>
          <h1>Files</h1>
          <p>This is the files content.</p>
        </div>
      );
      break;
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
          <div className="logo" />
          <Menu theme="dark" selectedKeys={[location.pathname.split('/')[2]]} mode="inline">
            <Menu.Item key="headhunter" icon={<UserOutlined />}>
              <Link to="headhunter">Report</Link>
            </Menu.Item>
            <Menu.Item key="headhunter" icon={<UserOutlined />}>
              <Link to="headhunter">Job</Link>
            </Menu.Item>
            <Menu.Item key="headhunter" icon={<UserOutlined />}>
              <Link to="headhunter">Bill</Link>
            </Menu.Item>
            <Menu.Item key="headhunter" icon={<UserOutlined />}>
              <Link to="headhunter">Recruiter</Link>
            </Menu.Item>
          </Menu>
          <Menu
            theme="dark"
            selectable={false}
            mode="inline"
            style={{ position: 'absolute', bottom: 0, width: '100%' }}
          >
            <Menu.Item key="4" icon={<UserOutlined />}>
              Account Management
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>{<Outlet />}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardCompany;
