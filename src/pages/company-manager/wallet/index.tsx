import { InfoOutlined } from '@ant-design/icons';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Button, Card, Descriptions, Image, Input, Modal, Row, Spin, Table, Tag } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import myAxios from '../../../axios/config';
import { RootState } from '../../../redux/store';
export interface ManagerWallet {}

export const ManagerWallet: React.FC<ManagerWallet> = props => {
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

  const openModal = (values: any) => {
    setTransactionDetail(values);

    setModal(true);
  };
  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    return formattedAmount;
  }

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
      dataIndex: 'transferContent',

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
        transferContent: item.transferContent,
      };
    });
    setData(data1);
  }, [transaction]);
  const scriptOptions = {
    clientId: 'AS_kGKyi8kMb-m3z7SZocpoPihQLS9MGjq7QaYTG3N9b64CRE6mgcFs7HzH16qwPTblmix3ivoSPf0ly',
  };
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
              <h5>{transactionDetail.transferContent}</h5>
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
      <Card>
        {loading ? (
          <Spin />
        ) : (
          <>
            {' '}
            <Descriptions bordered>
              <Descriptions.Item span={3} label={'Balance'}>
                {convertToCurrencyFormat(Number(wallet?.balance))}
              </Descriptions.Item>
              {user.accountType == 'MANAGER' && (
                <Descriptions.Item span={3} label={'Block Money'}>
                  {convertToCurrencyFormat(Number(wallet?.blockMoney))}
                </Descriptions.Item>
              )}
            </Descriptions>
            <Row style={{ gap: 20 }}>
              {user.accountType == 'MANAGER' ||
                (user.accountType == 'HEADHUNTER' && (
                  <Button
                    style={{ margin: '20px 0' }}
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Widthdraw
                  </Button>
                ))}

              {user.company?.id && (
                <Button
                  style={{ margin: '20px 0' }}
                  type="primary"
                  onClick={() => {
                    setOpenPayment(true);
                  }}
                >
                  Add Money
                </Button>
              )}
            </Row>
            <Table
              style={{ marginTop: 10 }}
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 10 }}
            />
          </>
        )}
      </Card>
    </>
  );
};
