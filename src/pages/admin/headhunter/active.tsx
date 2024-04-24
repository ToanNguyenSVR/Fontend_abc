import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { Avatar, Button, Modal, Table, Tag } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import { User } from '../../../model/user';

const HeadhunterActive = () => {
  const [idAccount, setIdAccount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRender, setIsRender] = useState(false);
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (value: string) => {
        if (value === 'ACTIVE') return <Tag color="green">{value}</Tag>;
        if (value === 'IN PROCESS') return <Tag color="yellow">{value}</Tag>;
        if (value === 'SUCCESS') return <Tag color="green">{value}</Tag>;
      },
    },
    {
      title: '',
      align: 'center',
      render: (value: string, record: any) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              showModal(record.accountId);
            }}
            danger
          >
            Ban
          </Button>
        );
      },
    },
  ];
  const handleBan = async (values: any) => {
    // setRender(render + 1);
  };
  // const fetch = async () => {
  //   const response = await myAxios.get('/headhunter/?accountStatus=ACTIVE');
  //   setHeadhunters(response.data.data);
  //   console.log(response.data.data);
  // };

  // useEffect(() => {
  //   fetch();
  // }, []);

  const showModal = (values: any) => {
    setIsModalVisible(true);
    setIdAccount(values);
  };

  const handleOk = async () => {
    const response = await myAxios.patch('/block/' + idAccount);

    setIsRender(true);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Modal
        title="Confirmation"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to ban this account?</p>
      </Modal>
      <ManagerTemplate
        isUseAction={false}
        title="City"
        isLoading={isRender}
        columns={columns}
        modalContent={<></>}
        handleDelete={id => myAxios.delete(`city/${id}`)}
        handleCreate={(form: any) => myAxios.post(`city`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`city/${id}`, form)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        fetchData={() => myAxios.get('/headhunter/?accountStatus=ACTIVE')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </div>
  );
};
export default HeadhunterActive;
