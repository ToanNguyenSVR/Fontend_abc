import { Menu } from 'antd';
import Dashboard from '../../components/templates/dashboard';
import { getItem } from '../../utils/dashboard-utils';
import {
  AreaChartOutlined,
  TeamOutlined,
  LockOutlined,
  HourglassOutlined,
  ApartmentOutlined,
  CopyOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  MenuUnfoldOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  CarryOutTwoTone,
  BarsOutlined,
  UserOutlined,
  UserAddOutlined,
  LoadingOutlined,
  SafetyOutlined,
  EllipsisOutlined,
  UnorderedListOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Admin = () => {
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
    getItem('Dashboard', 'admin', <CarryOutTwoTone />),
    getItem('Candidate', 'sub1', <UserOutlined />, [
      getItem('Approve', 'admin/candidate-approve', <UserAddOutlined />),
      getItem('Interview', 'admin/candidate-interview', <CalendarOutlined />),
      getItem('Wait', 'admin/candidate-apply', <LoadingOutlined />),
    ]),
    getItem('Company', 'sub2', <TeamOutlined />, [
      getItem('Wait', 'admin/company-verify', <LoadingOutlined />),
      getItem('Verify', 'admin/company', <SafetyOutlined />),
    ]),
    getItem('Headhunter', 'sub3', <TeamOutlined />, [
      getItem('Wait', 'admin/headhunter-verify', <LoadingOutlined />),
      getItem('Verify', 'admin/headhunter', <SafetyOutlined />),
    ]),
    getItem('Data', 'sub5', <CarryOutTwoTone />, [
      getItem('City', 'admin/city', <UnorderedListOutlined />),
      getItem('Skill', 'admin/skill', <UnorderedListOutlined />),
      getItem('Skill Group', 'admin/skill-group', <UnorderedListOutlined />),
      getItem('Language', 'admin/language', <UnorderedListOutlined />),
      getItem('Email', 'admin/email-template', <MailOutlined />),
      getItem('Job Title', 'admin/job-title', <UnorderedListOutlined />),
      getItem('Working Mode', 'admin/working-mode', <UnorderedListOutlined />),
    ]),
    getItem('Transaction', 'sub4', <CreditCardOutlined />, [
      getItem('Withdraw', 'admin/withdraw', <MenuUnfoldOutlined />),
      getItem('All', 'admin/transaction', <MenuUnfoldOutlined />),
    ]),
    getItem('Config', 'sub6', <CarryOutTwoTone />, [
      getItem('Recruiter Stage', 'admin/recruiter-stage', <ShareAltOutlined />),
      getItem('System config', 'admin/system-config', <CalendarOutlined />),
    ]),
  ];

  return (
    <Dashboard
      role="Admin"
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
export default Admin;
