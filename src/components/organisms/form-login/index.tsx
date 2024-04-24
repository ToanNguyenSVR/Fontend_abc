import React, { useEffect, useState } from 'react';
import './index.scss';
import { Card, Form, Input, Button, Divider, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase/config';
import { Store } from 'antd/lib/form/interface';
import myAxios from '../../../axios/config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/features/authenSlice';
import { User } from '../../../model/user';
import { toast } from 'react-toastify';

export const FormLogin: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterLoading = (index: number) => {
    setLoadings(prevLoadings => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const onFinish = async (values: Store) => {
    setLoadings([true]);
    try {
      const response = await myAxios.post('/login', values);
      const user: any = response.data.data;
      const userData: User = response.data.data;
      if (user.companyStaff) userData.company = user.companyStaff.company;

      dispatch(setUser(userData));
      // localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      if (user.status == 'ADDITIONAL_INFORMATION') {
        navigate('/verify');
      }
      if (user.status == 'VERIFY') {
        toast.warning('You are in the process of verifying, please try again later!');
      }
      if (user.status === 'ACTIVE') {
        if (user.accountType === 'HEADHUNTER') navigate('/headhunter');
        if (user.accountType === 'MANAGER') navigate('/manager');
        if (user.accountType === 'ADMIN') navigate('/admin');
        if (user.accountType === 'CANDIDATE') navigate('/candidate');
        if (user.accountType === 'STAFF') navigate('/staff/job');
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoadings([false]);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async res => {
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential?.idToken;
        const response = await myAxios.post('login-google', {
          token: token,
          type: 'WEB',
        });
        const user: any = response.data.data;
        const userData: User = response.data.data;
        if (user.companyStaff) userData.company = user.companyStaff.company;

        dispatch(setUser(userData));
        // localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        if (user.status == 'ADDITIONAL_INFORMATION') {
          navigate('/verify');
        }
        if (user.status == 'VERIFY') {
          toast.warning('You are in the process of verifying, please try again later!');
        }
        if (user.status === 'ACTIVE') {
          if (user.accountType === 'HEADHUNTER') navigate('/headhunter');
          if (user.accountType === 'MANAGER') navigate('/manager');
          if (user.accountType === 'ADMIN') navigate('/admin');
          if (user.accountType === 'CANDIDATE') navigate('/candidate');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const validateEmailOrPhone = (rule: any, value: string, callback: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (value && !emailRegex.test(value) && !phoneRegex.test(value)) {
      callback('Invalid email or phone number!');
    } else {
      callback();
    }
  };
  return (
    <Card bordered={false} style={{ width: '100%' }}>
      {contextHolder}

      <div className="d-flex mb-4">
        <a href="">
          <img src="/logo.png" alt="Logo" style={{ width: 250, height: 50 }} />
        </a>
      </div>
      <div>
        <h2>Welcome to Referity</h2>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ marginTop: '10px' }}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please enter your username!' },
              { validator: validateEmailOrPhone },
            ]}
          >
            <Input
              style={{ fontSize: '15px', padding: '10px' }}
              prefix={<UserOutlined />}
              placeholder="Email or phone number"
            />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password
              style={{ fontSize: '15px', padding: '10px' }}
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form.Item style={{ width: '100%' }}>
              <Button
                style={{ width: '100%', height: '43px' }}
                type="primary"
                htmlType="submit"
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
              >
                Log in
              </Button>
            </Form.Item>
          </div>
        </Form>
        <Divider style={{ fontSize: '14px', fontWeight: '400' }}>Or</Divider>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '25px 0px' }}>
          <button className="login-with-google-btn" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          Don't have account? <Link to="/register"> register now!</Link>
        </div>
      </div>
    </Card>
  );
};
