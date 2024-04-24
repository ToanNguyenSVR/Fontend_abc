import { Menu } from 'antd';
import Dashboard from '../../components/templates/dashboard';
import { getItem } from '../../utils/dashboard-utils';
import React, { useEffect, useState } from 'react';
import {
  HourglassOutlined,
  AuditOutlined,
  ApartmentOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
const Candidate = () => {
  const [key, setKey] = useState<string>('');
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname; // Get the full path
    if (
      path === '/admin/candidate-approve' ||
      path === '/admin/candidate-interview' ||
      path === '/admin/candidate-apply'
    ) {
      setOpenKeys(['sub1']);
    }
    setKey(path.substring(1));
  }, [location.pathname]);

  const items = [
    getItem('Headhunter', 'candidate', <TeamOutlined />),
    getItem('Request', 'candidate/request', <UserSwitchOutlined />),
    getItem('Waiting', 'candidate/wait', <HourglassOutlined />),
    getItem('All CV', 'candidate/cv', <UnorderedListOutlined />),
    getItem('Interview', 'candidate/interview', <ApartmentOutlined />),
  ];

  return (
    <Dashboard
      role="Candidate"
      menuItem={
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[key]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          items={items}
        />
      }
    />
  );
};
export default Candidate;
