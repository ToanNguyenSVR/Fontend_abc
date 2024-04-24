import { Form, Input } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';

const JobTitle = () => {
  const columns = [
    {
      title: 'position',
      dataIndex: 'position',
      key: 'position',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="position"
        columns={columns}
        modalContent={
          <>
            <Form.Item
              label="Name"
              name="position"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`/job-title/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`/job-title`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`/job-title/${id}`, form)}
        fetchData={() => myAxios.get('/job-title')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default JobTitle;
