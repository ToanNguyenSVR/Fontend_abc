import { Button, Descriptions, Form, Modal, Table, Tag, Upload } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../../../firebase/config';
import { v4 } from 'uuid';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import myAxios from '../../../axios/config';
import { toast } from 'react-toastify';

const AllTransaction = () => {
  const user = useSelector((store: RootState) => store.user);
  const [data, setData] = useState<[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<[]>();
  const [wallet, setWallet] = useState<any>();
  const [transactionId, setTransactionId] = useState<number | null>();
  const [render, setRender] = useState(0);
  const handleFileChange = (info: any) => {
    if (info.file) {
      setSelectedImage(info.file);
    }

    if (info.file) {
      setLoading(true);
      const imageRef: StorageReference = ref(storage, `avatarUser/${info.file.name + v4()}`);
      uploadBytes(imageRef, info.file).then(snapshot => {
        getDownloadURL(snapshot.ref).then((url: string) => {
          setLoading(false);
          setSelectedImage(url);
        });
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload image</div>
    </div>
  );
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const onCancel = () => {
    setIsOpen(false);
  };
  const handleAccept = async () => {
    const acceptData = {
      walletId: user.wallet?.id,
      imageEvident: selectedImage,
    };
    try {
      const response = await myAxios.post(`accept-withdraw/${transactionId}`, acceptData);
      toast.success('Accept successfully!');
      setIsOpen(false);
      setRender(render + 1);
    } catch (e: any) {
      toast.error(e.response.data);
    }
  };
  const tagColors: any = {
    PAY: 'blue',
    WITHDRAW: 'green',
    PlUS_MONEY: 'orange',
    DEDUCTION: 'red',
  };
  const columns: any[] = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value: string) => {
        return <span>{value}$</span>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (value: string) => {
        const color = tagColors[value] || 'default'; // Default to gray for unknown values

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
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await myAxios.get(`transaction-withdraw`);
        const responseWallet = await myAxios.get(`transaction/${user.wallet?.id}`);
        setTransaction(responseWallet.data.data.transactions);
        setWallet(responseWallet.data.data.wallet);
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
        amount: item.totalMoney,
        time: item.createDate,
        id: item.id,
      };
    });
    setData(data1);
  }, [transaction]);
  function convertToCurrencyFormat(amount: number) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
    return formattedAmount;
  }
  return (
    <>
      <Modal
        title="Please upload image of successful transfer!"
        onOk={handleAccept}
        onCancel={onCancel}
        open={isOpen}
        okText="Accept"
      >
        <Form layout="vertical">
          <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Upload
              name="avatar"
              listType="picture-card"
              action="/upload"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleFileChange}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Descriptions bordered>
        <Descriptions.Item label={'Balance'}>
          {convertToCurrencyFormat(Number(wallet?.balance))}
        </Descriptions.Item>
      </Descriptions>
      <Table dataSource={data} columns={columns} />
    </>
  );
};
export default AllTransaction;
