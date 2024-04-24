import { Avatar, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { getItem } from '../../../utils/dashboard-utils';
import Dashboard from '../../templates/dashboard';

const Messager = () => {
  const items = [
    getItem('Home', 'chat/1', <Avatar style={{ backgroundColor: 'lightblue' }}>A</Avatar>),
    getItem('Home', 'chat/2', <Avatar style={{ backgroundColor: 'lightblue' }}>A</Avatar>),
    getItem('Home', 'chat/3', <Avatar style={{ backgroundColor: 'lightblue' }}>A</Avatar>),
  ];

  return (
    <Dashboard
      showHeader={false}
      role="Headhunter - Messager"
      menuItem={<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />}
    />
  );
};
export default Messager;
