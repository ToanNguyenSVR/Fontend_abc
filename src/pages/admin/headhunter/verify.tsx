import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { Avatar, Button, Table } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const HeadhunterVerify = () => {
  const [headhunters, setHeadhunters] = useState<any[]>([]);
  const [render, setRender] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const columns: any[] = [
    {
      title: 'Fullname',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render: (avatarUrl: string, record: any) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={avatarUrl} />
          <span style={{ marginLeft: '10px' }}>{record.fullName}</span>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'IDcard',
      dataIndex: 'citizenIdentification',
      key: 'citizenIdentification',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text: string, record: any) => (
        <div>
          <Button
            style={{ marginLeft: '10px' }}
            type="primary"
            icon={<CheckCircleOutlined />} // Add the checkmark icon
            onClick={() => handleConfirm(record)}
          />
          <Button
            style={{ marginLeft: '10px' }}
            danger
            icon={<CloseCircleOutlined />} // Add the close icon
            onClick={() => handleReject(record)}
          />
        </div>
      ),
    },
  ];
  const handleConfirm = async (values: any) => {
    const response = await myAxios.patch('/verify/' + values.accountId);
    toast.success('Accept successfully!');
    setRender(render + 1);
  };
  const handleReject = async (values: any) => {
    const response = await myAxios.patch('/block/' + values.accountId);
    toast.success('Reject successfully!');
    setRender(render + 1);
  };

  const fetch = async () => {
    const response = await myAxios.get('/headhunter/?accountStatus=VERIFY');
    setHeadhunters(response.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [render]);

  return (
    <div>
      <Table
        loading={isLoading}
        columns={columns}
        pagination={false}
        rowKey={record => record.accountId.toString()}
        dataSource={headhunters}
      />
    </div>
  );
};
export default HeadhunterVerify;
