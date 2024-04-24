import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import myAxios from '../../../axios/config';
import { ToastContainer } from 'react-toastify';
import ManagerTemplate from '../../../components/templates/manager-template';
import { Form, Input } from 'antd';

const WorkingMode = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'mode',
      key: 'mode',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="working mode"
        columns={columns}
        modalContent={
          <>
            <Form.Item label="Name" name="mode" rules={[{ required: true, message: 'Please enter mode' }]}>
              <Input />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`/working-mode/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`/working-mode`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`/working-mode/${id}`, form)}
        fetchData={() => myAxios.get('/working-mode')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default WorkingMode;
