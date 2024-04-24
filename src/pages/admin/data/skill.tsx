import { Collapse, Form, Input, Select, Tag } from 'antd';
import ManagerTemplate from '../../../components/templates/manager-template';
import myAxios from '../../../axios/config';
import { useEffect, useState } from 'react';

const Skill = () => {
  const [skillGroup, setSkillGroup] = useState<
    | {
        value: string;
        label: string;
      }[]
    | []
  >([]);

  const fetch = async () => {
    const response = await myAxios.get('/skill-group');
    setSkillGroup(
      response.data.data.map((item: any) => {
        return {
          value: item.id,
          label: item.groupName,
        };
      })
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  const columns = [
    {
      title: 'Skill Name',
      dataIndex: 'skillName',
      key: 'skillName',
    },
    {
      title: 'Skill Group',
      dataIndex: ['skillGroup', 'groupName'],
      key: 'skillGroup',
      render: (value: string) => {
        return <Tag color="blue-inverse">{value}</Tag>;
      },
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
              name="skillName"
              rules={[{ required: true, message: 'Please enter skill name' }]}
            >
              <Input />
            </Form.Item>{' '}
            <Form.Item
              label="Group Name"
              name="skillGroupId"
              rules={[{ required: true, message: 'Please select skill group' }]}
            >
              <Select
                showSearch
                placeholder="Select language"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={skillGroup}
              />
            </Form.Item>
          </>
        }
        handleDelete={id => myAxios.delete(`skill/${id}`)}
        handleUpload={(record: any) => myAxios.get(`/confirm-pay?jobRequest=${record.id}`)}
        handleCreate={(form: any) => myAxios.post(`skill?groupId=${form.skillGroupId}`, form)}
        handleUpdate={(id: number, form: any) => {
          form.skillGroup = {
            id: form.skillGroupId,
          };
          return myAxios.put(`skill/${id}`, form);
        }}
        fetchData={() => myAxios.get('/skill')}
        handleSetCurrentRecord={(callback: any, record: any) => {
          record.skillGroupId = record.skillGroup?.id;
          console.log(record);

          callback(record);
        }}
      />
    </>
  );
};
export default Skill;
