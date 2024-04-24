import { Menu } from 'antd';
import Dashboard from '../../components/templates/dashboard';
import { getItem } from '../../utils/dashboard-utils';
import React, { useEffect, useState } from 'react';
import { CarryOutTwoTone, ApartmentOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
const CompanyStaff = () => {
  const [key, setKey] = useState<string>('');
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    const path = location.pathname; // Get the full path
    setKey(path.substring(1));
  }, [location.pathname]);
  const items = [
    getItem('Assigned', 'staff/job', <DeliveredProcedureOutlined />),
    getItem('Interviewing', 'staff/inprocess', <ApartmentOutlined />),
  ];

  return (
    <Dashboard
      role="Company - Staff"
      menuItem={
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          selectedKeys={[key]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
        />
      }
    />
  );
};
export default CompanyStaff;
