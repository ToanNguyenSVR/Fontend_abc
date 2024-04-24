import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { ToastContainer } from 'react-toastify';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Form, Input } from 'antd';

const City = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="City"
        columns={columns}
        modalContent={
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`city/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`city`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`city/${id}`, form)}
        fetchData={() => myAxios.get('/city')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default City;
