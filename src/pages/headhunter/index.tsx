import {
  ApartmentOutlined,
  AppstoreOutlined,
  HourglassOutlined,
  FullscreenExitOutlined,
  StarOutlined,
  UnorderedListOutlined,
  UserSwitchOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import Dashboard from '../../components/templates/dashboard';
import { getItem } from '../../utils/dashboard-utils';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const HeadhunterDashboard = () => {
  const [key, setKey] = useState<string>('');
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  useEffect(() => {
    const path = location.pathname; // Get the full path
    setKey(path.substring(1));
  }, [location.pathname]);
  const items = [
    getItem('Home', 'headhunter', <AppstoreOutlined />),
    getItem('Request', 'headhunter/request', <UserSwitchOutlined />),
    getItem('All Candidate', 'headhunter/candidate', <UnorderedListOutlined />),
    getItem('Waiting verify', 'headhunter/wait', <HourglassOutlined />),
    getItem('Interview', 'headhunter/interview', <ApartmentOutlined />),
    getItem('Matching CV', 'headhunter/matching', <FullscreenExitOutlined />),
    getItem('Rating History', 'headhunter/rating', <StarOutlined />),
    getItem('Wallet', 'headhunter/wallet', <WalletOutlined />),
  ];

  return (
    <Dashboard
      role="Headhunter"
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
export default HeadhunterDashboard;
