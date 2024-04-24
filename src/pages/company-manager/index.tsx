import { Menu } from 'antd';
import Dashboard from '../../components/templates/dashboard';
import { getItem } from '../../utils/dashboard-utils';
import React, { useEffect, useState } from 'react';
import {
  AppstoreAddOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  ApartmentOutlined,
  PieChartTwoTone,
  BarsOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
const CompanyManager = () => {
  const [key, setKey] = useState<string>('');
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const path = location.pathname; // Get the full path
    setKey(path.substring(1));
  }, [location.pathname]);

  const items = [
    getItem('Overview', 'manager', <PieChartTwoTone />),
    getItem('All Job', 'manager/job', <UnorderedListOutlined />),
    getItem('Interviewing', 'manager/inprocess', <ApartmentOutlined />),
    getItem('Staff', 'manager/staff', <UsergroupAddOutlined />),
    getItem('Campus', 'manager/campus', <HomeOutlined />),
    getItem('Wallet', 'manager/wallet', <WalletOutlined />),
  ];

  return (
    <Dashboard
      role="Company - Manager"
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
export default CompanyManager;
