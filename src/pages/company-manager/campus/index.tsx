import { useEffect, useState } from 'react';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useForm } from 'antd/es/form/Form';
import { Button, Form, Input, Modal, Select } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Campus = () => {
  const user = useSelector((store: RootState) => store.user);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await myAxios.get('/city');
      setCities(response.data.data);
    };
    fetch();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'City',
      dataIndex: ['city', 'name'],
      key: 'city',
      align: 'center',
    },
  ];

  return (
    <>
      <ToastContainer />
      <ManagerTemplate
        title="Campus"
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

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="City"
              name="cityId"
              rules={[{ required: true, message: 'Please select a city' }]}
            >
              <Select
                showSearch
                placeholder="Select a city"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={cities.map((item: any) => {
                  return {
                    value: item.id,
                    label: item.name,
                  };
                })}
              />
            </Form.Item>
          </>
        }
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleDelete={id => myAxios.delete(`campus/${id}`)}
        handleCreate={(form: any) => myAxios.post(`company/${user.company?.id}/campus`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`campus/${id}`, form)}
        fetchData={() => myAxios.get(`company/${user.company?.id}/campus`)}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default Campus;
