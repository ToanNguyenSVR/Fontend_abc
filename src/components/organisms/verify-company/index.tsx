import React, { useState } from 'react';
import { Form, Input, Button, Steps, Upload, message, Card, Row, Col, DatePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './index.scss';
import myAxios from '../../../axios/config';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { v4 } from 'uuid';
import { setCompany } from '../../../redux/features/authenSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export interface VerifyCompanyProps {}
const { Step } = Steps;

export const VerifyCompany: React.FC<VerifyCompanyProps> = props => {
  const [currentStep, setCurrentStep] = useState(0);
  const [logoFile, setLogoFile] = useState<any>(null);
  const [form] = Form.useForm();
  const user = useSelector((store: RootState) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirm = async () => {
    form.validateFields().then(async values => {
      // Handle account information confirmation and submission
      const payload = {
        ...values,
        logoUrl: logoFile,
      };
      try {
        const response: any = await myAxios.post(`company/${user.id}`, payload);
        dispatch(setCompany(response.data.data));

        toast.success('You have successfully added information, please wait for confirmation from us!');
        navigate('/login');
      } catch (e) {
        console.log(e);
      }
    });
  };

  const handleFileChange = (info: any) => {
    if (info.file) {
      const imageRef: StorageReference = ref(storage, `avatarUser/${info.file.name + v4()}`);
      uploadBytes(imageRef, info.file).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          setLogoFile(url);
        });
      });
    }
  };

  return (
    <Card style={{ width: '800px', margin: '30px auto' }}>
      <Steps style={{ marginBottom: '10px' }} current={currentStep}>
        <Step title="Company Information" />
        <Step title="Confirm" />
      </Steps>
      {currentStep === 0 && (
        <Form form={form} layout="vertical">
          <Card title="Company Information">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="logoUrl"
                  label="Logo"
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
                    <Button icon={<UploadOutlined />}>Upload Logo</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter a title' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="name"
                  label="Company Name"
                  rules={[{ required: true, message: 'Please enter a company name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="shortName"
                  label="Short Name"
                  rules={[{ required: true, message: 'Please enter a short name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="websiteUrl"
                  label="Website URL"
                  rules={[
                    { required: true, message: 'Please enter a website URL' },
                    { type: 'url', message: 'Please enter a valid URL' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="establishDate"
                  label="Establish Date"
                  rules={[{ required: true, message: 'Please enter the establish date' }]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="taxCode"
                  label="Tax Code"
                  rules={[{ required: true, message: 'Please enter a tax code' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="beneficiaryBank"
                  label="Bank Name"
                  rules={[{ required: true, message: 'Please enter bank name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="beneficiaryAccount"
                  label="Account number"
                  rules={[{ required: true, message: 'Please enter account number' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={12} lg={12}>
                <Form.Item
                  name="beneficiaryName"
                  label="Account name"
                  rules={[{ required: true, message: 'Please enter account name' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please enter a description' }]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ justifyContent: 'flex-end' }}>
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            </Row>
          </Card>
        </Form>
      )}
      {currentStep === 1 && (
        <div>
          <h2>Confirm Account Information</h2>
          <Card>
            <Form form={form} layout="vertical">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item
                    name="logoUrl"
                    label="Logo"
                    rules={[
                      {
                        validator: (_, value) =>
                          value ? Promise.resolve() : Promise.reject(new Error('Please upload image!')),
                      },
                    ]}
                  >
                    <img width={100} src={logoFile} alt="" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please enter a title' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="name"
                    label="Company Name"
                    rules={[{ required: true, message: 'Please enter a company name' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="shortName"
                    label="Short Name"
                    rules={[{ required: true, message: 'Please enter a short name' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="websiteUrl"
                    label="Website URL"
                    rules={[
                      { required: true, message: 'Please enter a website URL' },
                      { type: 'url', message: 'Please enter a valid URL' },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="establishDate"
                    label="Establish Date"
                    rules={[{ required: true, message: 'Please enter the establish date' }]}
                  >
                    <DatePicker disabled />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="taxCode"
                    label="Tax Code"
                    rules={[{ required: true, message: 'Please enter a tax code' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item
                    name="beneficiaryBank"
                    label="Bank Name"
                    rules={[{ required: true, message: 'Please enter bank name' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="beneficiaryAccount"
                    label="Account number"
                    rules={[{ required: true, message: 'Please enter account number' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="beneficiaryName"
                    label="Account name"
                    rules={[{ required: true, message: 'Please enter account name' }]}
                  >
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter a description' }]}
                  >
                    <Input.TextArea disabled />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Button style={{ marginRight: 20 }} type="primary" onClick={handlePrev}>
                Previous
              </Button>
              <Button type="primary" onClick={handleConfirm}>
                Confirm
              </Button>
            </Row>
          </Card>
        </div>
      )}
    </Card>
  );
};
