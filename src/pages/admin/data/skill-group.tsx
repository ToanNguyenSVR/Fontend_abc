import { Collapse, Form, Input, Tag } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';

const SkillGroup = () => {
  const columns = [
    {
      title: 'Skill Group',
      dataIndex: 'groupName',
      key: 'groupName',
    },
  ];

  return (
    <>
      <ManagerTemplate
        title="skill group"
        columns={columns}
        modalContent={
          <>
            <Form.Item
              label="Name"
              name="groupName"
              rules={[{ required: true, message: 'Please enter group name' }]}
            >
              <Input />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`/skill-group/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`/skill-group`, form)}
        handleUpdate={(id: number, form: any) => myAxios.put(`/skill-group/${id}`, form)}
        fetchData={() => myAxios.get('/skill-group')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.cityId = record.city?.id;
          callback(record);
        }}
      />
    </>
  );
};
export default SkillGroup;
