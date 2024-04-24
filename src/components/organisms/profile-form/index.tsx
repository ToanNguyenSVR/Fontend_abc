import { UploadOutlined, InfoOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Form,
  Image,
  Input,
  Modal,
  Radio,
  Row,
  Spin,
  Table,
  Tabs,
  Tag,
  Upload,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';

import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import './index.scss';
import myAxios from '../../../axios/config';
import { toast } from 'react-toastify';
export interface ProfileFormProps {}
const { TabPane } = Tabs;

export const ProfileForm: React.FC<ProfileFormProps> = props => {
  const user = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const valueRef = useRef(0);
  const [openPayment, setOpenPayment] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [transaction, setTransaction] = useState<[]>();
  const [transactionDetail, setTransactionDetail] = useState<any>();

  const [data, setData] = useState<[]>();
  const [wallet, setWallet] = useState<any>();
  const [money, setMoney] = useState<number | null>();
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleWithdrawal = async () => {
    // Add your withdrawal logic here
    try {
      const response = await myAxios.post('with-draw', {
        walletId: user.wallet?.id,
        money: amount,
      });
      toast.success(response.data.message);
      setRender(render + 1);
      setOpen(false);
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  type CreateOrderFunction = (data: any, actions: any) => Promise<string>;

  type OnApproveFunction = (data: any, actions: any) => Promise<void>;

  const onCancel = () => {
    // Add your withdrawal logic here
    console.log('Withdraw', amount);
    setOpen(false);
    setModal(false);
    // Close the modal
  };
  const openModal = (values: any) => {
    setTransactionDetail(values);

    setModal(true);
  };

  const tagColors: any = {
    PAY: 'blue',
    WITHDRAW: 'green',
    PlUS_MONEY: 'orange',
    DEDUCTION: 'red',
  };
  const tagColorsType: any = {
    PAYED: 'green',
    ACTIVE: 'yellow',
    SUCCESS: 'green',
  };

  useEffect(() => {
    if (user) {
      const userDataAPI = {
        fullName: user?.fullName,
        email: user?.email,
        password: '',
        idCard: user?.headhunter?.citizenIdentification,
        facebook: '',
        github: '',
        summary: '',
        gender: user?.headhunter?.gender,
        address: user?.headhunter?.address,
        phoneNumber: user?.phone,
        birthday: null,
        avatar: user?.avatar,
      };
      console.log(userDataAPI);
      form.setFieldsValue(userDataAPI);
    }
  }, []);

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    idCard: '',
    facebook: '',
    github: '',
    summary: '',
    gender: '',
    address: '',
    phoneNumber: '',
    birthday: null,
    avatar: '',
  });

  const columns: any[] = [
    {
      title: 'Total Money',
      dataIndex: 'totalMoney',
      render: (value: string) => {
        return <span>{value}$</span>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (value: string) => {
        const color = tagColors[value] || 'default';

        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
      render: (value: string) => {
        if (value === 'PAYED') return <Tag color="green">SUCCESS</Tag>;
        if (value === 'ACTIVE') return <Tag color="yellow">INPROCESSING</Tag>;
        if (value === 'SUCCESS') return <Tag color="green">{value}</Tag>;
      },
    },
    {
      title: 'Time',
      dataIndex: 'time',
      align: 'center',
      render: (value: string) => {
        return <h4>{formatDistanceToNow(new Date(value), { addSuffix: true })}</h4>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'receiverCode',
      align: 'center',
      render: (value: string) => {
        return <h4>{value}</h4>;
      },
    },
    {
      title: '',
      dataIndex: 'receiverCode',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <Button
            onClick={() => {
              openModal(record);
            }}
            icon={<InfoOutlined />}
          ></Button>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await myAxios.get(`transaction/${user.wallet?.id}`);
        setTransaction(response.data.data.transactions);
        setWallet(response.data.data.wallet);
        setLoading(false);
      } catch (e) {}
    };
    fetchData();
  }, [render]);
  useEffect(() => {
    const data1: any = transaction?.map((item: any) => {
      return {
        type: item.transactionType,
        status: item.transactionResult,
        totalMoney: item.totalMoney,
        time: item.createDate,
        receiverCode: item.receiverCode,
        image_evident: item.image_evident,
        money: item.money,
        platformFee: item.platformFee,
      };
    });
    setData(data1);
  }, [transaction]);

  const [form] = Form.useForm();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const onFinish = (values: any) => {
    console.log(values);
  };
  const scriptOptions = {
    clientId: 'AS_kGKyi8kMb-m3z7SZocpoPihQLS9MGjq7QaYTG3N9b64CRE6mgcFs7HzH16qwPTblmix3ivoSPf0ly',
  };
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      // Handle successful upload
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
    return formattedAmount;
  }

  const isSmallScreen = windowWidth <= 768;
  return (
    <>
      <Modal
        title="Add money"
        open={openPayment}
        onCancel={() => {
          setOpenPayment(false);
        }}
        footer={[
          money && (
            <PayPalScriptProvider options={scriptOptions}>
              <PayPalButtons
                createOrder={
                  ((data, actions) => {
                    console.log('Creating order:', data);

                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: valueRef.current, // Set the payment amount here
                          },
                        },
                      ],
                    });
                  }) as CreateOrderFunction
                }
                // Adjust the function signature here
                onApprove={
                  (async (data, actions) => {
                    try {
                      const response = await myAxios.post(`/recharge`, {
                        walletId: user.wallet?.id,
                        money: money,
                      });
                      toast.success(response.data.message);
                      setOpenPayment(false);
                      setRender(render + 1);
                    } catch (e: any) {
                      toast.error(e.response.data);
                    }
                  }) as OnApproveFunction
                }
              />
            </PayPalScriptProvider>
          ),
        ]}
      >
        <p>Enter the amount you want to add:</p>
        <Input
          type="number"
          placeholder="Money"
          value={money ? money : 0}
          onChange={e => {
            setMoney(Number(e.target.value));
            valueRef.current = Number(e.target.value);
          }}
        />
      </Modal>
      {transactionDetail && (
        <Modal width={1000} title="Information Transactions" open={modal} onCancel={onCancel}>
          <Descriptions bordered>
            <Descriptions.Item label="Money">{transactionDetail.money}$</Descriptions.Item>
            <Descriptions.Item label="Platform Fee">{transactionDetail.platformFee}%</Descriptions.Item>
            <Descriptions.Item label="Total Money">{transactionDetail.totalMoney}$</Descriptions.Item>
            <Descriptions.Item span={2} label="Type">
              <Tag color={tagColors[transactionDetail.type]}>{transactionDetail.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Status">
              <Tag color={tagColorsType[transactionDetail.status]}>{transactionDetail.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item span={1} label="Time">
              <h5> {formatDistanceToNow(new Date(transactionDetail.time), { addSuffix: true })}</h5>
            </Descriptions.Item>
            <Descriptions.Item span={2} label="Descriptions">
              <h5>{transactionDetail.receiverCode}</h5>
            </Descriptions.Item>
            {transactionDetail.type == 'WITHDRAW' && (
              <Descriptions.Item span={3} label="Evident Image">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image src={transactionDetail.image_evident} />
                </div>
              </Descriptions.Item>
            )}
          </Descriptions>
        </Modal>
      )}

      <Modal
        title="Withdraw Funds"
        open={open}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleWithdrawal}>
            Withdraw
          </Button>,
        ]}
      >
        <p>Enter the amount you want to withdraw:</p>
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
        />
      </Modal>

      <Card style={{ width: '100%', margin: '30px auto' }}>
        <h1>Profile Page</h1>
        <div className={isSmallScreen ? 'tabs-container-top' : 'tabs-container-left'}>
          <Tabs defaultActiveKey="1" tabPosition={isSmallScreen ? 'top' : 'left'}>
            <TabPane tab="Basic Information" key="1" style={{ maxHeight: 550, overflow: 'auto' }}>
              <Form
                layout="vertical"
                form={form}
                name="basic"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={userData}
              >
                <Row>
                  <Col xs={20} sm={20} lg={12}>
                    <Form.Item
                      label="Name"
                      name="fullName"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please enter your email' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item label="Birthday" name="birthday">
                      <DatePicker />
                    </Form.Item>
                    <Form.Item label="Summary" name="summary">
                      <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[{ required: true, message: 'Please select your gender' }]}
                    >
                      <Radio.Group>
                        <Radio value="MALE">Male</Radio>
                        <Radio value="FEMALE">Female</Radio>
                        <Radio value="ORTHER">Other</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Address" name="address">
                      <Input />
                    </Form.Item>

                    <Form.Item label="Phone Number" name="phoneNumber">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={20} sm={20} lg={12}>
                    <img style={{ width: '100px' }} src={user?.avatar} alt="" />
                    <Form.Item name="avatar">
                      <Upload
                        name="avatar"
                        action="/upload"
                        listType="picture"
                        beforeUpload={() => false}
                        onChange={handleAvatarUpload}
                      >
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </Card>
    </>
  );
};
