import React, { useEffect, useRef, useState, FC } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BellOutlined,
} from '@ant-design/icons';
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Avatar,
  Tag,
  Card,
  Divider,
  Row,
  Col,
  Badge,
  notification,
} from 'antd';
import './index.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import PageTemplate from '../page-template';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import useNotification from '../../../hooks/useNotification';
import myAxios from '../../../axios/config';
import { formatDistanceToNow } from 'date-fns';
import { v1 } from 'uuid';
const { Sider, Content } = Layout;
const { Meta } = Card;
interface DashboardProps {
  menuItem: React.ReactNode;
  role: string;
  showHeader?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ menuItem, role, showHeader = true }) => {
  const [api, context] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(false);
  const user = useAppSelector((store: RootState) => store.user);
  const [render, setRender] = useState('');
  const [notificationItems, setNotificationItems] = useState([]);
  const [count, setCount] = useState(0);
  const [headhunter, setHeadhunter] = useState<any>();
  useNotification(data => {
    const [title, content] = data.split('~');
    setRender(v1());
    api.info({
      message: title,
      description: content,
      duration: 3,
    });
  });
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState(8);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const menu = menuRef.current;

    if (menu) {
      const isBottom = menu.scrollHeight - menu.clientHeight <= menu.scrollTop + 1;

      if (isBottom) {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 8);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
  };

  useEffect(() => {
    const fetch = async () => {
      if (user.headhunter) {
        const response = await myAxios.get(`/config/${user.headhunter.id}`);
        console.log(response.data.data);
        setHeadhunter(response.data.data);
      }
    };

    fetch();
  }, [user.id]);

  const getHome = (role: string) => {
    if (role === 'Company - Staff') return '/staff/job';
    if (role === 'Company - Manager') return '/manager';
    if (role === 'Headhunter') return '/headhunter';
    if (role === 'Admin') return '/admin';
    return '';
  };

  const handleProfile = () => {
    navigate('/' + 'profile');
  };
  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="profile"> My Profile</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const showNotifications = async () => {
    // Fetch and set notifications here
    const fetchedNotifications = await myAxios.get(`notification?accountId=${user.id}`); // Replace with your data
    setNotificationItems(fetchedNotifications.data.data);
  };

  useEffect(() => {
    setCount(notificationItems.filter((item: any) => item.notiStatus === 'NEW').length);
  }, [notificationItems]);

  useEffect(() => {
    console.log('fetching notifications');
    showNotifications();
  }, [render]);

  // useEffect(() => {
  //   const menu = menuRef.current;
  //   menu?.addEventListener('scroll', handleScroll);

  //   return () => {
  //     menu?.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  const notificationMenu = (
    <div
      style={{
        // border: 'solid 1px #000',
        boxShadow: '0px 0px 17px 3px lightgray',
        borderRadius: '10px',
        backgroundColor: 'white',
      }}
    >
      <div>
        <h2 style={{ padding: '10px' }}>Notifications</h2>
        <Divider style={{ margin: 0 }} />
      </div>
      <div
        ref={menuRef}
        style={{
          overflow: 'auto',
          maxHeight: '60vh',
          borderRadius: '10px',
        }}
      >
        <Menu>
          {Array.isArray(notificationItems) &&
            notificationItems.map((item: any, index) => {
              return (
                <Menu.Item>
                  <Card size="small" style={{ width: '500px' }}>
                    {/* <Meta
                      style={{ overflow: 'auto', height: '50px' }}
                      title={item.title}
                      description={item.body}
                    /> */}

                    <Row align={'middle'} gutter={12}>
                      <Col span={item.notiStatus === 'NEW' ? 19 : 20}>
                        <h4>{item.title}</h4>
                        <p style={{ fontSize: 12 }}>{item.body}</p>
                      </Col>
                      <Col span={4}>
                        <span>{item?.createDate && formatDistanceToNow(new Date(item?.createDate))}</span>
                      </Col>

                      {item.notiStatus === 'NEW' && (
                        <Col span={1}>
                          <div className="unread"></div>
                        </Col>
                      )}
                    </Row>
                  </Card>
                </Menu.Item>
              );
            })}

          {!notificationItems ||
            (notificationItems.length === 0 && (
              <p style={{ width: 500, padding: 10, textAlign: 'center' }}>No data</p>
            ))}
        </Menu>
      </div>
    </div>
  );

  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return formattedAmount;
  }

  return (
    <Layout className="dashboard-new">
      {context}
      <header style={{ padding: 0, background: '#001529 !important' }} className="header">
        <div className="header__left">
          <Link to={getHome(role)}>
            <h1>
              <img src="/logo.png" width={120} alt="" />
              <Tag color="green">{role}</Tag>
            </h1>
          </Link>
        </div>

        <div className="header__right">
          {headhunter && (
            <div style={{ display: 'flex', gap: 10 }}>
              <Tag
                bordered
                style={{ padding: '7px 15px', fontSize: 15, borderRadius: 10, margin: 0 }}
                color="magenta"
              >
                Reffer: {headhunter?.referedTurns}/{headhunter?.referTurns}
              </Tag>
              <Tag
                bordered
                style={{ padding: '7px 15px', fontSize: 15, borderRadius: 10, margin: 0 }}
                color="success"
              >
                Balance: {convertToCurrencyFormat(headhunter?.balance)}
              </Tag>
            </div>
          )}
          <Dropdown
            overlay={notificationMenu}
            trigger={['click']}
            onOpenChange={e => {
              if (!e) {
                myAxios.put(`/notification?accountId=${user.id}`).then(() => {
                  showNotifications();
                });

                setCount(0);
              }
            }}
          >
            <span style={{ cursor: 'pointer' }}>
              <Badge count={count} size="small">
                <BellOutlined style={{ fontSize: 20 }} />
              </Badge>
            </span>
          </Dropdown>

          <Dropdown overlay={menu} trigger={['hover']}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <Avatar
                src={user.avatar}
                size={30}
                style={{
                  backgroundColor: '#fde3cf',
                  color: '#f56a00',
                  marginRight: 8,
                }}
              >
                {user.fullName?.charAt(0)}
              </Avatar>
              <span>{user.fullName}</span>
            </div>
          </Dropdown>
        </div>
      </header>

      <div className="container">
        <Sider
          theme="light"
          collapsible={showHeader}
          collapsed={collapsed}
          onCollapse={value => {
            setCollapsed(value);
          }}
          className="slider"
        >
          <div className="demo-logo-vertical" />
          {menuItem}
        </Sider>
        <Layout>
          <Content className="content">
            <PageTemplate>
              <Outlet />
            </PageTemplate>
          </Content>
        </Layout>
      </div>
    </Layout>
  );
};

export default Dashboard;
