import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { ToastContainer } from 'react-toastify';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Form, Input, Tag } from 'antd';

const Language = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (value: string) => {
        if (value === 'ACTIVE') {
          return <Tag color="green">{value}</Tag>;
        }

        return <Tag color="red">{value}</Tag>;
      },
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="Language"
        columns={columns}
        modalContent={
          <>
            <Form.Item
              label="Name"
              name="language"
              rules={[{ required: true, message: 'Please enter language' }]}
            >
              <Input />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`language/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`language`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`language/${id}`, form)}
        fetchData={() => myAxios.get('/language')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default Language;
