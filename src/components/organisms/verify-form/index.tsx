import React, { useEffect, useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Card,
  Radio,
  notification,
  Descriptions,
  Select,
} from 'antd';

import './index.scss';
import { Store } from 'antd/es/form/interface';
import myAxios from '../../../axios/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-toastify';
const { Option } = Select;
const { Step } = Steps;
export interface VerifyFormProps {}

export const VerifyForm: React.FC<VerifyFormProps> = props => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [userID, setsetUserID] = useState(Number);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user) {
      setsetUserID(user?.id);
    }
  }, []);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = async () => {
    const confirmData = {
      gender: form.getFieldValue('gender'),
      citizenIdentification: form.getFieldValue('idCard'),
      citizenDate: form.getFieldValue('idCardDate')?.format('YYYY-MM-DD'),
      address: form.getFieldValue('address'),
      description: form.getFieldValue('description'),
      beneficiaryAccount: form.getFieldValue('beneficiaryAccount'),
      beneficiaryName: form.getFieldValue('beneficiaryName'),
      beneficiaryBank: form.getFieldValue('beneficiaryBank'),
    };
    console.log(confirmData);

    try {
      const response = await myAxios.post('/headhunter/' + userID, confirmData);
      if (response.status == 200) {
        toast.success('Add informantion successfully!');

        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateIdCard = (_: any, value: string) => {
    if (value && value.length !== 9) {
      return Promise.reject('ID Card should be 9 numbers');
    }
    return Promise.resolve();
  };
  return (
    <Card style={{ width: '800px', margin: '30px auto' }}>
      {contextHolder}
      <Steps style={{ marginBottom: '10px' }} current={currentStep}>
        <Step title="Add Information" />
        <Step title="Bank Information" />
        <Step title="Confirm and Finish" />
      </Steps>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
      >
        <Card style={{ width: '100%', margin: '30px auto', padding: '20px' }}>
          {currentStep === 0 && (
            <>
              <Form.Item
                name="idCard"
                label="ID Card"
                rules={[
                  {
                    required: true,
                    validator: validateIdCard,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="idCardDate"
                label="ID Card Date"
                rules={[
                  {
                    required: true,
                    message: 'Please choose Date',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: 'Please select a gender',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="MALE">Male</Radio>
                  <Radio value="FEMALE">Female</Radio>
                  <Radio value="ORTHER">Other</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter address',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter description',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </>
          )}
          {currentStep === 1 && (
            <>
              {' '}
              <Form.Item
                name="beneficiaryAccount"
                label="Beneficiary Account"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="beneficiaryName"
                label="Beneficiary Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="beneficiaryBank"
                label="Beneficiary Bank"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
          {currentStep === 2 && (
            <Form.Item
              style={{ width: '100%' }}
              dependencies={['idCard', 'birthday', 'gender', 'address', 'dateRange']}
            >
              {() => (
                <>
                  <Descriptions title={'Confirm your information:'} bordered>
                    <Descriptions.Item label="ID Card" span={3}>
                      {form.getFieldValue('idCard')}
                    </Descriptions.Item>
                    <Descriptions.Item label="ID Card Date" span={3}>
                      {form.getFieldValue('idCardDate')?.format('YYYY-MM-DD')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender" span={3}>
                      {form.getFieldValue('gender')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={3}>
                      {form.getFieldValue('address')}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={3}>
                      {form.getFieldValue('description')}
                    </Descriptions.Item>
                  </Descriptions>
                </>
              )}
            </Form.Item>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < 2 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === 2 && (
              <Button type="primary" htmlType="submit">
                Finish
              </Button>
            )}
          </div>
        </Card>
      </Form>
    </Card>
  );
};
