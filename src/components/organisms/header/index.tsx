import { Avatar, Dropdown, Menu, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { deleteUser } from '../../../redux/features/authenSlice';
import { User } from '../../../model/user';
import { BellOutlined } from '@ant-design/icons';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(store => store.user);

  const handleLogout = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    navigate('/login');
    dispatch(deleteUser());
  };
  const menu = (
    <Menu>
      <Menu.Item key="profile">My Profile</Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header style={{ padding: 0 }} className="header">
      <div className="header__left">
        <h1>
          <img src="/logo.png" width={120} alt="" /> <Tag color="green">{user.accountType}</Tag>
        </h1>
      </div>

      <div className="header__right">
        <BellOutlined
          style={{ fontSize: '20px', marginRight: '16px', cursor: 'pointer' }}
          // onClick={showNotifications}
        />
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
              style={{
                backgroundColor: '#fde3cf',
                color: '#f56a00',
                marginRight: 8,
              }}
            >
              B
            </Avatar>
            <span>{user.fullName}</span>
          </div>
        </Dropdown>
      </div>
    </header>
  );
};
export default Header;
