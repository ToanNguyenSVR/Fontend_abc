import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Row,
  Col,
  Card,
  UploadProps,
  Checkbox,
  notification,
  Segmented,
} from 'antd';
import { InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import './index.scss';
import myAxios from '../../../axios/config';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Dragger } = Upload;

export interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = props => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [urlImage, setUrlImage] = useState('');
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState('HEADHUNTER');

  const handleFileChange = (info: any) => {
    if (info.file) {
      setSelectedImage(info.file);
    }

    if (info.file) {
      const imageRef: StorageReference = ref(storage, `avatarUser/${info.file.name + v4()}`);
      uploadBytes(imageRef, info.file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setUrlImage(url);
        });
      });
    }
  };

  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values: Store) => {
    const registerData = {
      agree: values.agree,
      email: values.email,
      password: values.password,
      avatar: urlImage,
      phone: values.phone,
      fullName: values.fullname,
      accountType: accountType,
    };
    try {
      const response = await myAxios.post('/register', registerData);
      if (response?.status == 200) {
        toast.success('Signup Successfully!');
        navigate('/login');
      }
    } catch (error: any) {
      console.log(error);

      toast.error('Email or phone already exists, please check the information again!');
    }
  };
  const emailValidator = async (rule: any, value: string, callback: any) => {
    if (value && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      throw new Error('Please enter a valid email address');
    }
  };

  const phoneValidator = async (rule: any, value: string, callback: any) => {
    if (value && !/^\d{10}$/.test(value)) {
      throw new Error('Please enter a valid 10-digit phone number');
    }
  };

  const passwordValidator = async (rule: any, value: string, callback: any) => {
    if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      throw new Error(
        'Password must contain at least 8 characters, including at least one letter and one number'
      );
    }
  };

  return (
    <Card style={{ width: '100%' }}>
      {contextHolder}
      <div style={{ marginBottom: '30px', marginTop: '30px' }} className="d-flex mb-4">
        <h1>Sign Up</h1>
      </div>
      <div style={{ marginBottom: '20px' }}>
        Already have an account? <Link to="/login"> Sign in</Link>
      </div>
      <Form className="registerForm" layout="vertical" onFinish={onFinish}>
        <Segmented
          style={{ marginBottom: 30 }}
          options={['Headhunter', 'Company', 'Candidate']}
          onChange={e => {
            if (e === 'Company') {
              setAccountType('COMPANY');
            }
            if (e === 'Headhunter') {
              setAccountType('HEADHUNTER');
            }
            if (e === 'Candidate') {
              setAccountType('CANDIDATE');
            }
          }}
        />
        <Row gutter={[16, 4]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email',
                },
                {
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input className="registerForm__input" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="fullname"
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your full name',
                },
              ]}
            >
              <Input className="registerForm__input" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please enter a password',
                },
                { validator: passwordValidator },
              ]}
            >
              <Input.Password className="registerForm__input" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password className="registerForm__input" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number',
                },
                { validator: phoneValidator },
              ]}
            >
              <Input className="registerForm__input" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              name="upload"
              label="Upload"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please upload image!')),
                },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                name="logo"
                onChange={handleFileChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Please agree to the terms and conditions')),
            },
          ]}
        >
          <Checkbox>I agree to the terms and conditions</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button className="registerForm__button" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
